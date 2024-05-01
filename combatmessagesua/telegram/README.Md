# Telegram App Backend

This folder contains the code for the telegram portion of CombatMessagesUA. In this folder is 'main.py' which implements the app itself and a subfolder, 'app'.


## App folder

In the 'app' folder are the '.py' files for the 'main.py' imports. The files are named for the jobs handled by the functions in the file.



### map_funcs

This file contains the functions for extracting data from messages which have been classified as relevant by the classifier model. Currently these functions pull out locations by location names and fuzzy searching the location_list. This file also contains the function that sends messages from the Telegram app to a MongoDB database, which must be updated and configured for deployment.

### classifier

This file implements a class with methods to load the classifier model, clean/preprocess messages for classification, and run inferencing on those messages. This file must be updated when the model is changed.


### telebot

This file implements a class for scraping posts from Telegram and posting messages to the main aggregator feed @CombatMessagesUA as well as posting status information to a private 'Reports' channel.


### Other files

Currently this file also contains 'location_list.py' which consists of a dictionary of locations and their coordinates. This is used by 'map_funcs.py' as a quick and dirty implementation. 

There is also an untracked 'api.py' that contains important information for connecting to the Telegram API. Copies of this file can be found in the team drive.