from telethon import TelegramClient
from datetime import datetime, timedelta, timezone
from utils.api import *

async def get_messages(chat_name):
    global api_id
    global api_hash
    messages = []
    async with TelegramClient(api_id=api_id, api_hash=api_hash, session='this') as client:
            async for message in client.iter_messages(chat_name, offset_date=datetime.now(tz=timezone.utc) - timedelta(hours=24), reverse=True):
                messages.append(message)
    return messages

async def post_message(message):
    global api_id
    global api_hash
    async with TelegramClient(api_id=api_id, api_hash=api_hash, session='this') as client:
        await client.send_message(entity=-1002016594072, message=message)