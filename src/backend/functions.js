const sqlite3 = require('sqlite3').verbose();

function getResources(callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `SELECT * FROM resource`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error fetching resources:", err);
            callback(err, null);
        } else {
            console.log("Resources fetched successfully:", rows);
            callback(null, rows); // Erfolgreiche Rückgabe der Daten
        }
        db.close(); // Datenbank wird nach Abschluss geschlossen
    });
}
function getAffected(callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `SELECT * FROM affected`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error fetching resources:", err);
            callback(err, null);
        } else {
            console.log("Resources fetched successfully:", rows);
            callback(null, rows); // Erfolgreiche Rückgabe der Daten
        }
        db.close(); // Datenbank wird nach Abschluss geschlossen
    });
}
function getParticipant(callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `SELECT * FROM participant`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error fetching resources:", err);
            callback(err, null);
        } else {
            console.log("Resources fetched successfully:", rows);
            callback(null, rows); // Erfolgreiche Rückgabe der Daten
        }
        db.close(); // Datenbank wird nach Abschluss geschlossen
    });
}
function getTeam(callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `SELECT * FROM team`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error fetching resources:", err);
            callback(err, null);
        } else {
            console.log("Resources fetched successfully:", rows);
            callback(null, rows); // Erfolgreiche Rückgabe der Daten
        }
        db.close(); // Datenbank wird nach Abschluss geschlossen
    });
}
function getTimeslottype(callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `SELECT * FROM resource`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error fetching resources:", err);
            callback(err, null);
        } else {
            console.log("Resources fetched successfully:", rows);
            callback(null, rows); // Erfolgreiche Rückgabe der Daten
        }
        db.close(); // Datenbank wird nach Abschluss geschlossen
    });
}

function setResources(resource, callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `
        INSERT INTO resource (id, name, description)
        VALUES (?, ?, ?)
    `;

    const params = [
        resource.id || null,  // Automatische ID, wenn keine angegeben ist
        resource.name,
        resource.description,
    ];

    db.run(query, params, function (err) { });
    db.close();
}

function setType(type, callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `
            INSERT INTO timeslottype (name, description, color)
            VALUES (?, ?, ?)
        `;

    const params = [
        type.name,
        type.description,
        type.color,
    ];

    db.run(query, params);
    db.close();
}

module.exports = { getResources, setResources, setType };
