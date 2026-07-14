// Hero button
const projectsButton = document.getElementById("projectsButton");

// Project card
const projectCard = document.getElementById("taskAutomation");
const projectViewer = document.getElementById("projectViewer");

// Portfolio card
const portfolioCard = document.getElementById("portfolioWebsite");
const portfolioViewer = document.getElementById("portfolioViewer");

// Editor
const codeDisplay = document.getElementById("codeDisplay");
const editorTab = document.getElementById("editorTab");

// File buttons
const testFile = document.getElementById("testFile");
const downloadScanFile = document.getElementById("downloadScanFile");
const loopFile = document.getElementById("loopFile");
const specificationsFile = document.getElementById("specificationsFile");

// Project data
const projects = {

    taskAutomation: {

        title: "Task Automation",

        description: "...",

        files: {

            "test.py": String.raw`import time
import zipfile
from pathlib import Path

# ==========================================
# CONFIGURATION
# ==========================================

DOWNLOADS_FOLDER = Path(
    r"C:\Users\username\Downloads"
)

DESTINATION_FOLDER = Path(
    r"S:\********\**** P****** - M********\Construction Management"
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

    print("****** ZIP Monitor Started")
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

            "download_scan.py": String.raw`import time
import shutil
from pathlib import Path

# ==========================================
# CONFIGURATION
# ==========================================

DOWNLOADS_FOLDER = Path(
    r"C:\Users\username\Downloads"
)

DESTINATION_FOLDER = Path(
    r"S:\********\**** P****** - M********\Construction Management"
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

    print("****** Download Monitor Started")
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

            "******_loop2.py": String.raw`
import re
from pathlib import Path
from playwright.sync_api import sync_playwright
import time
 
DOWNLOADS_FOLDER = Path(
    r"C:\Users\username\Downloads"
)
 
******_URL = (
    "https://auth.******t***.com/o/login#:~:text=Login"
)
 
START_INDEX = 0
BATCH_SIZE = 50
 
# How many consecutive scrolls with no new
# highest index before we call it the end
MAX_STALE_SCROLLS = 3
 
 
def wait_for_enter(message):
    input(f"\n{message}\n")
 
 
def confirm(message):
    return (
        input(f"\n{message} (Y/N): ")
        .strip()
        .lower()
        == "y"
    )
 
 
def wait_for_zip_download(zip_path):
 
    print(
        f"\nWaiting for ZIP to appear: "
        f"{zip_path.name}"
    )
 
    while not zip_path.exists():
        time.sleep(2)
 
    print(
        f"ZIP detected: {zip_path.name}"
    )
 
 
def wait_for_zip_processing(zip_path):
 
    print(
        f"\nWaiting for ZIP handler to finish: "
        f"{zip_path.name}"
    )
 
    while zip_path.exists():
        time.sleep(2)
 
    print(
        "ZIP handler finished."
    )
 
 
with sync_playwright() as p:
 
    browser = p.chromium.launch(
        channel="chrome",
        headless=False
    )
 
    context = browser.new_context(
        accept_downloads=True
    )
 
    page = context.new_page()
 
    page.goto(
        ******_URL,
        wait_until="domcontentloaded",
        timeout=120000
    )
 
    print(
        "\nChrome opened and ****** login page loaded."
    )
 
    wait_for_enter(
        "Log into ****** manually, navigate to the page "
        "showing the 3 projects, then press ENTER."
    )
 
    if not confirm(
        "Open 1061 - ****** Phase 2?"
    ):
        browser.close()
        raise SystemExit
 
    page.get_by_text(
        "- ****** Phase 2Mixed Use0"
    ).click()
 
    time.sleep(3)
 
    if not confirm(
        "Open Submittals?"
    ):
        browser.close()
        raise SystemExit
 
    page.get_by_role(
        "button",
        name="Submittal"
    ).nth(3).click()
 
    time.sleep(3)
 
    print("\nEnabling Index column...")
 
    page.get_by_role(
        "button",
        name="Filters"
    ).click()
 
    page.get_by_role(
        "button",
        name="Visible Columns"
    ).click()
 
    page.locator(
        ".checkmark"
    ).first.click()
 
    page.get_by_role(
        "button",
        name="Close"
    ).click()
 
    time.sleep(3)
 
    # ── Batch loop ──────────────────────────────────────────
    batch_start = START_INDEX
 
    while True:
 
        batch_end = batch_start + BATCH_SIZE - 1
 
        print(
            f"\n{'='*40}"
            f"\nBatch: {batch_start}-{batch_end}"
        )
 
        selected_count = 0        # count of rows selected this batch
        selected_rows = set()     # track unique row keys to avoid double-counting
        selected_checkboxes = []  # track actual checkbox elements
        highest_index_seen = 0    # track highest index in the list
        stale_scrolls = 0         # count scrolls with no new highest
 
        # ── Scan & select rows for this batch ───────────────
        while True:
 
            rows = page.locator("mat-row")
            row_count = rows.count()
            prev_highest = highest_index_seen
 
            for i in range(row_count):
 
                row = rows.nth(i)
 
                try:
 
                    text = row.inner_text().strip()
 
                    if not text:
                        continue
 
                    first_line = (
                        text.splitlines()[0]
                        .strip()
                    )
 
                    # Extract leading digits only —
                    # some rows concatenate index + data
                    # on a single line with no separator
                    match = re.match(r'^(\d+)', first_line)
 
                    if not match:
                        continue
 
                    index = int(match.group(1))
 
                    # Always update highest seen
                    highest_index_seen = max(
                        highest_index_seen,
                        index
                    )
 
                    row_key = f"{index}|{text}"
 
                    if (
                        batch_start <= index <= batch_end
                        and row_key not in selected_rows
                    ):
 
                        checkbox = row.locator(
                            'input[type="checkbox"]'
                        )
 
                        if not checkbox.is_checked():
 
                            checkbox.check()
 
                            selected_rows.add(row_key)
                            selected_count += 1
 
                            selected_checkboxes.append(
                                checkbox
                            )
 
                            print(
                                f"  Selected {index}"
                            )
 
                except Exception as e:
                    print(
                        f"  ROW {i} ERROR: {e}"
                    )
                    continue
 
            # All in-range rows seen — no need to scroll further
            if highest_index_seen > batch_end:
                print(
                    f"\nFinished scanning batch "
                    f"{batch_start}-{batch_end}"
                )
                break
 
            # Stale-scroll end-of-list detection
            if highest_index_seen > prev_highest:
                stale_scrolls = 0
            else:
                stale_scrolls += 1
 
            if stale_scrolls >= MAX_STALE_SCROLLS:
                print(
                    "  No new indexes after "
                    f"{MAX_STALE_SCROLLS} scrolls — "
                    "reached end of list."
                )
                break
 
            page.mouse.wheel(0, 3000)
            time.sleep(1)
 
        # No files found for this batch → finished
        if selected_count == 0:
            print(
                f"\nNo files found for "
                f"{batch_start}-{batch_end}."
            )
            print("\nFinished.")
            break
 
        print(
            f"\nSelected {selected_count} files "
            f"for batch {batch_start}-{batch_end}."
        )
 
        # ── Confirm ──────────────────────────────────────────
        if not confirm(
            f"Download ZIP for indexes "
            f"{batch_start}-{batch_end}?"
        ):
            browser.close()
            raise SystemExit
 
        # ── Download ─────────────────────────────────────────
        page.get_by_role(
            "button",
            name="Actions"
        ).click()
 
        with page.expect_download() as download_info:
 
            page.get_by_text(
                "Download Zip"
            ).click()
 
        download = download_info.value
 
        filename = (
            f"{batch_start}-{batch_end}.zip"
        )
 
        download_path = (
            DOWNLOADS_FOLDER /
            filename
        )
 
        download.save_as(
            str(download_path)
        )
 
        print(
            f"\nDownloaded: {filename}"
        )
 
        print(
            f"Saved to: {download_path}"
        )
 
        # ── Wait for ZIP processing ───────────────────────────
        wait_for_zip_download(download_path)
        wait_for_zip_processing(download_path)
 
        # ── Uncheck only this batch ───────────────────────────
        print("\nUnchecking batch checkboxes...")
 
        for checkbox in selected_checkboxes:
 
            try:
 
                if checkbox.is_checked():
                    checkbox.click()
 
            except Exception:
                continue
 
        print("Batch unchecked.")
 
        time.sleep(2)
 
        # Advance to next batch
        batch_start = batch_end + 1
 
    # ─────────────────────────────────────────────────────────
    input(
        "\nPress ENTER to exit."
    )
 
    browser.close()`,

            "******_specifications.py": String.raw`
from pathlib import Path
from playwright.sync_api import sync_playwright
import time
 
DOWNLOADS_FOLDER = Path(
    r"C:\Users\username\Downloads"
)
 
******_URL = (
    "https://auth.*********.com/o/login#:~:text=Login"
)
 
START_INDEX = 1
BATCH_SIZE = 50
 
# How many consecutive scrolls with no new
# highest index before we call it the end
MAX_STALE_SCROLLS = 3
 
 
def wait_for_enter(message):
    input(f"\n{message}\n")
 
 
def confirm(message):
    return (
        input(f"\n{message} (Y/N): ")
        .strip()
        .lower()
        == "y"
    )
 
 
def wait_for_zip_download(zip_path):
 
    print(
        f"\nWaiting for ZIP to appear: "
        f"{zip_path.name}"
    )
 
    while not zip_path.exists():
        time.sleep(2)
 
    print(
        f"ZIP detected: {zip_path.name}"
    )
 
 
def wait_for_zip_processing(zip_path):
 
    print(
        f"\nWaiting for ZIP handler to finish: "
        f"{zip_path.name}"
    )
 
    while zip_path.exists():
        time.sleep(2)
 
    print(
        "ZIP handler finished."
    )
 
 
with sync_playwright() as p:
 
    browser = p.chromium.launch(
        channel="chrome",
        headless=False
    )
 
    context = browser.new_context(
        accept_downloads=True
    )
 
    page = context.new_page()
 
    page.goto(
        ******_URL,
        wait_until="domcontentloaded",
        timeout=120000
    )
 
    print(
        "\nChrome opened and ****** login page loaded."
    )
 
    wait_for_enter(
        "Log into ****** manually, navigate to the page "
        "showing the 3 projects, then press ENTER."
    )
 
    if not confirm(
        "Open **** - ****** Phase 2?"
    ):
        browser.close()
        raise SystemExit
 
    page.get_by_text(
        "- ****** Phase 2Mixed Use0"
    ).click()
 
    time.sleep(3)
 
#    if not confirm(
#       "Open Specifications?"
#    ):
#        browser.close()
#        raise SystemExit








#    page.get_by_text(
#        "Specifications",
#        exact=True
#    ).click()
 
#    time.sleep(5)

    wait_for_enter(
        "Manually open Specifications, then press ENTER."
    )
 
    print("\nEnabling Index column...")
 
    page.get_by_role(
        "button",
        name="Filters"
    ).click()
 
    page.get_by_role(
        "button",
        name="Visible Columns"
    ).click()
 
    page.locator(
        ".checkmark"
    ).first.click()
 
    page.get_by_role(
        "button",
        name="Close"
    ).click()
 
    time.sleep(3)
 
    # ── Batch loop ──────────────────────────────────────────
    batch_start = START_INDEX
 
    while True:
 
        batch_end = batch_start + BATCH_SIZE - 1
 
        print(
            f"\n{'='*40}"
            f"\nBatch: {batch_start}-{batch_end}"
        )
 
        selected = set()           # indexes confirmed selected
        selected_checkboxes = []   # Fix 4: track actual checkbox elements
        highest_index_seen = 0     # Fix 2: track highest index in the list
        stale_scrolls = 0          # Fix 2: count scrolls with no new highest
 
        # ── Scan & select rows for this batch ───────────────
        while True:
 
            rows = page.locator("mat-row")
            row_count = rows.count()
            prev_highest = highest_index_seen
 
            for i in range(row_count):
 
                row = rows.nth(i)
 
                try:
 
                    text = row.inner_text().strip()
 
                    if not text:
                        continue
 
                    first_line = (
                        text.splitlines()[0]
                        .strip()
                    )
 
                    index = int(first_line)
 
                    # Always update highest seen
                    highest_index_seen = max(
                        highest_index_seen,
                        index
                    )
 
                    if (
                        batch_start <= index <= batch_end
                        and index not in selected
                    ):
 
                        checkbox = row.locator(
                            'input[type="checkbox"]'
                        )
 
                        checkbox.check()
 
                        selected.add(index)
 
                        # Store the element, not just the index
                        selected_checkboxes.append(
                            checkbox
                        )
 
                        print(
                            f"  Selected {index}"
                        )
 
                except Exception:
                    continue
 
            # Full batch — no need to scroll further
            if len(selected) >= BATCH_SIZE:
                print(
                    f"\nFound full batch of "
                    f"{BATCH_SIZE} files."
                )
                break
 
            # Stale-scroll end-of-list detection
            if highest_index_seen > prev_highest:
                stale_scrolls = 0
            else:
                stale_scrolls += 1
 
            if stale_scrolls >= MAX_STALE_SCROLLS:
                print(
                    "  No new indexes after "
                    f"{MAX_STALE_SCROLLS} scrolls — "
                    "reached end of list."
                )
                break
 
            page.mouse.wheel(0, 3000)
            time.sleep(1)
 
        # No files found for this batch → finished
        if not selected:
            print(
                f"\nNo files found for "
                f"{batch_start}-{batch_end}."
            )
            print("\nFinished.")
            break
 
        print(
            f"\nSelected {len(selected)} files "
            f"for batch {batch_start}-{batch_end}."
        )
 
        # ── Confirm ──────────────────────────────────────────
        if not confirm(
            f"Download ZIP for indexes "
            f"{batch_start}-{batch_end}?"
        ):
            browser.close()
            raise SystemExit
 
        # ── Download ─────────────────────────────────────────
        page.get_by_role(
            "button",
            name="Actions"
        ).click()
 
        with page.expect_download() as download_info:
 
            page.get_by_text(
                "Download Zip"
            ).click()
 
        download = download_info.value
 
        filename = (
	    f"{batch_start}-{batch_end}.zip"
	)
 
        download_path = (
            DOWNLOADS_FOLDER /
            filename
        )
 
        download.save_as(
            str(download_path)
        )
 
        print(
            f"\nDownloaded: {filename}"
        )
 
        print(
            f"Saved to: {download_path}"
        )
 
        # ── Wait for ZIP processing ───────────────────────────
        wait_for_zip_download(download_path)
        wait_for_zip_processing(download_path)
 
        # ── Uncheck only this batch (Fix 3 + Fix 4) ──────────
        print("\nUnchecking batch checkboxes...")
 
        for checkbox in selected_checkboxes:
 
            try:
 
                if checkbox.is_checked():
                    checkbox.click()   # Fix 3: .click() not .uncheck()
 
            except Exception:
                continue
 
        print("Batch unchecked.")
 
        time.sleep(2)
 
        # Advance to next batch
        batch_start = batch_end + 1
 
    # ─────────────────────────────────────────────────────────
    input(
        "\nPress ENTER to exit."
    )
 
    browser.close()`

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

    requestAnimationFrame(() => {
        projectViewer.classList.add("show");
    });

    projectViewer.scrollIntoView({
        behavior: "smooth"
    });

});

// Open portfolio
portfolioCard.addEventListener("click", () => {

    projectViewer.classList.add("hidden");
    projectViewer.classList.remove("show");

    portfolioViewer.classList.remove("hidden");

    requestAnimationFrame(() => {
        portfolioViewer.classList.add("show");
    });

    portfolioViewer.scrollIntoView({
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

        Prism.highlightElement(codeDisplay);

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
    openFile("******_loop2.py", loopFile);
});

specificationsFile.addEventListener("click", () => {
    openFile("******_specifications.py", specificationsFile);
});