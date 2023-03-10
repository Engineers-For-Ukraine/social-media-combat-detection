import pandas as pd
from enrich_with_battles import enrich_with_battles

uk = pd.read_csv('../sentimental-data/kyiv/ukrainekyiv.csv')

uk = uk.drop(columns=['Unnamed: 0.2', 'Unnamed: 0.1', 'Unnamed: 0', 'message', 'city', 'oblast'])

uk_daily_means = uk.groupby(pd.to_datetime(uk['datetime']).dt.date)[['negativity', 'neutrality', 'positivity', 'compound']].mean()


# load in russia
ru = pd.read_csv('../sentimental-data/kyiv/russiakyiv.csv')

ru = ru.drop(columns=['Unnamed: 0.2', 'Unnamed: 0.1', 'Unnamed: 0', 'message', 'city', 'oblast'])

ru_daily_means = ru.groupby(pd.to_datetime(ru['datetime']).dt.date)[['negativity', 'neutrality', 'positivity', 'compound']].mean()


uk_daily_means.rename(columns = {'negativity' : 'uk_negativity',
                                 'neutrality': 'uk_neutrality',
                                 'positivity' : 'uk_positivity',
                                 'compound' : 'uk_compound'}, inplace=True)

ru_daily_means.rename(columns = {'negativity' : 'ru_negativity',
                                 'neutrality': 'ru_neutrality',
                                 'positivity' : 'ru_positivity',
                                 'compound' : 'ru_compound'}, inplace=True)

daily_means = uk_daily_means.join(ru_daily_means, on='datetime')

print(daily_means.head())