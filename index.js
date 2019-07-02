const es = require('event-stream');
const JSONStream = require('JSONStream');
const parseCollection = require('./lib/parse');
const monk = require('monk');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'country', alias: 'c', type: String }
];
const args = commandLineArgs(optionDefinitions);

let collection = [];

process.stdin.setEncoding('utf8');

process.stdin
    .pipe(JSONStream.parse())
    .pipe(es.through( (data) => {
            collectObjects( data );
        },
        () => {
            const parsedObjects = parseCollection( collection, args.country );
            emitObjects(parsedObjects);
        }));

function collectObjects(data) {
    collection.push(data)
}

function emitObjects(objetos) {
    let persons_str = '';
    let orgs_str = '';
    let members_str = '';
    let delimiter = '[SPLIT]';

    objetos.persons.map( (person) => { persons_str += JSON.stringify(person) + '\n' } );
    objetos.orgs.map( (org) => { orgs_str += JSON.stringify(org) + '\n' } );
    objetos.memberships.map( (member) => { members_str += JSON.stringify(member) + '\n' } );
    
    process.stdout.write( persons_str + delimiter + orgs_str + delimiter + members_str, process.exit );
}
