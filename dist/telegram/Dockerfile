FROM python:3.10.12
WORKDIR /telegram
ADD . . 
RUN pip install asyncio pymongo thefuzz datetime 
RUN pip install emoji pickle5 xgboost telethon 
RUN pip install scikit-learn
CMD ["python3", "main.py"]