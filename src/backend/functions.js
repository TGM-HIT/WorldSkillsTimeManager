const sqlite3 = require('sqlite3').verbose();
function openConnection() {
    const db = new sqlite3.Database("./worldskillsdata");
    db.run("PRAGMA foreign_keys = ON", (err) => {
        if (err) {
            console.error("Error enabling foreign key support:", err);
        }
    });
    return db;
}
async function loginUser(username, password) {
    const db = openConnection();

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
function getTable(callback, tablename) {
    const db = openConnection();
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

function getRow(callback, tablename, id) {
    const db = openConnection();
    const query = `SELECT * FROM ${tablename} WHERE id = ?`;
    console.log(query);
    db.all(query, [id], (err, rows) => {
        if (err) {
            console.error("Error fetching resources:", err);
            callback(err, null);
        } else {
            console.log("Resources fetched successfully:", rows);
            callback(null, rows);
        }
        db.close(); // Verbindung schließen
    });
}

function deleteRow(callback, tablename, id) {
    const db = openConnection();

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
function duplicateRow(callback, tablename, id) {
    const db = openConnection();

    if (!/^[a-zA-Z0-9_]+$/.test(tablename)) {
        callback(new Error("Ungültiger Tabellenname"), null);
        return;
    }

    const query = `SELECT * FROM ${tablename} WHERE id = ?`;
    
    db.get(query, [id], (err, row) => {
        if (err) {
            callback(err, null);
            db.close();
            return;
        }

        if (!row) {
            callback(new Error("Keine Zeile mit dieser ID gefunden"), null);
            db.close();
            return;
        }

        delete row.id;
        
        setTable(tablename, row, (err, result) => {
            db.close();
            if (err) {
                callback(err, null);
            } else {
                callback(null, { success: true, newId: result.id });
            }
        });
    });
}

function setTable(table, data, callback) {
    const db = openConnection();

    db.get(`SELECT id FROM ${table} WHERE id = 1`, (err, row) => {
        if (err) {
            callback(err, null);
            db.close();
            return;
        }

        if (!row) {
            data.id = 1;
        } else {
            db.get(`SELECT MIN(t1.id + 1) AS nextID 
                    FROM ${table} t1 
                    WHERE NOT EXISTS 
                        (SELECT 1 FROM ${table} t2 WHERE t2.id = t1.id + 1)`,
                (err, row) => {
                    if (err) {
                        callback(err, null);
                        db.close();
                        return;
                    }

                    data.id = row?.nextID || 1;

                    const columns = Object.keys(data).join(", ");
                    const placeholders = Object.keys(data).map(() => "?").join(", ");
                    const values = Object.values(data);

                    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

                    db.run(query, values, function (err) {
                        db.close();
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, { success: true, id: data.id });
                        }
                    });
                }
            );
            return;
        }
        const columns = Object.keys(data).join(", ");
        const placeholders = Object.keys(data).map(() => "?").join(", ");
        const values = Object.values(data);

        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

        db.run(query, values, function (err) {
            db.close();
            if (err) {
                callback(err, null);
            } else {
                callback(null, { success: true, id: data.id });
            }
        });
    });
}


function updateRow(table, data, callback) {
    const db = openConnection();

    if (!data.id) {
        callback(new Error("ID is required in the data object"), null);
        return;
    }
    const id = data.id;
    delete data.id;
    const columns = Object.keys(data).map(key => `${key} = ?`).join(", ");
    const values = Object.values(data);
    values.push(id); // ID ans Ende der Werte für die WHERE-Klausel anhängen

    const query = `UPDATE ${table} SET ${columns} WHERE id = ?`;

    db.run(query, values, function (err) {
        if (err) {
            console.error("Error updating data:", err);
            callback(err, null);
        } else if (this.changes === 0) {
            callback(new Error("No record found with the given ID"), null);
        } else {
            callback(null, { success: true, id: id });
        }
        db.close();
    });
}
function deleteRows(table, where) {
    const whereClause = Object.keys(where)
        .map(key => `${key} = ?`)
        .join(' AND ');

    const values = Object.values(where);

    const sql = `DELETE FROM ${table} WHERE ${whereClause}`;

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./worldskillsdata');
        db.run(sql, values, function (err) {
            if (err) {
                return reject(err);
            }
            resolve(this.changes); // Gibt die Anzahl der gelöschten Zeilen zurück
            db.close();
        });
    });
}

