import re
from location_list import location_list, coord_dict

def extract_capitalized_words(input_string):
    # Define a regular expression pattern to match capitalized words
    pattern = r'\b[A-Z][a-z]*\b'
    
    # Use re.findall to find all matches in the input string
    capitalized_words = re.findall(pattern, input_string)
    
    return capitalized_words

def get_coords(locations):
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
    coord_list = get_coords(locations)
    return coord_list
            

def map(message):
    # TODO
    # get location and coords
    locations = get_locations(message)
    # format location/coords and message correctly
    # send formatted data to database for map site
    pass