// Get the result input element
const result = document.getElementById('result');

// Function to append characters to the display
function appendToDisplay(value) {
    result.value += value;
}

// Function to clear the display
function clearDisplay() {
    result.value = '';
}

// Function to delete the last character
function deleteLastChar() {
    result.value = result.value.slice(0, -1);
}

// Function to calculate the result
function calculate() {
    try {
        // Replace × with * for JavaScript evaluation
        let expression = result.value.replace('×', '*');
        
        // Evaluate the expression
        let answer = eval(expression);
        
        // Handle division by zero
        if (!isFinite(answer)) {
            throw new Error('Division by zero');
        }
        
        // Display the result
        result.value = answer;
    } catch (error) {
        // Display error message
        result.value = 'Error';
        
        // Clear the error message after 1 second
        setTimeout(() => {
            result.value = '';
        }, 1000);
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Handle number keys and operators
    if (/[\d+\-*/.=]/.test(key)) {
        if (key === '=') {
            calculate();
        } else {
            appendToDisplay(key);
        }
        event.preventDefault();
    }
    
    // Handle Enter key as equals
    if (key === 'Enter') {
        calculate();
        event.preventDefault();
    }
    
    // Handle Backspace key
    if (key === 'Backspace') {
        deleteLastChar();
        event.preventDefault();
    }
    
    // Handle Escape key
    if (key === 'Escape') {
        clearDisplay();
        event.preventDefault();
    }
});
