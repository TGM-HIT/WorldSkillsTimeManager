# WorldSkillsTimeManager
Planungs- und Timemanagement-Software für den WorldSkills Mobile Robotics Wettbewerb

## Manueller Installationsguide:

**Npm muss installiert sein**

### Nach dem Clonen

- npm install

### Installation benötigter Packages

- npm install yarn

- npm install -g yarn

- npm install nodemon

- npm install --global nodemon

- npm install @fullcalendar/vue3 @fullcalendar/core @fullcalendar/resource-timeline

**Optional**

- Das SQLITE3 File unter src/backend als Path Variable setzen

**Für Recaptcha funktionalität (aktuell nicht benötigt)**

- npm install vue-recaptcha-v3

- npm install -g vue-recaptcha-v3

- yarn add vue-recaptcha-v3

## Manueller Start Guide

**In seperaten Terminals**

- Im root Ordner: "yarn dev"

- Unter "src/backend": "nodemon run server.js"

- Datenbank muss nicht extra gestartet werden

## Zugriff auf die Datanbank

**Im Terminal in "src/backend"**

- sqlite3

- .open worldskillsdata

## Eventueller Fix für das Apple-Issue:
https://stackoverflow.com/questions/73101941/only-able-to-access-sqlite3-database-through-terminal