from telethon import TelegramClient
from datetime import timezone, timedelta, datetime
from time import sleep
from api import *
import ktrain
import asyncio

# define functions to get and send messages
async def get_messages():
    # get AmplifyUkraine messages from last hour 
    global api_id
    global api_hash
    messages = []
    async with TelegramClient(api_id=api_id, api_hash=api_hash, session='this') as client:
        async for message in client.iter_messages('AmplifyUkraine', offset_date=datetime.now(tz=timezone.utc) - timedelta(hours=1), reverse=True):
            messages.append(message)
    return messages

async def post_message(message):
    # post message to the given channel
    # argument must be only the text of a message (i.e. message.text should be passed)
    global api_id
    global api_hash
    channel = -1002040681043 # update this var to change channel
    async with TelegramClient(api_id=api_id, api_hash=api_hash, session='this') as client:
        try:
            await client.send_message(entity=channel, message=message)
            print('Message posted')
        except:
            print('Failed to post message')
        print('Waiting to avoid Flood Error...')
        sleep(10)

async def post_report(report):
    # post message of program logs
    global api_id
    global api_hash
    channel = -1002008284745 # update this to private report channel
    async with TelegramClient(api_id=api_id, api_hash=api_hash, session='this') as client:
        await client.send_message(entity=channel, message=report) # update entity to report channel


# define function to classify messages with model
async def find_combats(messages):
    # iteratively predicts messages
    # does NOT currently clean/pre-process the message
    # this func should be improved
    global classifier
    combats = []
    count = 0
    total = len(messages)
    for message in messages:
        if classifier.predict(message.text) == 'annotation':
            print('Combat found')
            combats.append(message)
            await post_message(message.text)
            print('Continuing classifications...')
        count += 1
        print ("\033[A                                                                  \033[A")
        print(f"{count}/{total} classified...")
    return combats

async def main():
    global classifier

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
        
        
            if num_messages > 0:
                try:
                    print('Classifying messages...')
                    combats = await find_combats(messages)
                    print('Messages classified')
                    num_combats = len(combats)
                    print(f"{num_combats} found")

                except:
                    errors.append('Failed to classify messages')

        except:
            errors.append('Failed to get messages')

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
    # load model
    classifier = ktrain.load_predictor('/home/j/Documents/Projects/sentimental-1/telegram/app/distilbert')
    print('Model loaded')
    asyncio.run(main())