const { simpleName, dateToISOString } = require('./util');
const Random = require('meteor-random');

function createOrg(row, country) {
    let org = {
                    "_id": Random.id(),
                    "simple": simpleName(row.Organizacion),
                    "name": row.Organizacion,
                    "names": [ row.Organizacion ],
                    "parent": row.parentOrg,
                    "category": "public",
                    "source": "cargografias",
                    "address": { "country": country },
                    "user_id": ""
                };
    return org;
}

function createPartyOrg(row, country) {
    let orgName = row.partido ? row.partido : row.partidoGeneral;
    let org = {
                    "_id": Random.id(),
                    "simple": simpleName(orgName),
                    "name": orgName,
                    "names": [ orgName ],
                    "initials": row.partidoGeneral,
                    "category": "party",
                    "source": "cargografias",
                    "address": { "country": country },
                    "user_id": ""
                };
    return org;
}

function isOrg(org_id, index) {
    return index.indexOf(org_id);
}

module.exports = { createOrg, createPartyOrg, isOrg };
