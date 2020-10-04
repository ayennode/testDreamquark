#! /bin/bash

mongoimport --host mongo --db dreamquark --collection jobs --type json --file /mongo-seed/database.json