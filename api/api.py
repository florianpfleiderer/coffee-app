from flask import Flask, request, jsonify
from products import Inventory

app = Flask(__name__)
inventory = []
inventory.append(Inventory.testCoffee1.convertToJson())
inventory.append(Inventory.testCoffee2.convertToJson())

@app.route('/api/coffees', methods=['POST', 'GET'])
def add_coffee():
    if request.method == 'POST':
        coffee_data = request.get_json()
        inventory.append(coffee_data)
        print(coffee_data)
        return 'Coffee added', 200
    elif request.method == 'GET':
        return inventory


@app.route('/api/coffees/<coffee_name>', methods=['DELETE'])
def delete_coffee(coffee_name):
    global inventory
    inventory = [coffee for coffee in inventory if coffee["name"] != coffee_name]
    return jsonify({"message": "Coffee deleted successfully."}), 200
