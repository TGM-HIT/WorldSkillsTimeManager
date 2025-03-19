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

function getRow(callback, tablename, id) {
    const db = new sqlite3.Database('./worldskillsdata');
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

function updateRow(table, data, callback) {
    const db = new sqlite3.Database("./worldskillsdata");
    
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
      db.run(sql, values, function(err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); // Gibt die Anzahl der gelöschten Zeilen zurück
        db.close();
      });
    });
  }
  
  function setTimeslot(timeslot, callback) {
    const db = new sqlite3.Database("./worldskillsdata");
  
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
  
        const timeslotQuery = `
          INSERT INTO timeslot (id, name, description, type, day, time_from, time_to, soundeffect_id, allowed_overlaps)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
  
        const timeslotParams = [
          nextID,
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
  

  function getCondition(table, condition, callback) {
    const db = new sqlite3.Database('./worldskillsdata');
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
    const db = new sqlite3.Database('./worldskillsdata');
    
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
    const db = new sqlite3.Database('./worldskillsdata');

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
    const db = new sqlite3.Database('./worldskillsdata');

    db.get("SELECT image FROM participant WHERE id = ?", [id], (err, row) => {
        if (err || !row || !row.image) {
            console.error("Fehler beim Abrufen des Base64-Strings:", err);
            return callback(err || new Error("Kein Base64-String vorhanden"), null);
        }
        callback(null, row.image); // Nur das Base64-String-Feld zurückgeben
        db.close();
    });
}
module.exports = { loginUser,getTable,setTable, setTimeslot, deleteRow,getSound,getPictureFromTeam,getPictureFromParticipant, getRow, updateRow, deleteRows, getCondition};