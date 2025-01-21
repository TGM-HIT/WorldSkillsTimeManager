// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock-Datenbank (z. B. ein Array für diese Übung)
const resources = [];

// Endpunkt zum Speichern von Ressourcen
app.post('/api/resources', (req, res) => {
  const { name, beschreibung } = req.body;

  if (!name || !beschreibung) {
    return res.status(400).json({ error: 'Name und Beschreibung sind erforderlich!' });
  }

  const newResource = { id: resources.length + 1, name, beschreibung };
  resources.push(newResource);

  res.status(201).json({ message: 'Ressource erstellt!', resource: newResource });
});

// Endpunkt zum Abrufen aller Ressourcen
app.get('/api/resources', (req, res) => {
  res.status(200).json(resources);
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
