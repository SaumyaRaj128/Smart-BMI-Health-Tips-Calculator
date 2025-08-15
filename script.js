const form = document.querySelector('#bmiForm');
const resultDiv = document.querySelector('#result');
const tipDiv = document.querySelector('#tip');
const historyList = document.querySelector('#history');

let history = JSON.parse(localStorage.getItem('bmiHistory')) || [];
displayHistory();
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const height = parseFloat(document.querySelector('#height').value);
    const weight = parseFloat(document.querySelector('#weight').value);
    

    if (isNaN(height) || height <= 0) {
        resultDiv.textContent = "Please enter a valid height.";
        return;
    }
    if (isNaN(weight) || weight <= 0) {
        resultDiv.textContent = "Please enter a valid weight.";
        return;
    }

    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    let category = "";
    let tip = "";

    
    if (bmi < 18.6) {
        category = "Underweight";
        tip = "Eat a balanced diet with more protein and carbs to gain healthy weight.";
        resultDiv.className = "result underweight";
    } else if (bmi >= 18.6 && bmi <= 24.9) {
        category = "Normal weight";
        tip = "Great! Maintain your weight with a balanced diet and regular exercise.";
        resultDiv.className = "result normal";
    } else {
        category = "Overweight";
        tip = "Try reducing sugary and fatty foods, and engage in regular workouts.";
        resultDiv.className = "result overweight";
    }

    
    resultDiv.textContent = `Your BMI is ${bmi} — You are ${category}`;
    tipDiv.textContent = `Tip: ${tip}`;

   
    history.unshift({ bmi, category });
    if (history.length > 5) history.pop();
    localStorage.setItem('bmiHistory', JSON.stringify(history));
    displayHistory();
});

function displayHistory() {
    historyList.innerHTML = "";
    history.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.bmi} — ${record.category}`;
        historyList.appendChild(li);
    });
}
