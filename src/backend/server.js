const express = require("express");
const cors = require("cors");
const functions = require("./functions");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// GET /resources - Retrieve resources
app.get("/resources", async (req, res) => {
    functions.getResources((err, resources) => {
        if (err) {
            res.status(500).json({ error: "Failed to fetch resources" });
        } else {
            res.status(200).json(resources);
        }
    });
});

// POST /setResources - Save a resource
app.post("/setResources", async (req, res) => {
    const resource = req.body;
    functions.setResources(resource, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Failed to save resource" });
        } else {
            res.status(201).json(result);
        }
    });
});

// POST /setType - Save resource type
app.post("/setType", async (req, res) => {
    const resource = req.body;
    functions.setType(resource, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Failed to save resource type" });
        } else {
            res.status(201).json(result);
        }
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send("Not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
