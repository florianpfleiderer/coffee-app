'''module for the api
'''

import logging
from flask import Flask, request, jsonify
from products import inventory as inv
from products import inventory_objects

# logger
LEVEL = logging.DEBUG
FORMAT = '[%(levelname)s] %(asctime)s %(name)s: %(message)s'
# handlers = [logging.StreamHandler()]
logging.basicConfig(level=LEVEL, format=FORMAT) #, handlers=handlers)
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
    '''adds a new coffee to the inventory or returns the inventory
    '''

    if request.method == 'POST':
        coffee_data = request.get_json()
        inventory.append(inventory_objects.Coffee.from_json(coffee_data))
        logging.debug('type %s added', type(inventory_objects.Coffee.from_json(coffee_data)).__name__)
        return 'Coffee added', 200
    elif request.method == 'GET':
        # logging.debug([ob.convertToJson() for ob in inventory])
        return [ob.convertToJson() for ob in inventory], 200


@app.route('/api/coffees/<coffee_name>', methods=['DELETE'])
def delete_coffee(coffee_name):
    '''deletes a coffee from the inventory
    '''

    global inventory
    inventory = [
        coffee for coffee in inventory if coffee.name != coffee_name]
    logging.debug('coffee %s deleted', coffee_name)
    return jsonify({"message": "Coffee {coffee_name} deleted successfully."}), 200


@app.route('/api/coffees/<coffee_name>', methods=['PUT'])
def update_coffee(coffee_name):
    '''updates a coffee in the inventory
    '''

    coffee_index = find_coffee_by_name(coffee_name)
    newCoffee = request.get_json()
    logging.debug('updated Coffee = %s', newCoffee)
    inventory[coffee_index] = inventory_objects.Coffee.from_json(newCoffee)
    return jsonify({"message": "Coffee updated successfully."}), 200


def find_coffee_by_name(name):
    '''returns the index of a coffee by name'''
    for i, c in enumerate(inventory):
        return i if(c.name is name) else -1


# brew section
# grinders
@app.route('/api/grinders', methods=['POST', 'GET'])
def add_grinder():
    '''adds a new grinder to the inventory or returns the inventory'''
    if request.method == 'POST':
        grinder_data = request.get_json()
        inventory.append(inventory_objects.Grinder.from_json(grinder_data))
        logging.debug('type %s added', type(inventory_objects.Grinder.from_json(grinder_data)).__name__)
        return 'Grinder added', 200
    elif request.method == 'GET':
        logging.debug(grinders)
        return [ob.convertToJson() for ob in grinders], 200
    

@app.route('/api/grinders/<grinder_name>', methods=['DELETE'])
def delete_grinder(grinder_name):
    '''deletes a grinder from the inventory'''
    global grinders
    grinders = [
        grinder for grinder in grinders if grinder.name != grinder_name]
    logging.debug('grinder %s deleted', grinder_name)
    return jsonify({"message": "Grinder {grinder_name} deleted successfully."}), 200


@app.route('/api/grinders/<grinder_name>', methods=['PUT'])
def update_grinder(grinder_name):
    '''updates a grinder in the inventory'''
    grinder_index = find_grinder_by_name(grinder_name)
    newGrinder = request.get_json()
    logging.debug('updated Grinder = %s', newGrinder)
    grinders[grinder_index] = inventory_objects.Grinder.from_json(newGrinder)
    return jsonify({"message": "Grinder updated successfully."}), 200

def find_grinder_by_name(name):
    '''returns the index of a grinder by name'''
    for i, c in enumerate(grinders):
        return i if(c.name is name) else -1 
   
    
# brewrecipes
@app.route('/api/recipes', methods=['POST', 'GET'])
def add_recipe():
    '''adds a new recipe to the inventory or returns the inventory'''
    if request.method == 'POST':
        recipe_data = request.get_json()
        inventory.append(inventory_objects.Recipe.from_json(recipe_data))
        logging.debug('type %s added', type(inventory_objects.Recipe.fromJson(recipe_data)).__name__)
        return 'Recipe added', 200
    elif request.method == 'GET':
        #logging.debug(recipes)
        return [ob.convertToJson() for ob in recipes], 200
    
@app.route('/api/recipes/<recipe_name>', methods=['DELETE'])
def delete_recipe(recipe_name):
    '''deletes a recipe from the inventory'''
    global recipes
    recipes = [
        recipe for recipe in recipes if recipe.name != recipe_name]
    logging.debug('recipe %s deleted', recipe_name)
    return jsonify({"message": "Recipe {recipe_name} deleted successfully."}), 200

@app.route('/api/recipes/<recipe_name>', methods=['PUT'])
def update_recipe(recipe_name):
    '''updates a recipe in the inventory'''
    recipe_index = find_recipe_by_name(recipe_name)
    newRecipe = request.get_json()
    logging.debug('updated Recipe = %s', newRecipe)
    recipes[recipe_index] = inventory_objects.Recipe.from_json(newRecipe)
    return jsonify({"message": "Recipe updated successfully."}), 200

def find_recipe_by_name(name):
    '''returns the index of a recipe by name'''
    for i, c in enumerate(recipes):
        return i if(c.name is name) else -1