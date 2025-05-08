
def add(a, b):
    return a + b
print("Sum:", add(10, 3))

def subtract(a, b):
    return a - b
print("Subtraction:", subtract(10, 3))

def multiply(a, b): 
    return a * b
print("Multiplication:", multiply(10, 3))

def divide(a, b):
    if b == 0:
        return "Error: Division by zero"
    return a // b
print("Division:", divide(10, 3))
print("Division by zero:", divide(10, 0))

def modulo(a, b):
    return a % b
print("Modulo:", modulo(10, 3))

def power(a, b):
    return a ** b
print("Exponentiation:", power(10, 3))

def square_root(a):
    if a < 0:
        return "Error: Square root of negative number"
    return a ** 0.5
print("Square root:", square_root(10))

def logarithm(a):
    if a <= 0:
        return "Error: Logarithm of non-positive number"
    import math
    return math.log(a)
print("Logarithm:", logarithm(10))

def factorial(a):
    if a < 0:
        return "Error: Factorial of negative number"
    if a == 0 or a == 1:
        return 1
    result = 1
    for i in range(2, a + 1):
        result *= i
    return result
print("Factorial:", factorial(5))

def sine(a):
    import math
    return math.sin(math.radians(a))
print("Sine:", sine(30))

def cosine(a): 
    import math
    return math.cos(math.radians(a))
print("Cosine:", cosine(30))

def tangent(a): 
    import math
    return math.tan(math.radians(a))
print("Tangent:", tangent(30))

def arcsine(a):
    import math
    if a < -1 or a > 1:
        return "Error: Arcsine out of range"
    return math.degrees(math.asin(a))
print("Arcsine:", arcsine(0.5))

def arccosine(a):
    import math
    if a < -1 or a > 1:
        return "Error: Arccosine out of range"
    return math.degrees(math.acos(a))
print("Arccosine:", arccosine(0.5))

def arctangent(a):
    import math
    return math.degrees(math.atan(a))
print("Arctangent:", arctangent(0.5))

# Currency conversion using real-time API with fallback and error handling
import requests

def convert_currency_api(amount, from_currency, to_currency):
    url = f"https://api.exchangerate.host/convert?from={from_currency}&to={to_currency}&amount={amount}"
    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        if response.status_code == 200 and 'result' in data:
            return round(data['result'], 2)
        else:
            return "Error: Invalid response from API"
    except requests.RequestException:
        return "Error: Failed to connect to currency API"
print("Currency conversion:", convert_currency_api(100, "USD", "COP"))

# Length conversion
def convert_length(value, from_unit, to_unit):
    units = {
        "m": 1,
        "km": 1000,
        "mi": 1609.34
    }
    if from_unit in units and to_unit in units:
        meters = value * units[from_unit]
        result = meters / units[to_unit]
        return result
    else:
        return "Invalid unit"
print("Length conversion:", convert_length(1, "km", "mi"))

# Temperature conversion
def convert_temperature(value, from_unit, to_unit):
    if from_unit == "C" and to_unit == "F":
        return (value * 9/5) + 32
    elif from_unit == "F" and to_unit == "C":
        return (value - 32) * 5/9
    elif from_unit == "C" and to_unit == "K":
        return value + 273.15
    elif from_unit == "K" and to_unit == "C":
        return value - 273.15
    elif from_unit == "F" and to_unit == "K":
        return (value - 32) * 5/9 + 273.15
    elif from_unit == "K" and to_unit == "F":
        return (value - 273.15) * 9/5 + 32
    else:
        return "Invalid conversion"
print("Temperature conversion:", convert_temperature(100, "C", "F"))

# Weight conversion
def convert_weight(value, from_unit, to_unit):
    units = {
        "kg": 1,
        "g": 0.001,
        "lb": 0.453592
    }
    if from_unit in units and to_unit in units:
        kg = value * units[from_unit]
        result = kg / units[to_unit]
        return result
    else:
        return "Invalid unit"
print("Weight conversion:", convert_weight(1, "kg", "lb"))

# Area conversion
def convert_area(value, from_unit, to_unit):
    units = {
        "m2": 1,
        "km2": 1000000,
        "ha": 10000,
        "acre": 4046.86
    }
    if from_unit in units and to_unit in units:
        square_meters = value * units[from_unit]
        result = square_meters / units[to_unit]
        return result
    else:
        return "Invalid unit"
print("Area conversion:", convert_area(1, "ha", "acre"))

# Volume conversion
def convert_volume(value, from_unit, to_unit):
    units = {
        "m3": 1,
        "l": 0.001,
        "gal": 0.00378541
    }
    if from_unit in units and to_unit in units:
        cubic_meters = value * units[from_unit]
        result = cubic_meters / units[to_unit]
        return result
    else:
        return "Invalid unit"
print("Volume conversion:", convert_volume(1, "m3", "l"))

