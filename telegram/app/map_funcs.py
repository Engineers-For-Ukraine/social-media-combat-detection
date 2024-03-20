import re
import pymongo
from app.location_list import coord_dict
from thefuzz import process

def extract_capitalized_words(input_string):
    # Define a regular expression pattern to match capitalized words
    pattern = r'\b[A-Z][a-z]*\b'
    
    # Use re.findall to find all matches in the input string
    capitalized_words = re.findall(pattern, input_string)
    
    return capitalized_words

def get_locations(message):
    MINIMUM_SIMILARITY = 91
    coord_list = []
    caps = extract_capitalized_words(message)
    for cap in caps:
        matches = process.extract(cap, coord_dict.keys())
        best_match = max(matches, key=lambda x: x[1] if isinstance(x[1], (int, float)) else float('-inf'))
        if best_match[1] >= MINIMUM_SIMILARITY:
            # append [best_match, coords] as list to coord_list
            coord_list.append([best_match, coord_dict[best_match[0]]])
    return coord_list
            

def process_message(message):
    # get location and coords
    locations = get_locations(message)
    # format location/coords and message correctly
    doc_list = []
    for location in locations:
        doc_list.append({'place_name':location[0][0], 'location_confidence': location[0][1], 'location':location[1], 'message':message})
    return doc_list

def map_messages(messages):

    #connect to mongodb
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["test"]
    mycol = mydb["messages"]

    # format data for mongo
    rows = []
    for message in messages:
        message_rows = process_message(message)
        rows += message_rows

    print(f'{len(rows)} locations found')

    # push data to db
    mycol.insert_many(rows)