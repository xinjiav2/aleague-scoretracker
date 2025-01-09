// updates the local storage with the checkboxes
function updateLocalStorage() {
    const checkboxes = document.querySelectorAll(".packing-items input[type='checkbox']");
    let packingItems = [];

    // loops through checkboxes
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            packingItems.push(checkbox.nextElementSibling.textContent.trim());
        }
    });

    localStorage.setItem("packing_items", JSON.stringify(packingItems));

    displayPackingItems();
}

// displays the checked items
function displayPackingItems() {
    const checklistArea = document.getElementById("checklist_area");
    checklistArea.innerHTML = "";

    // get from local storage
    const packingItems = JSON.parse(localStorage.getItem("packing_items")) || [];

    packingItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        checklistArea.appendChild(li);
    });

    restoreCheckboxes(packingItems);
}

// restores the checkboxes from local storage
function restoreCheckboxes(packingItems) {
    const checkboxes = document.querySelectorAll(".packing-items input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        const label = checkbox.nextElementSibling.textContent.trim();
        if (packingItems.includes(label)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });
}

// display checked items
window.onload = function () {
    displayPackingItems();
};

// event listeners for each checkbox
document.querySelectorAll(".packing-items input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", updateLocalStorage);
});
