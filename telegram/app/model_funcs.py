import xgboost
import pickle
import re
import emoji

# load and return classifier and vectorizer for xgboost model
def load_model():    
    classifier = xgboost.Booster()
    classifier.load_model('/home/j/Documents/Projects/social-media-combat-detection/models/xgb_classifier')
    print('Model loaded')
    with open('/home/j/Documents/Projects/social-media-combat-detection/models/tfid-vectorizer.pickle', 'rb') as handle:
        vectorizer = pickle.load(handle)
    print('Vectorizer loaded')
    return classifier, vectorizer

def clean(msg_text):
    msg_text = re.sub(r'http[s]?://\S+', '', msg_text)
    msg_text = re.sub(r'\s*[@#]\w+\b', '', msg_text)
    msg_text = emoji.demojize(msg_text)
    return msg_text

# define function to classify messages with model
async def find_combats(messages, classifier, vectorizer):
    # iteratively predicts messages
    combats = []
    count = 0
    total = len(messages)
    for message in messages:
        vectorized = xgboost.DMatrix(vectorizer.transform([clean(message.text)]))
        if classifier.predict(vectorized) >= 0.5:
            print('Combat found')
            combats.append(message.text)
            print('Continuing classifications...')
        count += 1
        print ("\033[A                                                                  \033[A")
        print(f"{count}/{total} classified...")
    return combats