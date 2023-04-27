from flask import Flask, request, jsonify
from products import inventory as inv 
from products import inventoryObjects

app = Flask(__name__)
inventory = []
inventory.append(inv.testCoffee1)
inventory.append(inv.testCoffee2)

grinders = []
grinders.append(inv.fellowOde)
grinders.append(inv.wilfaUniform)

# my Coffee section
@app.route('/api/coffees', methods=['POST', 'GET'])
def add_coffee():
    if request.method == 'POST':
        coffee_data = request.get_json()
        inventory.append(inventoryObjects.Coffee.fromJson(coffee_data))
        print(f'type {type(inventoryObjects.Coffee.fromJson(coffee_data)).__name__} added')
        return 'Coffee added', 200
    elif request.method == 'GET':
        # print([ob.convertToJson() for ob in inventory])
        return [ob.convertToJson() for ob in inventory], 200


@app.route('/api/coffees/<coffee_name>', methods=['DELETE'])
def delete_coffee(coffee_name):
    global inventory
    inventory = [
        coffee for coffee in inventory if coffee.name != coffee_name]
    print(f'coffee {coffee_name} deleted')
    return jsonify({"message": "Coffee {coffee_name} deleted successfully."}), 200


@app.route('/api/coffees/<coffee_name>', methods=['PUT'])
def update_coffee(coffee_name):
    coffee_index = find_coffee_by_name(coffee_name)
    newCoffee = request.get_json()
    print(f'updated Coffee = {newCoffee}')
    inventory[coffee_index] = inventoryObjects.Coffee.fromJson(newCoffee)
    return jsonify({"message": "Coffee updated successfully."}), 200


def find_coffee_by_name(name):
    for c in inventory:
        if(c.name == name):
            return inventory.index(c)
    return -1

# brew section
@app.route('/api/grinders', methods=['POST', 'GET'])
def add_grinder():
    if request.method == 'POST':
        grinder_data = request.get_json()
        inventory.append(inventoryObjects.Grinder.fromJson(grinder_data))
        print(f'type {type(inventoryObjects.Grinder.fromJson(grinder_data)).__name__} added')
        return 'Grinder added', 200
    elif request.method == 'GET':
        print(grinders)
        return [ob.convertToJson() for ob in grinders], 200
    
