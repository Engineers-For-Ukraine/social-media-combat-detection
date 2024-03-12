from selenium import webdriver
import pandas as pd
from bs4 import BeautifulSoup

browser = webdriver.Chrome()

def get_data(url):
    # Use Chrome as the browser

    # Navigate to the URL
    browser.get(url)
    browser.implicitly_wait(10)
    # Get the source HTML of the page
    source = browser.page_source

    soup = BeautifulSoup(source, 'lxml')

    # try to get dates from html
    dates = soup.find_all(class_='date')

    # try to get messages from html
    messages = soup.find_all(class_='text')

    d = {'datetime': dates, 'message': messages}
    df = pd.DataFrame(data=d)

    return df

def scrape(start, end):
    for i in range(start, end + 1):
        # key info
        year = '2023'
        month = str(i)
        if len(month) < 2:
            month = '0' + month
        date = year + '-' + month
        last_page_num = 150

        # get the first page
        url = 'https://ukraine.osintukraine.com/' + date + '.html'
        df = get_data(url)

        for j in range(2,last_page_num):
            try:
                url = 'https://ukraine.osintukraine.com/'+ date + '_' + str(j) + '.html'
                sub_df = get_data(url)
                df = pd.concat([df, sub_df])
            except:
                break
        
        df.to_csv('scrape_'+str(i)+'.csv')

scrape(1, 10)

print('Done!')