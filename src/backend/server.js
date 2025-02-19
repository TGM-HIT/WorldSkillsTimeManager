const express = require("express"); // command nodemon start server.js
const cors = require("cors");
const functions = require("./functions");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.get("/getTable", async (req, res) => {
    const tablename = req.query.tablename;
    if (!tablename) {
        return res.status(400).json({ error: "Table name is required" });
    }
    functions.getTable((err, resources) => {
        if (err) {
            res.status(500).json({ error: "Failed to fetch resources" });
        } else {
            res.status(200).json(resources);
        }
    },tablename);
});
// GET /resources - Retrieve resources
//app.get("/resources", async (req, res) => {
//    functions.getResources((err, resources) => {
//        if (err) {
//            res.status(500).json({ error: "Failed to fetch resources" });
//        } else {
//            res.status(200).json(resources);
//        }
//    });
//});

//app.get("/team", async (req, res) => {
//    functions.getTeam((err, team) => {
//        if (err) {
//            res.status(500).json({ error: "Failed to fetch resources" });
//        } else {
//            res.status(200).json(team);
//        }
//    });
//});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const result = await functions.loginUser(username, password);
        res.status(result.success ? 200 : 401).json(result);
    } catch (error) {
        console.error("Login error:", error); // Fehlerprotokollierung
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post("/setTable", async (req, res) => {
    const { table, data } = req.body;

    if (!table || !data) {
        return res.status(400).json({ error: "Table name and data are required" });
    }

    functions.setTable(table, data, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Failed to save data" });
        } else {
            res.status(201).json(result);
        }
    });
});
// POST /setResources - Save a resource
//app.post("/setResources", async (req, res) => {
//    const resource = req.body;
//    functions.setResources(resource, (err, result) => {
//        if (err) {
//            res.status(500).json({ error: "Failed to save resource" });
//        } else {
//            res.status(201).json(result);
//        }
//    });
//});
//app.post("/setTimeslot", async (req, res) => {
//    const timeslot = req.body;
//    functions.setTimeslot(timeslot, (err, result) => {
//        if (err) {
//           res.status(500).json({ error: "Failed to save timeslot" });
//        } else {
//            res.status(201).json(result);
//        }
//    });
//});
// POST /setType - Save resource type
//app.post("/setType", async (req, res) => {
//    const resource = req.body;
//    functions.setType(resource, (err, result) => {
//        if (err) {
//            res.status(500).json({ error: "Failed to save resource type" });
//        } else {
//            res.status(201).json(result);
//        }
//    });
//});
//app.post("/setTeam", async (req, res) => {
//    const team = req.body;
//    functions.setTeam(team, (err, result) => {
//            res.status(500).json({ error: "Failed to save resource type" });
//        } else {
//            res.status(201).json(result);
//        }
//    });
//});
//app.post("/setGroup", async (req, res) => {
//    const team = req.body;
//   functions.setGroup(team, (err, result) => {
//        if (err) {
//            res.status(500).json({ error: "Failed to save resource type" });
//        } else {
//            res.status(201).json(result);
//        }
//    });
//});



// Handle unknown routes
app.use((req, res) => {
    res.status(404).send("Not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
