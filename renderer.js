// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const remote = require("electron").remote;
const ipcRenderer = require("electron").ipcRenderer;
const db = remote.getGlobal("database");
const fs = remote.getGlobal("fs");
// const db2 = require("better-sqlite3")("./resources/app.db");
//const stmt = db.prepare("SELECT id, Nederlands FROM Kruiden");

// Deze functie werkt nog niet naar behoren 
// --> 
// als je te vaak minimize/maximize dan worden er teveel eventlisteners toegevoegd
document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        HandleWindowControls();
    }
};

function HandleWindowControls() {
    let win = remote.getCurrentWindow();

    document.getElementById("min-button").addEventListener("click", () => {
        console.log("min-button");
        win.minimize();
    });
    
    document.getElementById("close-button").addEventListener("click", () => {
        console.log("min-button");
        win.close();
    });
}
