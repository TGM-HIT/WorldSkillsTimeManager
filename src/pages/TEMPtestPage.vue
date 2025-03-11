<template>
  <div class="container">
    <h1>Team Management</h1>

    <!-- Neues Team hinzufügen -->
    <div class="add-team">
      <input v-model="newTeamName" placeholder="Neues Team eingeben" />
      <button @click="addTeam">Hinzufügen</button>
    </div>

    <!-- Team Liste -->
    <ul>
      <li v-for="team in teams" :key="team.id">
        <span v-if="editingTeam?.id !== team.id">{{ team.name }}</span>
        <input v-else v-model="editingTeam.name" />

        <button v-if="editingTeam?.id !== team.id" @click="editTeam(team)">✏️ Bearbeiten</button>
        <button v-if="editingTeam?.id === team.id" @click="saveEdit">✅ Speichern</button>
        <button @click="deleteTeam(team.id)">🗑️ Löschen</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Referenz für Teams, das Bearbeiten eines Teams und das Hinzufügen eines neuen Teamnamens
const teams = ref([]);
const editingTeam = ref(null);
const newTeamName = ref("");

// Funktion, um alle Teams zu laden
const fetchTeams = async () => {
  try {
    const response = await axios.get("http://localhost:5000/getTable?tablename=team");
    teams.value = response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Teams:", error);
  }
};

// Funktion, um ein Team zu bearbeiten (setzt das Bearbeitungs-Objekt auf das Team)
const editTeam = (team) => {
  editingTeam.value = { ...team }; // Kopie des Teams zum Bearbeiten
};

// Funktion, um die Änderungen zu speichern
// Funktion zum Speichern der bearbeiteten Daten
async function saveEdit() {
   if (!editingTeam.value || !editingTeam.value.name) {
      console.error("Teamname darf nicht leer sein!");
      return;
   }

   try {
      const response = await axios.put('http://localhost:5000/editRow', {
         tablename: "team", // Tablename wird mitgesendet
         id: editingTeam.value.id,
         newData: { name: editingTeam.value.name }
      });

      console.log('Erfolgreich bearbeitet:', response.data);
      editingTeam.value = null; // Zurücksetzen nach erfolgreicher Bearbeitung
      fetchTeams(); // Holen der neuesten Teams
   } catch (error) {
      console.error('Fehler beim Bearbeiten:', error.response ? error.response.data : error.message);
   }
}



// Funktion, um ein Team zu löschen
const deleteTeam = async (id) => {
  if (!id || !confirm("Willst du dieses Team wirklich löschen?")) return;

  try {
    // DELETE-Request, um das Team zu löschen
    await axios.delete("http://localhost:5000/deleteRow", {
      data: { tablename: "team", id }
    });
    fetchTeams(); // Neu laden der Teams
  } catch (error) {
    console.error("Fehler beim Löschen:", error);
  }
};

// Funktion, um ein neues Team hinzuzufügen
const addTeam = async () => {
  if (!newTeamName.value) return; // Überprüfen, ob der Name nicht leer ist

  try {
    // POST-Request, um ein neues Team hinzuzufügen
    await axios.post("http://localhost:5000/setTable", {
      table: "team",
      data: { name: newTeamName.value }
    });
    newTeamName.value = ""; // Eingabefeld zurücksetzen
    fetchTeams(); // Neu laden der Teams
  } catch (error) {
    console.error("Fehler beim Hinzufügen:", error);
  }
};

// Initiale Abfrage der Teams, wenn die Komponente geladen wird
onMounted(fetchTeams);
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.add-team {
  margin-bottom: 20px;
}
input {
  padding: 5px;
  margin-right: 10px;
}
button {
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
