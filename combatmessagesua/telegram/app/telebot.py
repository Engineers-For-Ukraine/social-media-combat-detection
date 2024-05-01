from telethon import TelegramClient
from datetime import timezone, timedelta, datetime
from time import sleep
from app.api import *


class Telebot:
    def __init__(self, api_id=api_id, api_hash=api_hash):
        self.api_id = api_id
        self.api_hash = api_hash

    # define functions to get and send messages
    async def get_messages(self):
        # get AmplifyUkraine messages from last hour 
        messages = []
        async with TelegramClient(api_id=self.api_id, api_hash=self.api_hash, session='this') as client:
            async for message in client.iter_messages('AmplifyUkraine', offset_date=datetime.now(tz=timezone.utc) - timedelta(hours=1), reverse=True):
                messages.append(message)
        return messages

    async def post_message(self, message):
        # post message to the given channel
        # argument must be only the text of a message (i.e. message.text should be passed)
        channel = -1002016594072 # use this line for testing
        #channel = 'CombatMessagesUA' # update this var to change channel
        async with TelegramClient(api_id=self.api_id, api_hash=self.api_hash, session='this') as client:
            await client.send_message(entity=channel, message=message)
            print('Message posted')
            print('Waiting to avoid Flood Error...')
            sleep(5)

    async def post_report(self, report):
        # post message of program logs
        channel = -1002008284745 # private report channel
        async with TelegramClient(api_id=self.api_id, api_hash=self.api_hash, session='this') as client:
            await client.send_message(entity=channel, message=report)