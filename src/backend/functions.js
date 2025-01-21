const sqlite3 = require('sqlite3').verbose();

function getResources(callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `SELECT * FROM resource`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error fetching resources:", err);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });

    db.close();
}

function setResources(callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `
        INSERT INTO resource (id, name, description)
        VALUES (?, ?, ?)
    `;

    const params = [
        resource.id,
        resource.name,
        resource.description,
    ];

    db.run(query, params, function (err) {
        if (err) {
            console.error("SQL Error:", err.message);
            callback(err, null);
        } else {
            callback(null, { message: "Resource saved successfully!", id: this.lastID });
        }
    });

    db.close();
}

module.exports = { getResources , setResources};
