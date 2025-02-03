---
layout: post 
title: Packing Portal - Personal Packing Checklist
search_exclude: true
permalink: /travel/paris/packing_checklist_paris
menu: nav/paris_hotbar.html
---


<div class="personal_checklist">
    <h3>Personal Packing List</h3>
    <hr>
    <ul id="checklist_area"></ul>
    <!-- button to save items -->
</div>

<script type="module">

import {
    pythonURI,
    fetchOptions,
} from "{{ site.baseurl }}/assets/js/api/config.js";

document.addEventListener("DOMContentLoaded", (event) => {
    getPackingChecklists();
});

async function getPackingChecklists() {
    try {
        const response = await fetch(`${pythonURI}/api/packing_checklists`, {
            ...fetchOptions,
            method: 'GET',

        });

        if (!response.ok) {
            throw new Error('Failed to fetch packing checklists: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Packing checklists get:', data);

        const checklistArea = document.getElementById('checklist_area');

        checklistArea.innerHTML = '';

        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'checklist-item';

            const name_span = document.createElement('span');
            name_span.textContent = item.item;
            
            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                enableEditing(item, listItem, name_span, editButton);
            });
            
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                deletePackingChecklist(item.id);
                listItem.remove();
            });

            listItem.appendChild(name_span);
            listItem.appendChild(editButton);
            listItem.appendChild(removeButton);

            checklistArea.appendChild(listItem);
        });


    } catch (error) {
        console.error('Error fetching packing checklists:', error);
        alert('Error fetching packing checklists: ' + error.message);
    }
}


function enableEditing(item, listItem, name_span, editButton) {
    
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = name_span.textContent;
    inputField.className = 'edit-input';
    
    listItem.replaceChild(inputField, name_span);
    
    editButton.textContent = 'Save';
    editButton.onclick = async () => {
        const new_name = inputField.value;
        
        await putPackingChecklist(item.id, new_name);

        name_span.textContent = new_name;

        listItem.replaceChild(name_span, inputField);

        editButton.textContent = 'Edit';
        editButton.onclick = () => enableEditing(item, listItem, name_span, editButton);
    };
}


async function deletePackingChecklist(id) {

    const deleteData = {
        id: id,
    }

    try {
        const response = await fetch(`${pythonURI}/api/packing_checklists`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteData)
        });

        if (!response.ok) {
            throw new Error('Failed to delete item: ' + response.statusText);
        }

        const data = await response.json();
    } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item:' + error.message);
    }
}


async function putPackingChecklist(id, new_name) {
    
    const putData = {
        id: id,
        item: new_name
    }
    
    try {
        const response = await fetch(`${pythonURI}/api/packing_checklists`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putData)
        });

        if(!response.ok) {
            throw new Error('Failed to update item: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Item updated:', data);
    } catch (error) {
        console.error('Error updating item:', error);
        alert('Error updating item: ' + error.message);
    }
}



</script>


<style>

.personal_checklist {
    flex: 3;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.personal_checklist h3 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.personal_checklist li {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
    color: black;
}

.personal_checklist hr {
    border: 2px solid black;
}

.checklist-item {
    display: flex; /* Align items horizontally */
    align-items: center; /* Vertically align content */
    justify-content: space-between; /* Spread content evenly */
    padding: 10px; /* Add some spacing around each item */
    margin-bottom: 10px; /* Space between list items */
    border: 1px solid #ddd; /* Light border around the item */
    border-radius: 5px; /* Rounded corners */
    background-color: #f9f9f9; /* Light background color */
}

/* Styling the buttons */
button {
    padding: 5px 10px; /* Add padding to make buttons larger */
    margin-left: 10px; /* Add space between buttons and item text */
    border: none; /* Remove default button border */
    border-radius: 5px; /* Rounded corners for buttons */
    cursor: pointer; /* Change cursor to pointer on hover */
    font-size: 14px; /* Set button text size */
}

/* Specific styling for the Edit button */
.edit-button {
    background-color: #4CAF50; /* Green background */
    color: white; /* White text */
}

/* Specific styling for the Remove button */
.remove-button {
    background-color: #f44336; /* Red background */
    color: white; /* White text */
}

/* Add hover effects for buttons */
button:hover {
    opacity: 0.9; /* Slightly dim the button on hover */
}

.edit-input {
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
}

</style>