function setTimeslot(timeslot, callback) {

    const db = openConnection();



    db.serialize(() => {
        db.run("BEGIN TRANSACTION");
        db.get(`SELECT MIN(t1.id + 1) AS nextID FROM timeslot t1 WHERE NOT EXISTS (SELECT 1 FROM timeslot t2 WHERE t2.id = t1.id + 1)`, (err, row) => {
            if (err) {
                db.run("ROLLBACK");
                callback(err);
                db.close();
                return;
            }
            const nextID = row.nextID || 1;
            const timeslotQuery = `INSERT INTO timeslot (id, name, description, type, day, time_from, time_to, soundeffect_id, allowed_overlaps)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const timeslotParams = [
                nextID,
                timeslot.name,
                timeslot.description,
                timeslot.type,
                timeslot.day,
                timeslot.time_from,
                timeslot.time_to,
                timeslot.soundeffect_id,
                timeslot.allowed_overlaps
            ];
            db.run(timeslotQuery, timeslotParams, function (err) {
                if (err) {
                    db.run("ROLLBACK");
                    callback(err);
                    return;
                }
                const timeslotId = nextID;
                if (Array.isArray(timeslot.teams) && timeslot.teams.length > 0) {
                    const teamQuery = `INSERT INTO timeslot_teams (timeslot_id, team_id) VALUES (?, ?)`;
                    const teamStmt = db.prepare(teamQuery);
                    timeslot.teams.forEach(teamId => {
                        teamStmt.run(timeslotId, teamId);
                    });
                    teamStmt.finalize();
                }
                if (Array.isArray(timeslot.groups) && timeslot.groups.length > 0) {
                    const groupQuery = `INSERT INTO timeslot_groups (timeslot_id, group_id) VALUES (?, ?)`;
                    const groupStmt = db.prepare(groupQuery);
                    timeslot.groups.forEach(groupId => {
                        groupStmt.run(timeslotId, groupId);
                    });
                    groupStmt.finalize();
                }
                if (Array.isArray(timeslot.resources) && timeslot.resources.length > 0) {
                    const resourceQuery = `INSERT INTO timeslot_resources (timeslot_id, resource_id) VALUES (?, ?)`;
                    const resourceStmt = db.prepare(resourceQuery);
                    timeslot.resources.forEach(resourceId => {
                        resourceStmt.run(timeslotId, resourceId);
                    });
                    resourceStmt.finalize();
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
    });
}
async function getTimeslot(editId) {
    const db = openConnection();

    try {
        const timeslot = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM timeslot WHERE id = ?", [editId], (err, timeslot) => {
                if (err) return reject(err);
                resolve(timeslot);
            });
        });

        if (!timeslot) throw new Error("Timeslot not found");

        const [teams, groups, resources] = await Promise.all([
            new Promise((resolve, reject) => {
                db.all("SELECT team_id FROM timeslot_teams WHERE timeslot_id = ?", [editId], (err, teams) => {
                    if (err) return reject(err);
                    resolve(teams);
                });
            }),
            new Promise((resolve, reject) => {
                db.all("SELECT group_id FROM timeslot_groups WHERE timeslot_id = ?", [editId], (err, groups) => {
                    if (err) return reject(err);
                    resolve(groups);
                });
            }),
            new Promise((resolve, reject) => {
                db.all("SELECT resource_id FROM timeslot_resources WHERE timeslot_id = ?", [editId], (err, resources) => {
                    if (err) return reject(err);
                    resolve(resources);
                });
            }),
        ]);

        console.log("Fetched Timeslot:", timeslot);
        console.log("Fetched Teams:", teams);
        console.log("Fetched Groups:", groups);
        console.log("Fetched Resources:", resources);

        return [{
            id: timeslot.id,
            name: timeslot.name,
            description: timeslot.description,
            type: timeslot.type,
            day: timeslot.day,
            time_from: timeslot.time_from,
            time_to: timeslot.time_to,
            resources: resources.map(r => r.resource_id),
            teams: teams.map(t => t.team_id),
            groups: groups.map(g => g.group_id),
            soundeffect_id: timeslot.soundeffect_id,
            allowed_overlaps: timeslot.allowed_overlaps,
        }];
    } catch (err) {
        console.error("Error fetching timeslot:", err);
        throw err;
    } finally {
        db.close();
    }
}



function editTimeslot(timeslot, callback) {
    const db = openConnection();

    db.serialize(() => {
        db.run("BEGIN TRANSACTION");

        let errorOccurred = false;

        function executeQuery(query, params, next) {
            if (errorOccurred) return;
            db.run(query, params, function (err) {
                if (err) {
                    errorOccurred = true;
                    db.run("ROLLBACK");
                    callback(err);
                    return;
                }
                if (next) next();
            });
        }

        const updateFields = [
            { field: 'name', value: timeslot.name },
            { field: 'description', value: timeslot.description },
            { field: 'type', value: timeslot.type },
            { field: 'day', value: timeslot.day },
            { field: 'time_from', value: timeslot.time_from },
            { field: 'time_to', value: timeslot.time_to },
            { field: 'soundeffect_id', value: timeslot.soundeffect_id },
            { field: 'allowed_overlaps', value: timeslot.allowed_overlaps }
        ];

        updateFields.forEach(({ field, value }) => {
            executeQuery(`UPDATE timeslot SET ${field} = ? WHERE id = ?`, [value, timeslot.id]);
        });

        if (errorOccurred) return;

        const deleteQueries = [
            "DELETE FROM timeslot_teams WHERE timeslot_id = ?",
            "DELETE FROM timeslot_groups WHERE timeslot_id = ?",
            "DELETE FROM timeslot_resources WHERE timeslot_id = ?"
        ];
        
        deleteQueries.forEach(query => {
            executeQuery(query, [timeslot.id]);
        });

        if (errorOccurred) return;

        function insertAssociations(table, column, values) {
            if (!Array.isArray(values) || values.length === 0) return;
            values.forEach(value => {
                executeQuery(`INSERT INTO ${table} (timeslot_id, ${column}) VALUES (?, ?)`, [timeslot.id, value]);
            });
        }

        insertAssociations("timeslot_teams", "team_id", timeslot.teams);
        insertAssociations("timeslot_groups", "group_id", timeslot.groups);
        insertAssociations("timeslot_resources", "resource_id", timeslot.resources);

        if (errorOccurred) return;

        executeQuery("COMMIT", [], () => {
            callback(null, { timeslotId: timeslot.id });
            db.close();
        });
    });
}


function getCondition(table, condition, callback) {
    const db = openConnection();
    const query = `SELECT * FROM ${table} WHERE ${condition}`;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(`Error fetching data from ${table}:`, err);
            callback(err, null);
        } else {
            callback(null, rows);
        }
        db.close();
    });
}


function getSound(id, callback) {
    const db = openConnection();

    try {
        db.get("SELECT * FROM soundeffect WHERE id = ?", [id], (err, row) => {
            if (err || row.file == null) {
                console.error("Fehler beim Abrufen des Sounds:", err);
                callback(err, null);
            } else {
                callback(null, row.file);
            }
            db.close();
        });
    } catch (error) {
        console.log(error);
    }
}
function getPictureFromTeam(id, callback) {
    const db = openConnection();

    db.get("SELECT flag FROM team WHERE id = ?", [id], (err, row) => {
        if (err || !row || !row.flag) {
            console.error("Fehler beim Abrufen des Base64-Strings:", err);
            return callback(err || new Error("Kein Base64-String vorhanden"), null);
        }
        callback(null, row.flag); // Nur das Base64-String-Feld zurückgeben
        db.close();
    });
}

function getPictureFromParticipant(id, callback) {
    const db = openConnection();

    db.get("SELECT image FROM participant WHERE id = ?", [id], (err, row) => {
        if (err || !row || !row.image) {
            console.error("Fehler beim Abrufen des Base64-Strings:", err);
            return callback(err || new Error("Kein Base64-String vorhanden"), null);
        }
        callback(null, row.image); // Nur das Base64-String-Feld zurückgeben
        db.close();
    });
}

/*
function getAllTimeslotsByTeamID(id, callback) {
    try {

        const db = openConnection();

        db.all(`SELECT t.id, ts.id, ts.name, ts.type, ts.description, ts.day, ts.time_from, ts.time_to FROM team t JOIN timeslot_teams tt ON t.id = tt.team_id JOIN timeslot ts ON tt.timeslot_id = ts.id WHERE t.id = ${id}`, (err, rows) => {
            if (err) {
                console.error("Fehler beim Abrufen der Timeslots:", err);
                callback(err, null);
            } else {
                callback(null, rows);
            }
            db.close();
        });
    } catch (error) {

    }
}
*/

function getAllTimeslotsByTeamID(ids, callback) {
    try {
        const db = openConnection();

        const query = `
            SELECT 
                ts.id AS timeslotID, 
                ts.name, 
                ts.type, 
                ts.description, 
                ts.day, 
                ts.time_from, 
                ts.time_to,
                GROUP_CONCAT(t.id) AS teamIDs
            FROM team t
            JOIN timeslot_teams tt ON t.id = tt.team_id
            JOIN timeslot ts ON tt.timeslot_id = ts.id
            WHERE t.id IN (${ids.map(() => "?").join(",")})
            GROUP BY ts.id;`; 

        db.all(query, ids, (err, rows) => {
            if (err) {
                console.error("Fehler beim Abrufen der Timeslots:", err);
                callback(err, null);
            } else {
                // Umwandeln der CSV `teamIDs` in ein Array
                const formattedRows = rows.map(row => ({
                    timeslotID: row.timeslotID,
                    name: row.name,
                    type: row.type,
                    description: row.description,
                    day: row.day,
                    time_from: row.time_from,
                    time_to: row.time_to,
                    teamIDs: row.teamIDs.split(",").map(Number) // String in Array umwandeln
                }));

                callback(null, formattedRows);
            }
            db.close();
        });
    } catch (error) {
        console.error("Fehler in getAllTimeslotsByTeamID:", error);
        callback(error, null);
    }
}

function getAllParticipantsByTeamID(ids, callback) {
    try {
        console.log("IDs received:", ids);

        const db = openConnection();
        const query = `
            SELECT 
                p.id AS participantID, 
                p.first_name, 
                p.last_name, 
                GROUP_CONCAT(t.id) AS teamIDs  -- Alle Team-IDs als CSV
            FROM team t
            JOIN participant p ON t.id = p.team_id
            WHERE t.id IN (${ids.map(() => "?").join(",")})  -- Platzhalter für IDs
            GROUP BY p.id;  -- Gruppieren nach Teilnehmer-ID

        `;

        db.all(query, ids, (err, rows) => {
            if (err) {
                console.error("SQL Error:", err);
                callback(err, null);
            } else {
                const formattedRows = rows.map(row => ({
                    participantID: row.participantID,
                    firstName: row.first_name,
                    lastName: row.last_name,
                    teamIDs: row.teamIDs ? row.teamIDs.split(",").map(Number) : []
                }));

                console.log("Query Result:", formattedRows);
                callback(null, formattedRows);
            }
            db.close();
        });
    } catch (error) {
        console.error("Function Error:", error);
        callback(error, null);
    }
}


function getAllTeamsByGroupID(id, callback) {
    try {

        const db = openConnection();
        db.all(`SELECT g.id, g.name, t.id, t.name FROM groups g JOIN groupteams gt ON g.id = gt.groupid JOIN team t ON gt.teamid = t.id WHERE g.id = ${id}`, (err, rows) => {

            if (err) {
                console.error("Fehler beim Abrufen der Teams:", err);
                callback(err, null);
            } else {
                callback(null, rows);
            }
            db.close();
        });

    } catch (error) {
        console.log(error);
    }
}

function getAllTeamsUsingResourceByID(id, callback) {
    try {
        const db = openConnection();
        db.all(`SELECT 
                    r.id AS resource_id, 
                    r.name AS resource_name, 
                    t.id AS team_id, 
                    t.name AS team_name,
                    ts.time_from, 
                    ts.time_to
                FROM resource r 
                JOIN timeslot_resources tr ON r.id = tr.resource_id
                JOIN timeslot ts ON tr.timeslot_id = ts.id
                JOIN timeslot_teams tt ON ts.id = tt.timeslot_id
                JOIN team t ON tt.team_id = t.id 
                WHERE r.id = ? 
                ORDER BY ts.time_from ASC;`, 
            [id], 
            (error, rows) => {
                if (error) {
                    console.error("Fehler beim Abrufen der Teams:", error);
                    callback(error, null);
                } else {
                    callback(null, rows);
                }
                db.close();
            }
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = { loginUser, getTable, setTable, setTimeslot, deleteRow, getSound, getPictureFromTeam, getPictureFromParticipant, getRow, updateRow, deleteRows, getCondition, editTimeslot, getTimeslot, getAllTimeslotsByTeamID, getAllParticipantsByTeamID, getAllTeamsByGroupID,getAllTeamsUsingResourceByID, duplicateRow};