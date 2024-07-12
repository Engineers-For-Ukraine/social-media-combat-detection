import emoji
from datetime import datetime
from transformers import pipeline

summarizer = pipeline('summarization')

def clean_messages(messages):

    """This is a helper function for create_summary which takes in a set of messages return from Telegram and
      returns those messages text contents as a single long string"""

    messages = [message.to_dict() for message in messages]
    texts = [emoji.demojize(message['message'].split('ORIGINAL')[0].replace('TRANSLATION :', '').replace('\n', ' ')) for message in messages]
    clean_text = ' '.join(texts)

    return clean_text


def summarize(input, summarizer=summarizer):
    """This is a helper function for create_summary which takes in a long string of text and returns a summarized string"""

    split_input = []

    start = 0
    end = 1024

    for i in range(len(input)//1024):
        split_input.append(input[start:end])
        start = end
        end += 1024

    split_input.append(input[end:])

    outputs = summarizer(split_input)

    summary = ' '.join([elt['summary_text'] for elt in outputs])

    return summary


def create_summary(messages):
    """This function takes in a set of messages from Telegram and returns a summary of less than 4000 characters"""

    text = clean_messages(messages)

    while len(text) > 4000:
        
        text = summarize(input=text)

    summary = str(datetime.now()) + '\n\n' + '\n\n'.join(text.split('. '))

    return summary