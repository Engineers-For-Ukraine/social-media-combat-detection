import xgboost
import pickle
import re
import emoji

class XGBClassifier:
    def __init__(self, model_path, vectorizer_path):
        self.model_path = model_path
        self.vectorizer_path = vectorizer_path
        self.classifier = None
        self.vectorizer = None
        self.load()

    def load(self):

        self.classifier = xgboost.Booster()
        self.classifier.load_model(self.model_path)
        print('Classifier loaded')

        with open(self.vectorizer_path, 'rb') as handle:
            self.vectorizer = pickle.load(handle)
        print('Vectorizer loaded')

    def clean(self, text):
        text = re.sub(r'http[s]?://\S+', '', text)
        text = re.sub(r'\s*[@#]\w+\b', '', text)
        text = emoji.demojize(text)
        return text
    
    def classify(self, messages):
        # iteratively predicts messages
        combats = []
        count = 0
        total = len(messages)
        for message in messages:
            vectorized = xgboost.DMatrix(self.vectorizer.transform([self.clean(message.text)]))
            if self.classifier.predict(vectorized) >= 0.5:
                combats.append(message.text)
            count += 1
            print ("\033[A                                                                  \033[A")
            print(f"{count}/{total} classified...")
        return combats