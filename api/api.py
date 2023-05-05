from flask import Flask, request, jsonify
from products import Inventory as inv 
from products import InventoryObjects
import logging

# logger 
level = logging.DEBUG
format = '[%(levelname)s] %(asctime)s %(name)s: %(message)s'
# handlers = [logging.StreamHandler()]
logging.basicConfig(level=level, format=format) #, handlers=handlers)
# logger = logging.getLogger(__name__)

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
        inventory.append(InventoryObjects.Coffee.fromJson(coffee_data))
        logging.debug(f'type {type(InventoryObjects.Coffee.fromJson(coffee_data)).__name__} added')
        return 'Coffee added', 200
    elif request.method == 'GET':
        # logging.debug([ob.convertToJson() for ob in inventory])
        return [ob.convertToJson() for ob in inventory], 200


@app.route('/api/coffees/<coffee_name>', methods=['DELETE'])
def delete_coffee(coffee_name):
    global inventory
    inventory = [
        coffee for coffee in inventory if coffee.name != coffee_name]
    logging.debug(f'coffee {coffee_name} deleted')
    return jsonify({"message": "Coffee {coffee_name} deleted successfully."}), 200


@app.route('/api/coffees/<coffee_name>', methods=['PUT'])
def update_coffee(coffee_name):
    coffee_index = find_coffee_by_name(coffee_name)
    newCoffee = request.get_json()
    logging.debug(f'updated Coffee = {newCoffee}')
    inventory[coffee_index] = InventoryObjects.Coffee.fromJson(newCoffee)
    return jsonify({"message": "Coffee updated successfully."}), 200

def find_coffee_by_name(name):
    for i, c in enumerate(inventory):
        return i if(c.name is name) else -1


# brew section
@app.route('/api/grinders', methods=['POST', 'GET'])
def add_grinder():
    if request.method == 'POST':
        grinder_data = request.get_json()
        inventory.append(InventoryObjects.Grinder.fromJson(grinder_data))
        logging.debug(f'type {type(InventoryObjects.Grinder.fromJson(grinder_data)).__name__} added')
        return 'Grinder added', 200
    elif request.method == 'GET':
        logging.debug(grinders)
        return [ob.convertToJson() for ob in grinders], 200
    
