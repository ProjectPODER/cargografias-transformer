const Random = require('meteor-random');
const { simpleName, dateToISOString } = require('./util');

function createPerson(row, country) {
    let personName = row.Nombre + ' ' + row.Apellido;
    let person = {
                    "_id": Random.id(),
                    "simple": simpleName(personName),
                    "name": personName,
                    "names": [ personName ],
                    "first_name": row.Nombre,
                    "family_name": row.Apellido,
                    "gender": getGender(row.sexo),
                    "occupation": row.Profesion,
                    "imageUrl": row.urlFoto,
                    "birth_date": row.nacimiento ? dateToISOString(row.nacimiento) : '',
                    "death_date": row.muerte ? dateToISOString(row.muerte) : '',
                    "source": "cargografias",
                    "address": { "country": country },
                    "user_id": ""
                };
    return person;
}

function isPerson(person_id, index) {
    return index.indexOf(person_id);
}

function getGender(string) {
    /*
    switch(string) {
        case 'Hombre':
            return '';
    }
    */
    return string; // TODO: luego manejamos los casos del idioma...
}

module.exports = { createPerson, isPerson };
