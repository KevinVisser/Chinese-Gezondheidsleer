// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


document.onreadystatechange = () => {
    if(document.readyState == "complete") {
        HandleWindowControls();
    }
}

function HandleWindowControls() {
    let win = remote.getCurrentWindow();

    document.getElementById('min-button').addEventListener('click', event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener('click', event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener('click', event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener('click', event => {
        win.close();
    });

    ToggleMaxRestoreButtons();
    win.on('maximize', ToggleMaxRestoreButtons);
    win.on('unmaximize', ToggleMaxRestoreButtons);

    function ToggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}