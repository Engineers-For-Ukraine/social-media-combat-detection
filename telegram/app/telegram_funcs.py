from telethon import TelegramClient
from datetime import timezone, timedelta, datetime
from time import sleep
from app.api import *

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
    channel = -1002016594072 # use this line for testing
    #channel = 'CombatMessagesUA' # update this var to change channel
    async with TelegramClient(api_id=api_id, api_hash=api_hash, session='this') as client:
        await client.send_message(entity=channel, message=message)
        print('Message posted')
        print('Waiting to avoid Flood Error...')
        sleep(5)

async def post_report(report):
    # post message of program logs
    global api_id
    global api_hash
    channel = -1002008284745 # update this to private report channel
    async with TelegramClient(api_id=api_id, api_hash=api_hash, session='this') as client:
        await client.send_message(entity=channel, message=report) # update entity to report channel