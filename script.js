// Hero button
const projectsButton = document.getElementById("projectsButton");

// Project card
const projectCard = document.getElementById("taskAutomation");
const projectViewer = document.getElementById("projectViewer");

// Editor
const codeDisplay = document.getElementById("codeDisplay");
const editorTab = document.getElementById("editorTab");

// File buttons
const testFile = document.getElementById("testFile");
const downloadScanFile = document.getElementById("downloadScanFile");
const loopFile = document.getElementById("loopFile");
const specificationsFile = document.getElementById("specificationsFile");

// Temporary code (we'll replace this later with your real files)
const files = {

    "test.py": "Coming soon...",

    "download_scan.py": "Coming soon...",

    "klaros_loop2.py": "Coming soon...",

    "klaros_specifications.py": "Coming soon..."

};

// Scroll to projects
projectsButton.addEventListener("click", () => {

    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });

});

// Open project
projectCard.addEventListener("click", () => {

    projectViewer.classList.remove("hidden");

    projectViewer.scrollIntoView({
        behavior: "smooth"
    });

});

// Opens a file in the editor
function openFile(fileName, button) {

    document.querySelectorAll(".fileButton").forEach(file => {
        file.classList.remove("active");
    });

    button.classList.add("active");

    codeDisplay.style.opacity = 0;

    setTimeout(() => {

        editorTab.textContent = "● " + fileName;

        codeDisplay.textContent = files[fileName];

        codeDisplay.style.opacity = 1;

    }, 150);

}

// File click events
testFile.addEventListener("click", () => {
    openFile("test.py", testFile);
});

downloadScanFile.addEventListener("click", () => {
    openFile("download_scan.py", downloadScanFile);
});

loopFile.addEventListener("click", () => {
    openFile("klaros_loop2.py", loopFile);
});

specificationsFile.addEventListener("click", () => {
    openFile("klaros_specifications.py", specificationsFile);
});