# cargografias-transformer

Transforms data from Cargografías into Popolo standard in JSON.

## Usage

    cat CSV_FILE | node index.js -c COUNTRY

## Options

    --country       -c      Name of the country for the dataset being processed.

## Details

Cargografías is a project which collects information on the people occupying government posts. The project compiles each person's trajectory inside a government by tracking which posts the person has occupied and for how long.

The data is stored in CSV format. This script receives a country's entire CSV file through stdin and outputs JSON documents in Popolo format for persons, organizations, and memberships. Each collection is sent to stdout as a stream of JSON objects, one object per line, and split using a special delimiter string: **[SPLIT]**. The output order is persons, organizations, and memberships.
