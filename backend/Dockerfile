FROM python:3.8-slim-buster

#WORKDIR /app
#COPY app.py app.py
#COPY requirements.txt requirements.txt


ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT 

WORKDIR /opt/flask-python
ENTRYPOINT [ "./boot-script.sh" ]