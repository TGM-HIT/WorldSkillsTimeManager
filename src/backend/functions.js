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
            timeslot.type,  // Falls die Spalte wirklich "typ" heißt
            timeslot.day,
            timeslot.time_from,
            timeslot.time_to,
            timeslot.soundeffect,
            timeslot.allowed_overlaps
        ];

        console.log("⏳ Führe INSERT in timeslot aus mit Parametern:", timeslotParams);

        db.run(timeslotQuery, timeslotParams, function (err) {
            if (err) {
                console.error("❌ Fehler beim Einfügen in timeslot:", err);
                db.run("ROLLBACK");
                callback(err);
                return;
            }

            if (!this.lastID) {
                console.error("❌ Fehler: lastID ist undefined!");
                db.run("ROLLBACK");
                callback(new Error("Fehler: Keine ID für Timeslot generiert"));
                return;
            }

            const timeslotId = this.lastID;
            console.log("✅ Neuer Timeslot gespeichert mit ID:", timeslotId);

            // Ressourcen speichern
            if (Array.isArray(timeslot.resources) && timeslot.resources.length > 0) {
                console.log("🔗 Speichere Ressourcen:", timeslot.resources);
                const resourceQuery = `INSERT INTO timeslot_resource (timeslot_id, resource_id) VALUES (?, ?)`;
                const resourceStmt = db.prepare(resourceQuery);
                timeslot.resources.forEach(resourceId => {
                    resourceStmt.run(timeslotId, resourceId, err => {
                        if (err) console.error("❌ Fehler in timeslot_resource:", err);
                    });
                });
                resourceStmt.finalize();
            } else {
                console.warn("⚠️ Keine Ressourcen zum Speichern!");
            }

            // Betroffene speichern
            if (Array.isArray(timeslot.affected) && timeslot.affected.length > 0) {
                console.log("🔗 Speichere betroffene Teams/Gruppen:", timeslot.affected);
                const affectedQuery = `INSERT INTO affected (timeslotid, grouporteamid, type) VALUES (?, ?, ?)`;
                const affectedStmt = db.prepare(affectedQuery);
                timeslot.affected.forEach(({ id, type }) => {
                    if (!id || !type) {
                        console.error("❌ Fehler: affected-Eintrag fehlt ID oder Typ:", { id, type });
                        return;
                    }
                    affectedStmt.run(timeslotId, id, type, err => {
                        if (err) console.error("❌ Fehler in affected:", err);
                    });
                });
                affectedStmt.finalize();
            } else {
                console.warn("⚠️ Keine betroffenen Teams/Gruppen zum Speichern!");
            }

            db.run("COMMIT", err => {
                if (err) {
                    console.error("❌ Fehler beim COMMIT:", err);
                    callback(err);
                } else {
                    console.log("✅ Timeslot erfolgreich gespeichert!");
                    callback(null, { timeslotId });
                }
                db.close();
            });
        });
    });
}


module.exports = { loginUser,getTable,setTable, setTimeslot};
