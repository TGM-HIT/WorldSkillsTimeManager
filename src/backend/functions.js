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

function deleteRow(callback, tablename, id) {
    const db = new sqlite3.Database('./worldskillsdata');

    // Verhindere SQL-Injection, indem der Tabellenname überprüft wird
    if (!/^[a-zA-Z0-9_]+$/.test(tablename)) {
        callback(new Error("Ungültiger Tabellenname"), null);
        return;
    }

    const query = `DELETE FROM ${tablename} WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.error("Fehler beim Löschen:", err);
            callback(err, null);
        } else {
            console.log(`Erfolgreich gelöscht, betroffene Zeilen: ${this.changes}`);
            callback(null, { deletedRows: this.changes });
        }
        db.close();
    });
}

function editRow(callback, tablename, id, newData) {
    const db = new sqlite3.Database("./worldskillsdata");

    // Verhindere SQL-Injection durch Validierung des Tabellennamens
    if (!/^[a-zA-Z0-9_]+$/.test(tablename)) {
        return callback(new Error("Ungültiger Tabellenname"), null);
    }

    // Verhindere, dass keine Daten oder ungültige Parameter übergeben werden
    if (!id || !newData || typeof newData !== 'object' || Object.keys(newData).length === 0) {
        return callback(new Error("Fehlende oder ungültige Daten zum Aktualisieren"), null);
    }

    // Dynamisch das SQL-Statement für das Update bauen
    const keys = Object.keys(newData);
    const values = Object.values(newData);

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE ${tablename} SET ${setClause} WHERE id = ?`;

    db.run(query, [...values, id], function (err) {
        if (err) {
            console.error("Fehler beim Aktualisieren:", err);
            return callback(err, null);
        } else {
            console.log(`Erfolgreich aktualisiert, betroffene Zeilen: ${this.changes}`);
            return callback(null, { updatedRows: this.changes });
        }
    });

    db.close();
}


module.exports = { editRow };



function setTable(table, data, callback) {
    const db = new sqlite3.Database("./worldskillsdata");
    
    db.get(`SELECT MIN(t1.id + 1) AS nextID FROM ${table} t1 WHERE NOT EXISTS (SELECT 1 FROM ${table} t2 WHERE t2.id = t1.id + 1)`, (err, row) => {
        if (err) {
            console.error("Error fetching next available ID:", err);
            callback(err, null);
            db.close();
            return;
        }
        
        const nextID = row.nextID || 1; // Falls die Tabelle leer ist, starte mit ID 1
        
        data.id = nextID; // Setze die gefundene kleinste verfügbare ID
        
        const columns = Object.keys(data).join(", ");
        const placeholders = Object.keys(data).map(() => "?").join(", ");
        const values = Object.values(data);
        
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        
        db.run(query, values, function (err) {
            if (err) {
                console.error("Error inserting data:", err);
                callback(err, null);
            } else {
                callback(null, { success: true, id: nextID });
            }
            db.close();
        });
    });
}
function setTimeslot(timeslot, callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    db.serialize(() => {
        db.run("BEGIN TRANSACTION");

        const timeslotQuery = `
            INSERT INTO timeslot (name, description, type, day, time_from, time_to, soundeffect_id, allowed_overlaps)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const timeslotParams = [
            timeslot.name,
            timeslot.description,
            timeslot.type,
            timeslot.day,
            timeslot.time_from,
            timeslot.time_to,
            timeslot.soundeffect,
            timeslot.allowed_overlaps
        ];

        db.run(timeslotQuery, timeslotParams, function (err) {
            if (err) {
                db.run("ROLLBACK");
                callback(err);
                return;
            }

            if (!this.lastID) {
                db.run("ROLLBACK");
                callback(new Error("Fehler: Keine ID für Timeslot generiert"));
                return;
            }

            const timeslotId = this.lastID;

            if (Array.isArray(timeslot.resources) && timeslot.resources.length > 0) {
                const resourceQuery = `INSERT INTO timeslot_resource (timeslot_id, resource_id) VALUES (?, ?)`;
                const resourceStmt = db.prepare(resourceQuery);
                timeslot.resources.forEach(resourceId => {
                    resourceStmt.run(timeslotId, resourceId);
                });
                resourceStmt.finalize();
            }

            if (Array.isArray(timeslot.affected) && timeslot.affected.length > 0) {
                const affectedQuery = `INSERT INTO affected (timeslotid, grouporteamid, type) VALUES (?, ?, ?)`;
                const affectedStmt = db.prepare(affectedQuery);
                timeslot.affected.forEach(({ id, type }) => {
                    if (id && type) {
                        affectedStmt.run(timeslotId, id, type);
                    }
                });
                affectedStmt.finalize();
            }

            db.run("COMMIT", err => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, { timeslotId });
                }
                db.close();
            });
        });
    });
}
function getSound(id, callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    db.get("SELECT * FROM soundeffect WHERE id = ?", [id], (err, row) => {
        if (err || row.file == null) {
            console.error("Fehler beim Abrufen des Sounds:", err);
            callback(err, null);
        } else {
            callback(null, row);
        }
        db.close();
    });
}
function getPictureFromTeam(id, callback) {
    const db = new sqlite3.Database('./worldskillsdata');

    db.get("SELECT * FROM team WHERE id = ?", [id], (err, row) => {
        if (err || !row || !row.picture) {
            console.error("Fehler beim Abrufen des Bildes:", err);
            return callback(err || new Error("Kein Bild vorhanden"), null);
        }
         else {
            callback(null, row.picture);
        }
        db.close();
    });
}



module.exports = { loginUser,getTable,setTable, setTimeslot, deleteRow,getSound,getPictureFromTeam};
