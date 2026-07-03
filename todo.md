[Docker network, not publicly reachable]
┌────────────────────────────────────────-─┐
│  Lago (Postgres + Redis)                 │
│      ▲                                   │
│      │ internal only (e.g. lago-api:3000)│
│      │                                   │
│  middleware ────────────────--──┐        │
└──────┼──────────────────────────┼────────┘
       │                          ▼
       │ public                  Pangolin add/remove-user
       ▼
    Client (browser)

---

Stripe ──webhook──► Lago (updates subscription status)
                          │
                          │ webhook (payment confirmed / subscription
                          │ canceled / payment failed)
                          ▼
                    middleware (Node.js)
                          │
                          │ add-user / remove-user
                          ▼
                    Pangolin user API
                          │
                          ▼
              Pangolin allow/deny at proxy time
                          │
                          ▼
                        Kubo

1. Client → Pangolin-protected endpoint
2. Pangolin → 403/401 (not on the allow list)
3. Client → your own small "subscribe" page
      (this page is YOUR frontend — not Pangolin, not Lago)
4. Your frontend → your middleware/backend:
      "create Lago customer" (if not exists) + "give me a checkout link"
5. Middleware → Lago API → generates a Stripe Checkout URL
6. Your frontend → redirects the browser (full navigation, NOT an iframe)
      to that Stripe-hosted Checkout page
7. Client enters card details on Stripe's own hosted page
8. Stripe → redirects client back to your configured success URL
9. Stripe → webhook → Lago (payment/subscription confirmed)
10. Lago → webhook → your middleware → subscription.started
11. Middleware → Pangolin add-user API
12. Client retries the endpoint → Pangolin now allows it

### Step 1 — Deploy Lago self-hosted
Docker Compose per the earlier backup discussion (Postgres + Redis). Get the admin UI up, create your organization.

### Step 2 — Connect Stripe inside Lago
Settings → Integrations → add Stripe as a payment provider (API key). This is what gives you the "no vendor lock-in" property — Lago talks to Stripe on your behalf, your middleware never touches Stripe directly. Swapping to Adyen/GoCardless later only means reconfiguring this one integration, no code changes downstream.

### Step 3 — Model your product in Lago
- Create a **Plan** (e.g. "Pro Monthly") — flat subscription, no need for billable metrics/usage events unless you want metered pricing later.
- When you create a **Customer** in Lago, set its `external_id` to whatever identifier Pangolin uses for that user (email, username, whatever Pangolin's user API expects). This shared ID is what lets your middleware translate between the two systems without a lookup table of its own.

### Step 4 — Register your middleware as a Lago webhook endpoint
`POST /api/v1/webhook_endpoints` with your middleware's public URL (or via UI, Settings → Webhooks). Lago signs every webhook payload (HMAC) — verify that signature in your middleware before trusting any payload.

### Step 5 — Middleware: Lago → Pangolin (the events you actually need)
Subscribe your handler to these Lago webhook events:

| Event | Action in Pangolin |
|---|---|
| `subscription.started` | add user |
| `subscription.terminated` | remove user |
| `subscription.canceled` | remove user (never activated — failed payment or activation timeout) |
| `invoice.payment_failure` | optional: flag for grace period, don't remove immediately |
| `invoice.payment_overdue` | optional: remove user if you don't want a grace period |

Minimum viable version only needs `subscription.started` and `subscription.terminated` — add the payment-failure events later if you want a grace period instead of hard cutoff on first missed payment.

Each handler: verify signature → extract `external_customer_id` from the payload → call Pangolin's add-user/remove-user API with that ID. Make both directions idempotent (adding an already-added user or removing an already-removed user should just no-op, not error).

### Step 6 — Middleware: reconciliation (pull direction)
Periodic job (daily cron is fine):
```
GET /api/v1/subscriptions?status[]=active
```
against Lago, get the full list of active `external_customer_id`s, diff against Pangolin's current user list (whatever Pangolin exposes to list current users), and correct any drift — add missing ones, remove stale ones. This is your safety net for missed/failed webhook deliveries.

### Step 7 — Test in Stripe test mode end-to-end
Create a test subscription in Stripe test mode → confirm Lago receives it via the Stripe integration → confirm your middleware receives `subscription.started` → confirm Pangolin gets the add-user call. Then cancel it and confirm the reverse chain works, including that the reconciliation job would also catch it if the webhook were dropped.

That's the full loop. The only thing not yet defined on your end is Pangolin's actual user-management API shape (add-user/remove-user endpoints, auth, and how it identifies "current users" for the reconciliation diff) — worth pulling up Pangolin's API docs next to nail down exactly what your middleware needs to call.