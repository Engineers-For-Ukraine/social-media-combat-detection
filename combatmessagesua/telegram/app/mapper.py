import re
import pymongo
from app.location_list import coord_dict
from thefuzz import process

class Mapper:
    # database should be initialized with the host path
    # i.e. 'mongodb://mongo:27017/' as well as
    # database name and collection name
    def __init__(self, client: str, db_name: str, collection_name: str):
        self.client = pymongo.MongoClient(client)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    # this method takes a set of messages
    # it processes those messages
    # then adds them to the mongo db
    def map_messages(self, messages):
        rows = self.make_rows_for_db(messages)
        self.collection.insert_many(rows)

    # this helper function that loops over messages and processes them
    def make_rows_for_db(self, messages):
        rows = []
        for message in messages:
            message_rows = self.process_message(message)
            rows += message_rows
        return rows
    
    # this function extracts locations from each messages then
    # formats each message for insertion to the mongodb
    def process_message(self, message):
        # get location and coords
        locations = self.get_locations(message)
        # format location/coords and message correctly
        doc_list = []
        for location in locations:
            doc_list.append({'datetime': message.date, 
                            'place_name':location[0][0], 
                            'location_confidence': location[0][1], 
                            'location':location[1], 
                            'message':message.text})
        return doc_list


    # this function takes in a message and extracts locations
    # by fuzzy searching a predefined list of place names
    # it returns a list of pairs
    # [place name, coordinates of place]
    def get_locations(self, message):
        MINIMUM_SIMILARITY = 91
        coord_list = []
        caps = self.extract_capitalized_words(message.text)
        for cap in caps:
            matches = process.extract(cap, coord_dict.keys())
            best_match = max(matches, key=lambda x: x[1] if isinstance(x[1], (int, float)) else float('-inf'))
            if best_match[1] >= MINIMUM_SIMILARITY:
                # append [best_match, coords] as list to coord_list
                coord_list.append([best_match, coord_dict[best_match[0]]])
        return coord_list

    # this is a helper function for get_locations that 
    # gets all the capitalized words from a string and returns them
    def extract_capitalized_words(input_string):
        # Define a regular expression pattern to match capitalized words
        pattern = r'\b[A-Z][a-z]*\b'
        
        # Use re.findall to find all matches in the input string
        capitalized_words = re.findall(pattern, input_string)
        
        return capitalized_words
    