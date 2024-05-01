from app.telebot import Telebot
from app.classifier import XGBClassifier

from app.map_funcs import * # to be refactored

import asyncio
from time import sleep

async def main():

    classifier = XGBClassifier(model_path='models/xgb_classifier', vectorizer_path='models/tfid-vectorizer.pickle')
    telebot = Telebot()

    while True:

        errors = []
        num_messages = 0
        num_combats = 0
        mapped = 0      

        current_time = datetime.now()

        print(f'Running at {current_time}')  

        try:
            messages = await telebot.get_messages()
            num_messages = len(messages)
            print(f"{num_messages} messages downloaded")
        except:
            print('Failed to get messages')
            errors.append('Failed to get messages')
    
    
        if num_messages > 0:
            try:
                # classify messages
                print('Classifying messages...')
                combats = classifier.classify(messages)
                print('Messages classified')
                num_combats = len(combats)
                print(f"{num_combats} found")

                # send combats to map if there are any
                if num_combats != 0:
                    try:
                        mapped = map_messages(combats)
                        print('Messages sent to map database')
                    except:
                        errors.append('Failed to send messages to map database')
                else:
                    # set number of messages sent to map to 0 for report
                    mapped = 0

                # post combats to telegram
                for combat in combats:
                    try:
                        await telebot.post_message(combat)
                    except:
                        errors.append('Failed to post combat messages')
            except:
                errors.append('Failed to classify messages')
        

        # create and post report with errors

        if len(errors) == 0:
            errors.append('None')

        error_string = ''
        for error in errors:
            error_string += error + '\n'

        report_string = f"{current_time}\nRetrieved {num_messages} new messages. \nFound {num_combats} combat events. \n{mapped} messages sent to map. \nErrors: {error_string}"

        try:
            print('Posting report...')
            await telebot.post_report(report_string)
        except:
            print('Failed to post report.')

        print('Done! Going to sleep for an hour...')

        sleep(3600)

if __name__ == "__main__":
    asyncio.run(main())