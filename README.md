you can use the project directly on docker
```
docker-compose build
```
then when the build is done

```
docker-compose up
```

to access the website, go on http://localhost:8080
you'll notice there is already data in the page "fonction"


if you don't want to use docker, there is some change to do
first you modify inside src/server/model/index.js
replace `'mongodb://mongo:27017/dreamquark'` by `'mongodb://localhost:27017/dreamquark'`

then you have to import the data for the jobs
```
mongoimport --host localhost --db dreamquark --collection jobs --type json --file ./database.json
```

and the classic `npm install` then `npm start`
