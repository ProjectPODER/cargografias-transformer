const { createPerson, isPerson } = require('./person');
const { createOrg, createPartyOrg, isOrg } = require('./organization');
const { createMember, createPartyMember, isMember } = require('./membership');
const simpleName = require('./util').simpleName;

let persons = [];
let persons_index = [];
let orgs = [];
let orgs_index = [];
let memberships = [];
let memberships_index = [];
// let roles = [];          TODO: todos estos para después
// let roles_index = [];
// let areas = [];
// let areas_index = [];

function parseCollection(collection, country) {
    collection.map( (row) => {
        if(isPerson(simpleName(row.Nombre + ' ' + row.Apellido), persons_index) < 0) {
            // createPerson (devuelve simple de persona)
            let person = createPerson(row, country);
            persons.push(person);
            persons_index.push(person.simple);
        }

        if(row.Organizacion) {
            if(isOrg(simpleName(row.Organizacion), orgs_index) < 0) {
                // createOrg de organismo (devuelve simple de org)
                let org_1 = createOrg(row, country);
                orgs.push(org_1);
                orgs_index.push(org_1.simple);
            }
        }

        var cargoID = simpleName(row.Nombre + ' ' + row.Apellido + ' ' + row.Organizacion);
        if(isMember(cargoID, memberships_index) < 0) {
            // createMember de cargo
            let member_1 = createMember(row, country);
            memberships.push(member_1);
            memberships_index.push(cargoID);
        }

        if(row.partido || row.partidoGeneral) {
            var partyOrg = row.partido ? row.partido : row.partidoGeneral;
            if(isOrg(simpleName(partyOrg), orgs_index) < 0) {
                // createOrg de partido (devuelve simple de org)
                let org_2 = createPartyOrg(row, country);
                orgs.push(org_2);
                orgs_index.push(org_2.simple);
            }

            var memberID = simpleName(row.Nombre + ' ' + row.Apellido + ' ' + partyOrg);
            if(isMember(memberID, memberships_index) < 0) {
                // createMember de partido
                let member_2 = createPartyMember(row, country);
                memberships.push(member_2);
                memberships_index.push(memberID);
            }
        }

    } );

    return { "persons": persons, "orgs": orgs, "memberships": memberships };
}

module.exports = parseCollection;
