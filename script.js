
// Display element
let display = document.getElementById("display");

// Add characters to the display
function append(char) {
  if (display.innerText === "0") {
    display.innerText = char;
  } else {
    display.innerText += char;
  }
}

// Clear the display
function clearDisplay() {
  display.innerText = "0";
}

// Change the sign of the number
function changeSign() {
  let value = parseFloat(display.innerText);
  display.innerText = (value * -1).toString();
}

// Calculate the result using eval()
function calculate() {
  try {
    display.innerText = eval(display.innerText);
  } catch {
    display.innerText = "Error";
  }
}

// Update the conversion form based on the selected type
function updateForm() {
  const type = document.getElementById("conversionType").value;
  const form = document.getElementById("conversionForm");
  let html = "";

  if (type === "currency") {
    html = `
      <input type="number" id="amount" placeholder="Amount" />
      <select id="fromCurrency">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="COP">COP</option>
      </select>
      <select id="toCurrency">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="COP">COP</option>
      </select>
      <button onclick="convertCurrency()">Convert</button>
      <p id="conversionResult"></p>
    `;
  } else if (type === "peso") {
    html = `
      <input type="number" id="weightValue" placeholder="Value" />
      <select id="fromWeight">
        <option value="g">Grams</option>
        <option value="kg">Kilograms</option>
        <option value="lb">Pounds</option>
      </select>
      <select id="toWeight">
        <option value="g">Grams</option>
        <option value="kg">Kilograms</option>
        <option value="lb">Pounds</option>
      </select>
      <button onclick="convertWeight()">Convert</button>
      <p id="conversionResult"></p>
    `;
  } else if (type === "temperature") {
    html = `
      <input type="number" id="temperatureValue" placeholder="Value" />
      <select id="fromTemperature">
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
        <option value="K">Kelvin</option>
      </select>
      <select id="toTemperature">
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
        <option value="K">Kelvin</option>
      </select>
      <button onclick="convertTemperature()">Convert</button>
      <p id="conversionResult"></p>
    `;
  } else if (type === "length") {
    html = `
      <input type="number" id="lengthValue" placeholder="Value" />
      <select id="fromLength">
        <option value="m">Meters</option>
        <option value="km">Kilometers</option>
        <option value="mi">Miles</option>
      </select>
      <select id="toLength">
        <option value="m">Meters</option>
        <option value="km">Kilometers</option>
        <option value="mi">Miles</option>
      </select>
      <button onclick="convertLength()">Convert</button>
      <p id="conversionResult"></p>
    `;
  } else if (type === "area") {
    html = `
      <input type="number" id="areaValue" placeholder="Value" />
      <select id="fromArea">
        <option value="m2">Square meters</option>
        <option value="km2">Square kilometers</option>
        <option value="ha">Hectares</option>
        <option value="acre">Acres</option>
      </select>
      <select id="toArea">
        <option value="m2">Square meters</option>
        <option value="km2">Square kilometers</option>
        <option value="ha">Hectares</option>
        <option value="acre">Acres</option>
      </select>
      <button onclick="convertArea()">Convert</button>
      <p id="conversionResult"></p>
    `;
  } else if (type === "volume") {
    html = `
      <input type="number" id="volumeValue" placeholder="Value" />
      <select id="fromVolume">
        <option value="m3">Cubic meters</option>
        <option value="l">Liters</option>
        <option value="gal">Gallons</option>
      </select>
      <select id="toVolume">
        <option value="m3">Cubic meters</option>
        <option value="l">Liters</option>
        <option value="gal">Gallons</option>
      </select>
      <button onclick="convertVolume()">Convert</button>
      <p id="conversionResult"></p>
    `;
  }

  form.innerHTML = html;
}

// Currency conversion using API
async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;

  if (!amount || isNaN(amount)) {
    document.getElementById("conversionResult").innerText = "Please enter a valid number.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await response.json();

    if (data.result !== undefined) {
      document.getElementById("conversionResult").innerText = `Result: ${data.result.toFixed(2)} ${to}`;
    } else {
      document.getElementById("conversionResult").innerText = "Error: Could not get result.";
    }
  } catch (error) {
    document.getElementById("conversionResult").innerText = "Error connecting to API.";
  }
}

// Weight conversion
function convertWeight() {
  const value = parseFloat(document.getElementById("weightValue").value);
  const from = document.getElementById("fromWeight").value;
  const to = document.getElementById("toWeight").value;

  const units = { g: 1, kg: 1000, lb: 453.592 };

  if (from in units && to in units) {
    const inGrams = value * units[from];
    const result = inGrams / units[to];
    document.getElementById("conversionResult").innerText = `Result: ${result.toFixed(2)} ${to}`;
  } else {
    document.getElementById("conversionResult").innerText = "Invalid unit.";
  }
}

// Temperature conversion
function convertTemperature() {
  const value = parseFloat(document.getElementById("temperatureValue").value);
  const from = document.getElementById("fromTemperature").value;
  const to = document.getElementById("toTemperature").value;

  let result;

  if (from === "C") {
    if (to === "F") result = (value * 9 / 5) + 32;
    else if (to === "K") result = value + 273.15;
    else result = value;
  } else if (from === "F") {
    if (to === "C") result = (value - 32) * 5 / 9;
    else if (to === "K") result = (value - 32) * 5 / 9 + 273.15;
    else result = value;
  } else if (from === "K") {
    if (to === "C") result = value - 273.15;
    else if (to === "F") result = (value - 273.15) * 9 / 5 + 32;
    else result = value;
  }

  document.getElementById("conversionResult").innerText = `Result: ${result.toFixed(2)} ${to}`;
}

// Length conversion
function convertLength() {
  const value = parseFloat(document.getElementById("lengthValue").value);
  const from = document.getElementById("fromLength").value;
  const to = document.getElementById("toLength").value;

  const units = { m: 1, km: 1000, mi: 1609.34 };

  if (from in units && to in units) {
    const meters = value * units[from];
    const result = meters / units[to];
    document.getElementById("conversionResult").innerText = `Result: ${result.toFixed(2)} ${to}`;
  }
}

// Area conversion
function convertArea() {
  const value = parseFloat(document.getElementById("areaValue").value);
  const from = document.getElementById("fromArea").value;
  const to = document.getElementById("toArea").value;

  const units = { m2: 1, km2: 1000000, ha: 10000, acre: 4046.86 };

  if (from in units && to in units) {
    const squareMeters = value * units[from];
    const result = squareMeters / units[to];
    document.getElementById("conversionResult").innerText = `Result: ${result.toFixed(2)} ${to}`;
  }
}

// Volume conversion
function convertVolume() {
  const value = parseFloat(document.getElementById("volumeValue").value);
  const from = document.getElementById("fromVolume").value;
  const to = document.getElementById("toVolume").value;

  const units = { m3: 1, l: 0.001, gal: 0.00378541 };

  if (from in units && to in units) {
    const cubicMeters = value * units[from];
    const result = cubicMeters / units[to];
    document.getElementById("conversionResult").innerText = `Result: ${result.toFixed(2)} ${to}`;
  }
}

  