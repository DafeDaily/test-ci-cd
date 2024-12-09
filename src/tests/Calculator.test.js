/**
 * @jest-environment jsdom
 */

// Importing necessary functions from jest and the class being tested
import { JSDOM } from 'jsdom'; 
import WeeklySpendCalculator from '..'; // Assuming this class is in a separate file


describe('WeeklySpendCalculator', () => {
    let dom;
    let document;
    let weeklySpendCalculator;
    let addSpendButton;
    let calculateButton;
    let daySelect;
    let spendInput;
    let weeklyAverageDisplay;

    beforeEach(() => {
        // Setting up jsdom and the mock DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Weekly Spend Calculator</title>
                <style>
                    .success-message {
                        color: green;
                        font-weight: bold;
                    }
                    .error-message {
                        color: red;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <h1>Weekly Spend Calculator</h1>
                <div>
                    <label for="day">Select Day:</label>
                    <select id="day">
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                    </select>
                </div>
                <div>
                    <label for="spend">Enter Spend:</label>
                    <input type="number" id="spend" step="0.01" min="0" placeholder="0.00">
                </div>
                <button id="addSpend">Add Spend</button>
                <button id="calculateAverage">Calculate Average</button>
                <div id="weeklyAverage"></div>
                <div class="success-message" style="display: none;">Spend added successfully!</div>
                <div class="error-message" style="display: none;"></div>
            </body>
            </html>
        `);
        
        // Getting references to DOM elements
        document = dom.window.document;
        addSpendButton = document.getElementById('addSpend');
        calculateButton = document.getElementById('calculateAverage');
        daySelect = document.getElementById('day');
        spendInput = document.getElementById('spend');
        weeklyAverageDisplay = document.getElementById('weeklyAverage');

        // Initializing the WeeklySpendCalculator instance
        weeklySpendCalculator = new WeeklySpendCalculator();

        // Simulating the event listeners being set up as in the original code
        addSpendButton.addEventListener('click', () => {
            const selectedDay = daySelect.value;
            const spendAmount = parseFloat(spendInput.value);
            if (isNaN(spendAmount) || spendAmount <= 0) {
                alert('Please enter a valid positive spend amount.');
                return;
            }
            weeklySpendCalculator.addSpend(selectedDay, spendAmount);
            spendInput.value = '';
        });

        calculateButton.addEventListener('click', () => {
            const weeklyAverage = weeklySpendCalculator.calculateAverage();
            weeklyAverageDisplay.textContent = `Weekly Average Spend: $${weeklyAverage}`;
        });
    });

    test('should add valid spend for a day', () => {
        // Set values for the day and spend
        daySelect.value = 'monday';
        spendInput.value = '50.00';

        // Simulate clicking the add spend button
        addSpendButton.click();

        // Check if the success message appears and is hidden after 2 seconds
        expect(document.querySelector('.success-message').style.display).toBe('block');
        setTimeout(() => {
            expect(document.querySelector('.success-message').style.display).toBe('none');
        }, 2000);

        // Check if the spend is correctly added
        expect(weeklySpendCalculator.getSpendData().monday).toBe(50);
    });

    test('should show error message for invalid spend', () => {
        // Set values for the day and invalid spend
        daySelect.value = 'monday';
        spendInput.value = '-10.00';

        // Simulate clicking the add spend button
        addSpendButton.click();

        // Check if error message is shown
        expect(document.querySelector('.error-message').style.display).toBe('block');
        expect(document.querySelector('.error-message').textContent).toBe('Invalid spend amount for monday. Please enter a valid positive number.');
    });

    test('should calculate the correct weekly average', () => {
        // Add valid spends for multiple days
        weeklySpendCalculator.addSpend('monday', 50.00);
        weeklySpendCalculator.addSpend('tuesday', 40.00);
        weeklySpendCalculator.addSpend('wednesday', 60.00);

        // Simulate clicking the calculate average button
        calculateButton.click();

        // Check if the weekly average is correctly displayed
        expect(weeklyAverageDisplay.textContent).toBe('Weekly Average Spend: $50.00');
    });
});
