const express = require("express");
const cors = require("cors");
const functions = require("./functions");
const app = express();
const port = 5000;
const portweb = 5001;
const SECRET_KEY = "6LciXfkqAAAAAIV_RYSNfdPpjjozwLFhGgo3DpUj";

app.use(cors());
app.use(express.json({ limit: "15mb" }));

// GET request to fetch a table
app.get("/getTable", async (req, res) => {
    const tablename = req.query.tablename;
    if (!tablename) {
        return res.status(400).json({ error: "Table name is required" });
    }

    try {
        await functions.getTable((err, resources) => {
            if (err) {
                console.error("Error fetching resources:", err);
                return res.status(500).json({ error: "Failed to fetch resources" });
            }
            res.status(200).json(resources);
        }, tablename);
    } catch (error) {
        console.error("Unhandled error in /getTable:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.get("/getCondition", async (req, res) => {
    const { table, condition } = req.query;
    if (!table || !condition) {
        return res.status(400).json({ error: "Table name and condition are required" });
    }

    try {
        // Ensure the condition is safe to prevent SQL injection
        if (!/^[a-zA-Z0-9_= ]+$/.test(condition)) {
            return res.status(400).json({ error: "Invalid condition format" });
        }

        await functions.getCondition(table, condition, (err, resources) => {
            if (err) {
                console.error("Error fetching resources:", err);
                return res.status(500).json({ error: "Failed to fetch resources" });
            }
            res.status(200).json(resources);
        });
    } catch (error) {
        console.error("Unhandled error in /getCondition:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/getRow", async (req, res) => {
    const { tablename, id } = req.query;
    if (!tablename || !id) {
        return res.status(400).json({ error: "Table name and ID are required" });
    }
    try {
        await functions.getRow((err, resources) => {
            if (err) {
                console.error("Error fetching resources:", err);
                return res.status(500).json({ error: "Failed to fetch resources" });
            }
            res.status(200).json(resources);
        }, tablename, id);
    } catch (error) {
        console.error("Unhandled error in /getRow:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/updateTable", async (req, res) => {
    const { table, data } = req.body;

    if (!table || !data) {
        return res.status(400).json({ error: "Table name and data are required" });
    }

    try {
        await functions.updateRow(table, data, (err, result) => {
            if (err) {
                console.error("Error updating data:", err);
                return res.status(500).json({ error: "Failed to update data" });
            }
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Unhandled error in /updateTable:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.delete('/deleteRows', async (req, res) => {
    const { table, where } = req.body;
    try {
        const changes = await functions.deleteRows(table, where);
        res.status(200).json({ message: `${changes} rows deleted` });
    } catch (error) {
        console.error('Error deleting rows:', error);
        res.status(500).json({ error: 'Failed to delete rows' });
    }
});
app.post('/duplicateRow', (req, res) => {
    const { tablename, id } = req.body;

    if (!tablename || !id) {
        return res.status(400).json({ error: "Tabellenname und ID sind erforderlich" });
    }

    functions.duplicateRow((err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    }, tablename, parseInt(id, 10));
});

// POST request for login
app.post("/login", async (req, res) => {
    const { username, password, token } = req.body;

    if (!username || !password || !token) {
        return res.status(400).json({ error: "Username, password, and reCAPTCHA token are required" });
    }

    try {
        // const captchaResponse = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
        //     params: {
        //         secret: SECRET_KEY,
        //         response: token,
        //     },
        // });

        // if (!captchaResponse.data.success) {
        //     return res.status(400).json({ error: "reCAPTCHA validation failed" });
        // }

        const result = await functions.loginUser(username, password);
        res.status(result.success ? 200 : 401).json(result);

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST request to set data in a table
app.post("/setTable", async (req, res) => {
    const { table, data } = req.body;

    if (!table || !data) {
        return res.status(400).json({ error: "Table name and data are required" });
    }

    try {
        await functions.setTable(table, data, (err, result) => {
            if (err) {
                console.error("Error saving data:", err);
                return res.status(500).json({ error: "Failed to save data" });
            }
            res.status(201).json(result);
        });
    } catch (error) {
        console.error("Unhandled error in /setTable:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST request to set a timeslot
app.post("/setTimeslot", async (req, res) => {
    const timeslot = req.body;
    console.log(timeslot);
    try {
        await functions.setTimeslot(timeslot, (err, result) => {
            if (err) {
                console.error("Error saving timeslot:", err);
                return res.status(500).json({ error: "Failed to save timeslot" });
            }
            res.status(201).json(result);
        });
    } catch (error) {
        console.error("Unhandled error in /setTimeslot:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post("/editTimeslot", async (req, res) => {
    const timeslot = req.body;
    console.log(req.body);
    try {
        await functions.editTimeslot(timeslot, (err, result) => {
            if (err) {
                console.error("Error editing timeslot:", err);
                return res.status(500).json({ error: "Failed to edit timeslot" });
            }
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Unhandled error in /editTimeslot:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.get("/getTimeslot", async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: "Timeslot ID is required" });
    }

    try {
        const timeslotData = await functions.getTimeslot(id);
        res.json(timeslotData);
    } catch (error) {
        res.status(500).json({ error: error.message || "An error occurred while fetching the timeslot data" });
    }
});
app.delete("/deleteRow", async (req, res) => {
    const { tablename, id } = req.body;

    if (!tablename || !id) {
        return res.status(400).json({ error: "Table name and ID are required" });
    }

    try {
        await functions.deleteRow((err, result) => {
            if (err) {
                console.error("Error deleting row:", err);
                return res.status(500).json({ error: "Failed to delete row" });
            }
            res.status(200).json({ message: "Row deleted successfully", result });
        }, tablename, id);
    } catch (error) {
        console.error("Unhandled error in /deleteRow:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/getSound/:id", async (req, res) => {
    const id = req.params.id;

    try {
        functions.getSound(id, (err, base64Sound) => {
            if (err || !base64Sound) {
                console.error("Error fetching sound:", err || "Sound not found");
                return res.status(404).json({ error: "Sound effect not found" });
            }

            res.json({ sound: base64Sound }); // Base64 als JSON zurückgeben
        });
    } catch (err) {
        console.error("Unhandled error in /getSound:", err);
        res.status(500).json({ error: "Failed to fetch sound" });
    }
});

// GET request for picture by team ID
app.get("/getPictureFromTeam/:id", async (req, res) => {
    const id = req.params.id;

    try {
        functions.getPictureFromTeam(id, (err, base64String) => {
            if (err || !base64String) {
                console.error("Error fetching Base64 string:", err || "Base64 string not found");
                return res.status(404).json({ error: "Base64 string not found" });
            }

            res.json({ image: base64String }); // Base64 als JSON senden
        });
    } catch (err) {
        console.error("Unhandled error in /getPictureFromTeam:", err);
        res.status(500).json({ error: "Failed to fetch Base64 string" });
    }
});

// GET request for picture by participant ID
app.get("/getPictureFromParticipant/:id", async (req, res) => {
    const id = req.params.id;

    try {
        functions.getPictureFromParticipant(id, (err, base64String) => {
            if (err || !base64String) {
                console.error("Error fetching Base64 string:", err || "Base64 string not found");
                return res.status(404).json({ error: "Base64 string not found" });
            }

            res.json({ image: base64String }); // Base64 als JSON senden
        });
    } catch (err) {
        console.error("Unhandled error in /getPictureFromParticipant:", err);
        res.status(500).json({ error: "Failed to fetch Base64 string" });
    }
});

/*
app.get("/getAllTimeslotsByTeamID", async (req, res) => {
    try {
        const ids = req.query.ids; // Erwartet z. B. ?ids=1,2,3

        if (!ids) {
            return res.status(400).json({ error: "No team IDs provided" });
        }

        const idArray = ids.split(","); // IDs in ein Array umwandeln

        // Alle Abfragen parallel ausführen und Ergebnisse sammeln
        const timeslotsPromises = idArray.map((id) => {
            return new Promise((resolve, reject) => {
                functions.getAllTimeslotsByTeamID(id, (err, timeslots) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ teamID: id, timeslots }); // Jedes Ergebnis mit teamID zurückgeben
                    }
                });
            });
        });

        // Warte auf alle Promises
        const results = await Promise.all(timeslotsPromises);
        res.json(results);
    } catch (error) {
        console.error("Error in /getAllTimeslotsByTeamID:", error);
        res.status(500).json({ error: "Failed to fetch timeslots" });
    }
});
*/

app.get("/getAllTimeslotsByTeamID", async (req, res) => {
    try {
        const ids = req.query.ids; // ?ids=1,2,3

        if (!ids) {
            return res.status(400).json({ error: "No team IDs provided" });
        }

        let idArray = ids.split(",").map(Number); // In ein Zahlen-Array umwandeln

        functions.getAllTimeslotsByTeamID(idArray, (err, timeslots) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).json({ error: "Database error", details: err.message });
            }
            res.json(timeslots);
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getAllTimeslotsByGroupID",async (req, res) => {
    try {
        const ids = req.query.ids; // ?ids=1,2,3

        if (!ids) {
            return res.status(400).json({ error: "No group IDs provided" });
        }

        let idArray = ids.split(",").map(Number); // In ein Zahlen-Array umwandeln

        functions.getAllTimeslotsByGroupID(idArray, (err, timeslots) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).json({ error: "Database error", details: err.message });
            }
            res.json(timeslots);
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getAllParticipantsByTeamID", async (req, res) => {
    try {

        const ids = req.query.ids;

        if (!ids) {
            return res.status(400).json({ error: "No team IDs provided" });
        }

        let idArray = ids.split(",").map(Number);

        functions.getAllParticipantsByTeamID(idArray, (err, participants) => {
            if (err) {
                console.error("Error fetching participants in server.js:", err);
                return res.status(500).json({ error: "Failed to fetch participants " });
            }
            res.json(participants);

        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getAllTeamsByGroupID", async (req, res) => {
    try {

        const ids = req.query.ids;

        if (!ids) {
            return res.status(400).json({ error: "No group IDs provided" });
        }

        let idArray = ids.split(",").map(Number);


        functions.getAllTeamsByGroupID(idArray, (err, teams) => {
            if (err) {
                console.error("Error fetching teams in server.js:", err);
                return res.status(500).json({ error: "Failed to fetch teams " });
            }

            res.json(teams);
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getAllTeamIDSByGroupID", async (req, res) => {
    try {

        const ids = req.query.ids;

        if (!ids) {
            return res.status(400).json({ error: "No group IDs provided" });
        }

        let idArray = ids.split(",").map(Number);


        functions.getAllTeamIDSByGroupID(idArray, (err, teams) => {
            if (err) {
                console.error("Error fetching teams in server.js:", err);
                return res.status(500).json({ error: "Failed to fetch teams " });
            }

            res.json(teams);
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getAllTeamsForGroupFilter", async (req, res) => {
    try {

        const ids = req.query.ids;

        if (!ids) {
            return res.status(400).json({ error: "No group IDs provided" });
        }

        let idArray = ids.split(",").map(Number);

        functions.getAllTeamsForGroupFilter(idArray, (err, teams) => {
            if (err) {
                console.error("Error fetching teams in server.js:", err);
                return res.status(500).json({ error: "Failed to fetch teams " });
            }

            res.json(teams);
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getTeamInfoByID", async (req, res) => {
    try {

        const ids = req.query.ids;

        if (!ids) {
            return res.status(400).json({ error: "No group IDs provided" });        }

        let idArray = ids.split(",").map(Number);    

        functions.getTeamInfoByID(idArray, (err, teams) => {
            if (err) {
                console.error("Error fetching teams in server.js:", err);
                return res.status(500).json({ error: "Failed to fetch teams " });
            }

            res.json(teams);
        });
    } catch (error) {    
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getAllTeamsUsingResourceByID", async (req, res) => {
    try {

        const ids = req.query.ids;

        if (!ids) {
            return res.status(400).json({ error: "No group IDs provided" });
        }

        let idArray = ids.split(",").map(Number);

        functions.getAllTeamsUsingResourceByID(idArray, (err, teamsbyresource) => {
            if (err) {
                console.error("Error fetching teams in server.js:", err);
                return res.status(500).json({ error: "Failed to fetch teams " });
            }

            res.json(teamsbyresource);
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});
app.get("/getResourceByResourceID", async (req,res) =>{
    try {

        const ids = req.query.ids;

        if (!ids) {
            return res.status(400).json({ error: "No group IDs provided" });
        }

        let idArray = ids.split(",").map(Number);

        functions.getResourceByResourceID(idArray, (err, resourcebyresource) => {
            if (err) {
                console.error("Error fetching teams in server.js:", err);
                return res.status(500).json({ error: "Failed to fetch teams " });
            }

            res.json(resourcebyresource);
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getUnasignedTeams", async(req,res)=>{
    try{
        functions.getUnasignedTeams((err,unasignedTeams)=>{
            if (err) {
                console.error("Error fetching teams in server.js:", err);
                return res.status(500).json({ error: "Failed to fetch teams " });
            }

            res.json(unasignedTeams);
        })
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send("Not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});