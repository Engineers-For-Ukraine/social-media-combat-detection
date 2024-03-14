import pandas as pd
import os

df = pd.read_csv('data/scrapes/scrape_1.csv')
df = df.dropna()

scrape_list = os.listdir('data/scrapes')

for csv in scrape_list[1:]:
    new_df = pd.read_csv('data/scrapes/'+csv)
    new_df = new_df.dropna()
    df = pd.concat([df, new_df])

df.to_csv('full_scrape.csv')