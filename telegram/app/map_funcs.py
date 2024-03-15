import re
import pymongo
from location_list import location_list, coord_dict

def extract_capitalized_words(input_string):
    # Define a regular expression pattern to match capitalized words
    pattern = r'\b[A-Z][a-z]*\b'
    
    # Use re.findall to find all matches in the input string
    capitalized_words = re.findall(pattern, input_string)
    
    return capitalized_words

def get_coords_from_locations(locations):
    coords = []
    for location in locations:
        if location in coord_dict.keys():
            coords.append(coord_dict[location])
    return coords

def get_locations(message):
    locations = []
    caps = extract_capitalized_words(message)
    for cap in caps:
        if cap in location_list:
            locations.append(cap)
    coord_list = get_coords_from_locations(locations)
    return coord_list
            

def process(message):
    # get location and coords
    locations = get_locations(message)
    # format location/coords and message correctly
    doc_list = []
    for location in locations:
        doc_list.append({'location':location, 'message':message})
    return doc_list

def map_messages(messages):

    #connect to mongodb
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["test"]
    mycol = mydb["messages"]

    # format data for mongo
    rows = []
    for message in messages:
        message_rows = process(message)
        rows += message_rows

    print(f'{len(rows)} locations found')

    # push data to db
    mycol.insert_many(rows)