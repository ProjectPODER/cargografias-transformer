const { simpleName, dateToISOString } = require('./util');
const Random = require('meteor-random');

function createMember(row, country) {
    let membership = {
                    "_id": Random.id(),
                    "person": row.Nombre + ' ' + row.Apellido,
                    "person_id": simpleName(row.Nombre + ' ' + row.Apellido),
                    "post_type": row.cargoTipo,
                    "post_class": row.cargoClase,
                    "role": row.cargoNominal,
                    "sob_org": row.Organizacion ? simpleName(row.Organizacion) : '',
                    "start_date": row.fechaInicio ? dateToISOString(row.fechaInicio) : (row.fechaNombramiento ? dateToISOString(row.fechaNombramiento) : row.fechaInicioYear),
                    "end_date": row.fechaFin ? dateToISOString(row.fechaFin) : row.fechaFinYear,
                    "territory": row.territorio,
                    "territory_extended": row.territorioExtendido,
                    "source": "cargografias",
                    "user_id": ""
                };

    let references = [];
    let ref_inicio = { "chequeado": false, "field": "start_date" };
    let ref_final = { "chequeado": false, "field": "end_date" };

    if(row.urlFuenteInicio) {
        Object.assign(ref_inicio, { "url": row.urlFuenteInicio });
    }
    if(row.calidadDelDatoInicio) {
        Object.assign(ref_inicio, { "quality": row.calidadDelDatoInicio.replace(' [chequeado]', '') });
        if(row.calidadDelDatoInicio.indexOf('[chequeado]') >= 0) { ref_inicio.chequeado = true }
    }
    if(row.urlFuenteFin) {
        Object.assign(ref_final, { "url": row.urlFuenteFin });
    }
    if(row.calidadDelDatoFin) {
        Object.assign(ref_final, { "quality": row.calidadDelDatoFin.replace(' [chequeado]', '') });
        if(row.calidadDelDatoFin.indexOf('[chequeado]') >= 0) { ref_final.chequeado = true }
    }

    references.push( ref_inicio );
    references.push( ref_final );
    Object.assign(membership, { "references": references });

    return membership;
}

function createPartyMember(row, country) {
    let partyOrg = row.partido ? row.partido : row.partidoGeneral;
    let membership = {
                    "_id": Random.id(),
                    "org": partyOrg,
                    "org_id": simpleName(partyOrg),
                    "person": row.Nombre + ' ' + row.Apellido,
                    "person_id": simpleName(row.Nombre + ' ' + row.Apellido),
                    "role": "member",
                    "sob_org": partyOrg ? simpleName(partyOrg) : '',
                    "territory": row.territorio,
                    "territory_extended": row.territorioExtendido,
                    "source": "cargografias",
                    "user_id": ""
                };
    return membership;
}

function isMember(member_id, index) {
    return index.indexOf(member_id);
}

module.exports = { createMember, createPartyMember, isMember };
