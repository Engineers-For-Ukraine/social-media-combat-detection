from utils.telegram import get_messages, post_message
from utils.summarize import create_summary
import asyncio
from time import sleep, perf_counter
from datetime import datetime


async def main():

    sleep_time = 24 * 60 * 60

    SUMMARY_CHANNEL = 'CombatMessagesUADailySummaries'
    REPORT_CHANNEL = -1002008284745

    while True:

        print('Running at ' + str(datetime.now()))

        tic = perf_counter()

        try:

            messages = await get_messages('CombatMessagesUA')

            print('Summarizing...')

            summary = create_summary(messages)

            await post_message(summary, SUMMARY_CHANNEL)

            await post_message(('Daily summary posted at ' + str(datetime.now())), REPORT_CHANNEL)

        except Exception as e:

            try:

                await post_message(f'Daily summary failed because {e}', REPORT_CHANNEL)

            except Exception as e2:

                print(f'Process failed because {e} \nFailed to post report because {e2}')


        print('Going to sleep for 24 hours.')

        toc = perf_counter()

        elapsed = toc - tic

        sleep(sleep_time - elapsed)


if __name__ == "__main__":
    asyncio.run(main())