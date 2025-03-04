const fs = require("fs");
const path = require("path");
const dotenvPath = path.join(__dirname, "file.env");

// Generiert einen zufälligen API-Key (optional)
function generateRandomKey(length = 32) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

// Prüft, ob die .env-Datei existiert
if (!fs.existsSync(dotenvPath)) {
  const envContent = `VUE_APP_RECAPTCHA_SITE_KEY=${generateRandomKey()}
VUE_APP_RECAPTCHA_SECRET_KEY=${generateRandomKey()}
`;
  fs.writeFileSync(dotenvPath, envContent, "utf8");
  console.log("✅ .env Datei wurde erstellt!");
} else {
  console.log("ℹ️ .env Datei existiert bereits.");
}