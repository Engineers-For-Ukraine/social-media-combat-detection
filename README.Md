# CombatMessagesUA
This repo contains the code for CombatMessagesUA. This project aggregates and maps reports of combat or other military activity scraped from Ukrainian social media posts on the app Telegram. This repo contains three main applications: Annotate4Ukraine in 'annotation-site', an app for scraping, classifying, and posting messages to telegram in 'telegram', and a website for presenting mapped reports in map-site. Each of these is addressed below and contains its own 'README.md' for more specific reference.

## Annotate4Ukraine
Annotate4 Ukraine is a website for user-friendly data annotation. The webpage presents users with guidelines for annotation and then serves a single message at a time for users to assign as either 'yes', 'no', or 'not sure'.

## Telegram
The telegram app in this repo scrapes messages from Ukrainian Telegram channels, classifies them as either being about a combat event or not, then posts those that are about combat to our Telegram channel @CombatMessagesUA

## Map
The map site in this repo takes in Telegram messages that have been classified as being about a combat event and places them on a map according to locations mentioned in the messages themselves.

## Other Folders
The other folders in this repo are 'models' and 'scripts-notebooks'. 'models' contains ML models that have been trained to classify Telegram messages according to the above specification. 'scripts-notebooks' contains a set of jupyter notebooks that are used for data processing, model training, and testing.