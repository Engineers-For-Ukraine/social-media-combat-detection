from utils.telegram import get_messages, post_message
from utils.summarize import create_summary
import asyncio
from time import sleep, perf_counter
from datetime import datetime


async def main():

    sleep_time = 24 * 60 * 60

    while True:

        print('Running at ' + datetime.now())

        tic = perf_counter()

        messages = await get_messages('CombatMessagesUA')

        print('Summarizing...')

        summary = create_summary(messages)

        await post_message(summary)

        toc = perf_counter()

        elapsed = toc - tic

        print('Finished. Going to sleep for 24 hours.')

        sleep(sleep_time - elapsed)


if __name__ == "__main__":
    asyncio.run(main())