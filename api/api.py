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

recipes = []
recipes.append(inv.newRecipe)
recipes.append(inv.aeropress)
recipes.append(inv.v60)



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
# grinders
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
    

@app.route('/api/grinders/<grinder_name>', methods=['DELETE'])
def delete_grinder(grinder_name):
    global grinders
    grinders = [
        grinder for grinder in grinders if grinder.name != grinder_name]
    logging.debug(f'grinder {grinder_name} deleted')
    return jsonify({"message": "Grinder {grinder_name} deleted successfully."}), 200


@app.route('/api/grinders/<grinder_name>', methods=['PUT'])
def update_grinder(grinder_name):
    grinder_index = find_grinder_by_name(grinder_name)
    newGrinder = request.get_json()
    logging.debug(f'updated Grinder = {newGrinder}')
    grinders[grinder_index] = inventoryObjects.Grinder.fromJson(newGrinder)
    return jsonify({"message": "Grinder updated successfully."}), 200

def find_grinder_by_name(name):
    for i, c in enumerate(grinders):
        return i if(c.name is name) else -1 
   
    
# brewrecipes
@app.route('/api/recipes', methods=['POST', 'GET'])
def add_recipe():
    if request.method == 'POST':
        recipe_data = request.get_json()
        inventory.append(inventoryObjects.Recipe.fromJson(recipe_data))
        logging.debug(f'type {type(inventoryObjects.Recipe.fromJson(recipe_data)).__name__} added')
        return 'Recipe added', 200
    elif request.method == 'GET':
        #logging.debug(recipes)
        return [ob.convertToJson() for ob in recipes], 200
    
@app.route('/api/recipes/<recipe_name>', methods=['DELETE'])
def delete_recipe(recipe_name):
    global recipes
    recipes = [
        recipe for recipe in recipes if recipe.name != recipe_name]
    logging.debug(f'recipe {recipe_name} deleted')
    return jsonify({"message": "Recipe {recipe_name} deleted successfully."}), 200

@app.route('/api/recipes/<recipe_name>', methods=['PUT'])
def update_recipe(recipe_name):
    recipe_index = find_recipe_by_name(recipe_name)
    newRecipe = request.get_json()
    logging.debug(f'updated Recipe = {newRecipe}')
    recipes[recipe_index] = inventoryObjects.Recipe.fromJson(newRecipe)
    return jsonify({"message": "Recipe updated successfully."}), 200

