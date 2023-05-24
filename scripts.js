'use strict';

const tests = [];
let counter = 0;

// Function to generate test items
function generateTestItems() {
    const testList = document.getElementById('test-list');
    testList.innerHTML = ''; // Clear existing test items

    tests.forEach((test, index) => {
        const testItem = document.createElement('div');
        testItem.classList.add('test-item');
        testItem.textContent = test.Item;

        const testNumber = document.createElement('span');
        testNumber.classList.add('test-number');
        testNumber.textContent = (index + 1) + '. ';
        testItem.appendChild(testNumber);

        const testName = document.createElement('span');
        testName.textContent = test.name;
        testItem.appendChild(testName);

        const scriptButton = document.createElement('button');
        scriptButton.textContent = 'View Script';
        scriptButton.classList.add('script-button');
        scriptButton.addEventListener('click', () => {
            alert(test.script); // Replace with your desired way of displaying the script
        });

        testItem.appendChild(scriptButton);

        testItem.addEventListener('click', () => {
            // Toggle status on click
            if (test.status === 'Passed') {
                test.status = 'Failed';
                testItem.style.backgroundColor = '#ff4d4d';
            } else {
                test.status = 'Passed';
                testItem.style.backgroundColor = '#b3ff99';
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            deleteTest(index);
            generateTestItems(); // Regenerate test items after deletion
        });

        testItem.appendChild(deleteButton);

        testItem.draggable = true;

        testItem.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', index);
            event.dataTransfer.effectAllowed = 'move';
            // Set the data attribute to store the original background color
            event.dataTransfer.setData('text/background', testItem.style.backgroundColor);
        });

        testItem.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        testItem.addEventListener('drop', (event) => {
            event.preventDefault();
            const sourceIndex = event.dataTransfer.getData('text/plain');
            const targetIndex = index;

            // Swap the positions of the source and target test items
            const temp = tests[sourceIndex];
            tests[sourceIndex] = tests[targetIndex];
            tests[targetIndex] = temp;

            generateTestItems(); // Regenerate test items with the updated order
        });

        testItem.addEventListener('dragenter', (event) => {
            event.preventDefault();
            testItem.classList.add('drag-over');
        });

        testItem.addEventListener('dragleave', () => {
            testItem.classList.remove('drag-over');
        });

        testItem.addEventListener('dragend', () => {
            testItem.classList.remove('drag-over');
        });

        // Restore the original background color on dragend
        testItem.addEventListener('dragend', (event) => {
            const originalBackgroundColor = event.dataTransfer.getData('text/background');
            testItem.style.backgroundColor = originalBackgroundColor;
        });

        testList.appendChild(testItem);
    });
}

// Function to delete a test
function deleteTest(index) {
    tests.splice(index, 1);
}

// Function to add a new test
function addTest() {
    const testName = prompt('Enter test name:');
    if (testName) {
        const testScript = prompt('Enter test script:');
        const newTest = { name: testName, status: 'Passed', script: testScript };
        tests.push(newTest);
        generateTestItems(); // Regenerate test items with the new test
    }
}

// Generate test items on page load
window.addEventListener('DOMContentLoaded', generateTestItems);

// Add test button event listener
const addTestButton = document.getElementById('add-test-button');
addTestButton.addEventListener('click', addTest);
