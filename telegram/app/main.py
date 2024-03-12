from telegram_funcs import *
from model_funcs import *

import asyncio
from time import sleep

async def main():
    global classifier, vectorizer

    while True:

        errors = []
        num_messages = 0
        num_combats = 0      

        current_time = datetime.now()

        print(f'Running at {current_time}')  

        try:
            messages = await get_messages()
            num_messages = len(messages)
            print(f"{num_messages} messages downloaded")
        except:
            errors.append('Failed to get messages')
    
    
        if num_messages > 0:
            try:
                # classify messages
                print('Classifying messages...')
                combats = await find_combats(messages, classifier=classifier, vectorizer=vectorizer)
                print('Messages classified')
                num_combats = len(combats)
                print(f"{num_combats} found")

                # post combats to telegram
                for combat in combats:
                    try:
                        await post_message(combat)
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

        report_string = f"{current_time}\nRetrieved {num_messages} new messages. \nFound {num_combats} combat events. \nErrors: {error_string}"

        try:
            print('Posting report...')
            await post_report(report_string)
        except:
            pass

        print('Done! Going to sleep for an hour...')

        sleep(3600)

if __name__ == "__main__":
    classifier, vectorizer = load_model()
    asyncio.run(main())