FROM ubuntu:latest
RUN apt-get -y update
RUN apt-get -y install git
RUN git submodule update --init --recursive --force

FROM httpd:2.4
COPY . /usr/local/apache2/htdocs/
EXPOSE 80
