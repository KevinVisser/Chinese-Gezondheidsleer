// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const remote = require("electron").remote;
const ipcRenderer = require("electron").ipcRenderer;
const db = remote.getGlobal("database");
// const db2 = require("better-sqlite3")("./resources/app.db");
//const stmt = db.prepare("SELECT id, Nederlands FROM Kruiden");


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

    document.getElementById("max-button").addEventListener("click", () => {
        console.log("min-button");
        win.maximize();
    });

    document.getElementById("restore-button").addEventListener("click", () => {
        console.log("min-button");
        win.unmaximize();
    });

    document.getElementById("close-button").addEventListener("click", () => {
        console.log("min-button");
        win.close();
    });

    ToggleMaxRestoreButtons();

    win.on("maximize", ToggleMaxRestoreButtons);
    win.on("unmaximize", ToggleMaxRestoreButtons);

    function ToggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add("maximized");
        } else {
            document.body.classList.remove("maximized");
        }
    }
}
