const express = require("express"); // command nodemon start server.js
const cors = require("cors");
const functions = require("./functions");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// GET request to fetch a table
app.get("/getTable", async (req, res) => {
    const tablename = req.query.tablename;
    if (!tablename) {
        return res.status(400).json({ error: "Table name is required" });
    }

    try {
        functions.getTable((err, resources) => {
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

app.get("/getRow", async (req, res) => {
    const { tablename, id } = req.query;
    if (!tablename || !id) {
        return res.status(400).json({ error: "Table name and ID are required" });
    }
    try {
        functions.getRow((err, resources) => {
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
        functions.updateRow(table, data, (err, result) => {
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
// POST request for login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const result = await functions.loginUser(username, password);
        res.status(result.success ? 200 : 401).json(result);
    } catch (error) {
        console.error("Login error:", error); // Error logging
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
        functions.setTable(table, data, (err, result) => {
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
    try {
        functions.setTimeslot(timeslot, (err, result) => {
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

// DELETE request to delete a row from a table
app.delete("/deleteRow", async (req, res) => {
    const { tablename, id } = req.body;

    if (!tablename || !id) {
        return res.status(400).json({ error: "Table name and ID are required" });
    }

    try {
        functions.deleteRow((err, result) => {
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

// GET request for sound by ID
app.get("/getSound/:id", async (req, res) => {
    const id = req.params.id;

    try {
        functions.getSound(id, (err, row) => {
            if (err || !row) {
                console.error("Error fetching sound:", err || "Sound not found");
                return res.status(404).json({ error: "Sound effect not found" });
            }

            const audioBuffer = Buffer.from(row.file, "base64");
            res.writeHead(200, { "Content-Type": "audio/mpeg" });
            res.end(audioBuffer);
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
        functions.getPictureFromTeam(id, (err, row) => {
            if (err || !row.picture) {
                console.error("Error fetching image:", err || "Image not found");
                return res.status(404).json({ error: "Image not found" });
            }

            const imageBuffer = Buffer.from(row.picture, "base64");
            res.writeHead(200, { "Content-Type": "image/png" });
            res.end(imageBuffer);

        });
    } catch (err) {
        console.error("Unhandled error in /getPictureFromTeam:", err);
        res.status(500).json({ error: "Failed to fetch image" });
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