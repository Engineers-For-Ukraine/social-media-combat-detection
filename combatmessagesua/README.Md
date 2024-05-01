# CombatMessagesUA

This folder contains the Map, Telegram app, and their associated Dockerfiles. Cloning just this folder will allow running the entire app by running the command 'docker run --build'.

## Telegram
The telegram app in this repo scrapes messages from Ukrainian Telegram channels, classifies them as either being about a combat event or not, then posts those that are about combat to our Telegram channel @CombatMessagesUA

## Map Site
The map site in this repo takes in Telegram messages that have been classified as being about a combat event and places them on a map according to locations mentioned in the messages themselves.

## Other files

Also in this folder are 'docker-compose.yaml' and 'mongo-init.js'.  'docker-compose.yaml' defines the environment for docker containers and allows the app to be built and run as described in the first section. 'mongo-init.js' sets up the necessary MongoDB database.