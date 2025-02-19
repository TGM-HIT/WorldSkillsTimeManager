const sqlite3 = require('sqlite3').verbose();

async function loginUser(username, password) {
    const db = new sqlite3.Database("./worldskillsdata");

    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM login WHERE username = ?", [username], (err, user) => {
            if (err) {
                reject({ success: false, message: "Database error", error: err });
            } else if (!user) {
                resolve({ success: false, message: "User not found" });
            } else {
                const isMatch = password === user.password;

                resolve({ success: isMatch, message: isMatch ? "Login successful" : "Incorrect password" });
            }
        });

        db.close();
    });
}
function getTable(callback,tablename){
    const db = new sqlite3.Database('./worldskillsdata');
    const query = `SELECT * FROM ` + tablename;
    
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
function setTable(table, data, callback) {
    const db = new sqlite3.Database("./worldskillsdata");

    // Dynamische Spalten- und Werte-Zusammenstellung
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data).map(() => "?").join(", ");
    const values = Object.values(data);

    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    db.run(query, values, function (err) {
        if (err) {
            console.error("Error inserting data:", err);
            callback(err, null);
        } else {
            callback(null, { success: true, id: this.lastID });
        }
        db.close();
    });
}
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
        INSERT INTO resource ( name, description)
        VALUES ( ?, ?)
    `;

    const params = [
        resource.id || null,  // Automatische ID, wenn keine angegeben ist
        resource.name,
        resource.description,
    ];

    db.run(query, params, function (err) { });
    db.close();
}

function setTimeslot(timeslot, callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `
            INSERT INTO timeslot (name, description, type, day, time_from, time_to, allowed_overlaps)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

    const params = [
        timeslot.name,
        timeslot.description,
        timeslot.type,
        timeslot.day,
        timeslot.time_from,
        timeslot.time_to,
        timeslot.allowed_overlaps
    ];

    db.run(query, params);
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
function setTeam(team, callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    const query = `
            INSERT INTO team (name, country_code, country_name,flag)
            VALUES (?, ?, ?,?)
        `;

    const params = [
        team.name,
        team.country_code,
        team.country_name,
        team.flag
    ];

    db.run(query, params);
    db.close();
}


module.exports = { loginUser,getTable,setTable, setResources, setType, setTeam, setTimeslot,getTimeslottype,getTeam,getParticipant,getAffected,getResources};
