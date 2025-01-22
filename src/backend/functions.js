const sqlite3 = require('sqlite3').verbose();

function getResources(callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `SELECT * FROM resource`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error fetching resources:", err);
            callback(err, null);
        }
    });

    db.close();
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
