from app.telebot import Telebot
from app.classifier import XGBClassifier
from app.mapper import Mapper

from transformers import pipeline

import asyncio
from time import sleep
from datetime import datetime

# IMPORTANT: All methods and functions should always take in and return whole messages
# if a method works only with a particular part of the message, the method should handle that itself

async def main():

    print('loading models')
    classifier = XGBClassifier(model_path='models/xgb_classifier', vectorizer_path='models/tfid-vectorizer.pickle')
    print('classifier loaded')
    telebot = Telebot()
    print('telebot initialized')
    mapper = Mapper(client="mongodb://mongo:27017/", db_name="my-db", collection_name="messages")
    print('databases connnected')
    ru_translator = pipeline("translation_ru_to_en", model="Helsinki-NLP/opus-mt-ru-en")
    print('translator loaded')

    sources = ['amplifyukraine', 'intelslavaua', 'Kyivpost_official', 'Ukraine_Report', 'telehunt_watch'] # add additional sources here
    ru_sources = ['astrapress']

    while True:

        errors = []
        messages = []
        ru_messages = []
        num_messages = 0
        num_combats = 0
        mapped = 0      

        current_time = datetime.now()

        print(f'Running at {current_time}')  

        # get messages from english language sources

        for source in sources:
            try:
                new_messages = await telebot.get_messages(source)
                print(f"{len(new_messages)} messages downloaded from {source}")
                messages += new_messages
            except Exception as e:
                print('Failed to get messages')
                print(e)
                errors.append(f'Failed to get messages from {source}')
    
    
        # get messages from russian language sources

        for source in ru_sources:
            try:
                new_messages = await telebot.get_messages(source)
                ru_messages += new_messages
                print(f"{len(new_messages)} messages downloaded from {source}")

            except Exception as e:
                print('Failed to get messages')
                print(e)
                errors.append(f'Failed to get messages from {source}')

        # translate russian messages
        
        print('translating russian language messages')
        translation_failures = 0
        for i in range(len(ru_messages)):
            try:
                translation = ru_translator(ru_messages[i].text)[0]['translation_text']
                print(f'translated {i+1} / {len(ru_messages)}')
                ru_messages[i].text = f'TRANSLATION: {translation} ORIGINAL: {ru_messages[i].text} SOURCE: {source}'
            except Exception as e:
                print(e)
                translation_failures += 1

        print(f'{translation_failures} messages failed to translate')

        messages += ru_messages
        
        num_messages = len(messages)

        if num_messages > 0:

            try:
                
                # classify messages
                print('Classifying messages...')
                # classifier should always take in and return complete messages not just message.text
                combats = classifier.classify(messages)
                print('Messages classified')
                num_combats = len(combats)
                print(f"{num_combats} found")

                # send combats to map if there are any
                if num_combats != 0:
                    try:
                        mapped = mapper.map_messages(combats)
                        print('Messages sent to map database')
                    except Exception as e:
                        print(e)
                        errors.append('Failed to get locations for map database')
                else:
                    # set number of messages sent to map to 0 for report
                    mapped = 0

                # post combats to telegram
                for combat in combats:
                    try:
                        await telebot.post_message(combat)
                    except Exception as e:
                        errors.append('Failed to post combat messages')
                        print(e)
            except:
                errors.append('Failed to classify messages')
        

        # create and post report with errors

        if len(errors) == 0:
            errors.append('None')

        error_string = ''
        for error in errors:
            error_string += error + '\n'

        report_string = f"{current_time}\nRetrieved {num_messages} new messages. \nFound {num_combats} combat events. \n{mapped} locations sent to map. \nErrors: {error_string}"

        try:
            print('Posting report...')
            await telebot.post_report(report_string)
        except Exception as e:
            print(e)
            print('Failed to post report.')

        print('Done! Going to sleep for an hour...')

        sleep(3600)

if __name__ == "__main__":
    asyncio.run(main())