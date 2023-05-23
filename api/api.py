'''module for the api
'''

import logging
from typing import List
from flask import Flask, request, jsonify
from products import inventory as inv
from products import inventory_objects
from .api_database import database, models


# logger TODO: change to app.logger
LEVEL = logging.DEBUG
FORMAT = '[%(levelname)s] %(asctime)s %(name)s: %(message)s'
# handlers = [logging.StreamHandler()]
logging.basicConfig(level=LEVEL, format=FORMAT) #, handlers=handlers)
# logger = logging.getLogger(__name__)

app = Flask(__name__)
models.Base.metadata.create_all(bind=database.engine)

inventory: List[inventory_objects.Coffee]= []
inventory.append(inv.testCoffee1)
inventory.append(inv.testCoffee2)
inventory.append(inv.chooseCoffee)

grinders: List[inventory_objects.Grinder] = []
grinders.append(inv.fellowOde)
grinders.append(inv.wilfaUniform)
grinders.append(inv.chooseGrinder)

recipes: List[inventory_objects.Recipe] = []
recipes.append(inv.aeropress)
recipes.append(inv.v60)


@app.before_request
def create_session():
    '''creates a session before every request'''
    request.session = database.Sessionlocal()

@app.teardown_request
def shutdown_session(exception=None):
    '''closes the session after every request'''
    if exception:
        logging.error(exception)
    request.session.close()


# my Coffee section
@app.route('/api/coffees', methods=['POST', 'GET'])
def add_coffee():
    '''adds a new coffee to the inventory or returns the inventory
    '''
    if request.method == 'POST':
        coffee_data = request.get_json()
        request.session.add(models.CoffeeDB.from_json(coffee_data))
        request.session.commit()
        return 'Coffee added', 200
    if request.method == 'GET':
        coffees_all = request.session.query(models.CoffeeDB).all()
        logging.debug([ob.convert_to_json() for ob in coffees_all])
        return [ob.convert_to_json() for ob in coffees_all], 200

@app.route('/api/coffees/<coffee_name>', methods=['DELETE'])
def delete_coffee(coffee_name):
    '''deletes a coffee from the inventory
    '''
    request.session.query(models.CoffeeDB).filter(models.CoffeeDB.name == coffee_name).delete()
    request.session.commit()
    logging.debug('coffee %s deleted', coffee_name)
    return jsonify({"message": "Coffee {coffee_name} deleted successfully."}), 200

@app.route('/api/coffees/<coffee_name>', methods=['PUT'])
def update_coffee(coffee_name):
    '''updates a coffee in the inventory
    '''
    new_attribute = request.get_json()
    logging.debug('updated Attribute = %s of Coffee: %s', new_attribute, coffee_name)
    request.session.query(models.CoffeeDB)\
        .filter(models.CoffeeDB.name == coffee_name)\
        .update(new_attribute)
    request.session.commit()
    # inventory[coffee_index] = inventory_objects.Coffee.from_json(newCoffee)
    return jsonify({"message": "Coffee updated successfully."}), 200


# brew section
# grinders
@app.route('/api/grinders', methods=['POST', 'GET'])
def add_grinder():
    '''adds a new grinder to the inventory or returns the inventory'''
    if request.method == 'POST':
        grinder_data = request.get_json()
        grinders.append(models.GrinderDB.from_json(grinder_data))
        logging.debug('type %s added', type(models.GrinderDB
                                            .from_json(grinder_data)).__name__)
        return 'Grinder added', 200
    elif request.method == 'GET':
        grinders_all = request.session.query(models.GrinderDB).all()
        logging.debug([ob.convert_to_json() for ob in grinders_all])
        return [ob.convert_to_json() for ob in grinders_all], 200


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
        recipes.append(inventory_objects.Recipe.from_json(recipe_data))
        logging.debug('type %s added', type(inventory_objects.Recipe
                                            .from_json(recipe_data)).__name__)
        return 'Recipe added', 200
    elif request.method == 'GET':
        #logging.debug(recipes)
        return [ob.convert_to_json() for ob in recipes], 200

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
