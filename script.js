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
const projects = {

    taskAutomation:{

        title:"Task Automation",

        description:"...",

        files:{

            "test.py": String.raw`
import time
import zipfile
from pathlib import Path

# ==========================================
# CONFIGURATION
# ==========================================

DOWNLOADS_FOLDER = Path(
    r"C:\Users\ajrodriguez\Downloads"
)

DESTINATION_FOLDER = Path(
    r"S:\1503 - MCAAD\1503 Penn Ave - Milken Institute\Construction Management\0. PHASE 2\Phase 2 - Close out\Klaros - Submittals2"
)

SCAN_INTERVAL_SECONDS = 2

# ==========================================
# FUNCTIONS
# ==========================================

def zip_is_finished(zip_path):

    try:

        with zipfile.ZipFile(zip_path, "r") as z:
            z.testzip()

        return True

    except Exception:

        return False


def clean_filename(filename):

    filename = filename.replace("/", "_")
    filename = filename.replace("\\", "_")

    invalid_chars = '<>:"|?*'

    for char in invalid_chars:
        filename = filename.replace(char, "_")

    filename = " ".join(filename.split())

    return filename.strip()


def get_unique_path(destination_file):

    if not destination_file.exists():
        return destination_file

    stem = destination_file.stem
    suffix = destination_file.suffix
    parent = destination_file.parent

    counter = 2

    while True:

        candidate = parent / f"{stem} ({counter}){suffix}"

        if not candidate.exists():
            return candidate

        counter += 1


def extract_zip(zip_path):

    print(f"\nProcessing: {zip_path.name}")

    extracted_count = 0
    renamed_count = 0
    error_count = 0

    try:

        with zipfile.ZipFile(zip_path, "r") as z:

            for member in z.infolist():

                if member.is_dir():
                    continue

                try:

                    filename = clean_filename(
                        member.filename
                    )

                    if not filename:
                        continue

                    destination_file = (
                        DESTINATION_FOLDER /
                        filename
                    )

                    if destination_file.exists():

                        destination_file = (
                            get_unique_path(
                                destination_file
                            )
                        )

                        renamed_count += 1

                    with z.open(member) as source:
                        with open(
                            destination_file,
                            "wb"
                        ) as target:
                            target.write(
                                source.read()
                            )

                    extracted_count += 1

                except Exception:

                    error_count += 1

                    print(
                        "Skipped problematic file: "
                        f"{member.filename}"
                    )

        print(
            f"Extracted: {extracted_count} | "
            f"Renamed: {renamed_count} | "
            f"Errors: {error_count}"
        )

        try:

            zip_path.unlink()

            print(
                f"Deleted ZIP: {zip_path.name}"
            )

        except Exception as e:

            print(
                f"Could not delete ZIP: {e}"
            )

    except Exception as e:

        print(f"ZIP ERROR: {e}")


# ==========================================
# MAIN
# ==========================================

def main():

    DESTINATION_FOLDER.mkdir(
        parents=True,
        exist_ok=True
    )

    ignored_startup_zips = {
        file.resolve()
        for file in DOWNLOADS_FOLDER.glob("*.zip")
    }

    print("KLAROS ZIP Monitor Started")
    print(f"Watching: {DOWNLOADS_FOLDER}")
    print(f"Extracting To: {DESTINATION_FOLDER}")
    print(
        f"Ignoring {len(ignored_startup_zips)} "
        f"ZIPs already in Downloads"
    )
    print()

    while True:

        for zip_file in DOWNLOADS_FOLDER.glob("*.zip"):

            zip_path = zip_file.resolve()

            if zip_path in ignored_startup_zips:
                continue

            if not zip_is_finished(zip_file):
                continue

            extract_zip(zip_file)

        time.sleep(
            SCAN_INTERVAL_SECONDS
        )


if __name__ == "__main__":
    main()`,

            "download_scan.py":String.raw`
import time
import shutil
from pathlib import Path
 
# ==========================================
# CONFIGURATION
# ==========================================
 
DOWNLOADS_FOLDER = Path(
    r"C:\Users\ajrodriguez\Downloads"
)
 
DESTINATION_FOLDER = Path(
    r"S:\1503 - MCAAD\1503 Penn Ave - Milken Institute\Construction Management\0. PHASE 2\Phase 2 - Close out\Klaros - RFI's"
)
 
SCAN_INTERVAL_SECONDS = 2

# ==========================================
# FUNCTIONS
# ==========================================
 
def file_is_finished(file_path):
 
    try:
 
        size1 = file_path.stat().st_size
 
        time.sleep(1)
 
        size2 = file_path.stat().st_size
 
        return size1 == size2
 
    except Exception:
 
        return False
 
 
def clean_filename(filename):
 
    filename = filename.replace("/", "_")
    filename = filename.replace("\\", "_")
 
    invalid_chars = '<>:"|?*'
 
    for char in invalid_chars:
        filename = filename.replace(char, "_")
 
    filename = " ".join(filename.split())
 
    return filename.strip()
 
 
def get_unique_path(destination_file):
 
    if not destination_file.exists():
        return destination_file
 
    stem = destination_file.stem
    suffix = destination_file.suffix
    parent = destination_file.parent
 
    counter = 2
 
    while True:
 
        candidate = parent / f"{stem} ({counter}){suffix}"
 
        if not candidate.exists():
            return candidate
 
        counter += 1
 
 
def move_file(file_path, move_count):
 
    try:
 
        filename = clean_filename(
            file_path.name
        )
 
        if not filename:
            return
 
        destination_file = (
            DESTINATION_FOLDER /
            filename
        )
 
        destination_file = get_unique_path(
            destination_file
        )
 
        shutil.move(
            str(file_path),
            str(destination_file)
        )
 
        print(
            f"[{move_count}] {destination_file.name}"
        )
 
    except Exception as e:
 
        print("\n" + "=" * 60)
        print("FILE TRANSFER FAILED")
        print(f"File: {file_path.name}")
        print(f"Error: {e}")
        print("=" * 60 + "\n")
 
 
# ==========================================
# MAIN
# ==========================================
 
def main():
 
    DESTINATION_FOLDER.mkdir(
        parents=True,
        exist_ok=True
    )
 
    ignored_startup_files = {
        file.resolve()
        for file in DOWNLOADS_FOLDER.iterdir()
        if file.is_file()
    }
 
    print("KLAROS Download Monitor Started")
    print(f"Watching: {DOWNLOADS_FOLDER}")
    print(f"Moving To: {DESTINATION_FOLDER}")
    print(
        f"Ignoring {len(ignored_startup_files)} "
        f"files already in Downloads"
    )
    print()
 
    move_count = 1
 
    while True:
 
        for file in DOWNLOADS_FOLDER.iterdir():
 
            if not file.is_file():
                continue
 
            if file.suffix.lower() == ".crdownload":
                continue
 
            file_path = file.resolve()
 
            if file_path in ignored_startup_files:
                continue
 
            if not file_is_finished(file):
                continue
 
            move_file(file, move_count)
            move_count += 1
 
        time.sleep(
            SCAN_INTERVAL_SECONDS
        )
 
 
if __name__ == "__main__":
    main()`,

            

        }

    }

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

        codeDisplay.textContent =
            projects.taskAutomation.files[fileName];

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