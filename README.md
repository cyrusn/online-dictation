# Online Dictation system

## Installation Guide

```sh
# import quiz
docker-compose build
```

```sh
# import quiz
ls -1 ./data | xargs -I@ docker-compose run --service-ports app import_quiz /app/data/@ --dsn="mongodb://mongo:27017"
```

```sh
# start server
-I@ docker-compose run --service-ports app serve --dsn="mongodb://mongo:27017"
```
