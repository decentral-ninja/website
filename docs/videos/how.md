# How to use DCN

## Intro
### <u>Stage: Intro</u>
decentral.ninja, also referred as DCN is a FOSS, which runs in the browser and here it is presented as an offline - first chat. A communication platform, which runs on the Web API built with plain JavaScript, CSS and HTML, integrating a few dependencies for data management. Such as IPFS, webtorrent and yjs.

### <u>Stage: Double screen</u>
quick connection

### <u>Stage: Intro - TODO</u>
On our github you can see that DCN is still under development. Todays video is going to show the state of October 2026 version 2.3.26

### <u>Stage: Double screen</u>
## How can I meet up with friends in DCN?
DCN uses rooms instead of direct user connections. Those rooms can be private the more unique it's room name is and vice versa.

### explain room
- generate a new room 
- enter an existing room
- turn notifications on/off 
- share link to room 
- give the room your own secrete name 
- delete room

and the effects on URL. URL is master.

### <u>Stage: Difference between DCN and other chats?</u>
DCN does not know the concept of a static user id. The browser/client receives a unique id when entering a room. This uuid is linked to the room by the local storage in the browser.

This means that rooms are close to the concept of groups in other chats but does not enforce a members list, instead everyone with the link to the room can join anonymously.

### <u>Stage: Double screen</u>
## How can I identify my peers?
Each browser/client session can choose a nickname for it's "user" aka. it's browser/client uuid.

### explain user dialog
- active and historically connected user graph
- user with multiple information 

## How can I communicate privately?
DCN has a user managed end-to-end encryption.

### explain user dialog
- user dialog show public key
### explain key dialog
- key dialog explain key management
- explain key sharing

## Conclusion id vs. anonymous
DCN let's users decide with who and how many peers they want to share a room. Within the room they decide which keys they encrypt their messages.

## How to connect
DCN decentralized nature...

### explain provider dialog
- provider graph
- manual provider settings
- provider with multiple settings, depending type
  - Websocket: "keepAlive" keeps the CRDT for the chosen time range.

### explain general usage
- message details 
  - reply 
  - delete (if it is your message) 
  - copy 
  - share link to room and message 
- send message 
- upload files 
- start jitsi peer-to-peer video call 

### <u>Stage: Double screen -> one browser with How page open.</u>
### explain: manual - controls

### <u>Stage: Double screen -> one browser with Home page.</u>
DCN support room and donation...
