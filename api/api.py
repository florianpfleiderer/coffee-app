""" api.py

Created on Wed Nov 15 2023 by Florian Pfleiderer

Copyright (c) MIT License
"""


import logging
from flask import Flask, request, jsonify
from .api_database import database, models
from flask_cors import CORS


# logger TODO: change to app.logger
LEVEL = logging.DEBUG
FORMAT = '[%(levelname)s] %(asctime)s %(name)s: %(message)s'
logging.basicConfig(level=LEVEL, format=FORMAT)

app = Flask(__name__)
# Enable CORS for all domains on all routes
CORS(app, resources={r"/api/*": {"origins": "*"}})
models.Base.metadata.create_all(bind=database.engine)



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

# default route
@app.route('/', methods=['GET'])
def default():
    '''default route'''
    return 'You have reached the default route for the coffee app api.'

# my Coffee section
@app.route('/api/coffees', methods=['POST', 'GET'])
def add_coffee():
    '''adds a new coffee to the inventory or returns the inventory'''
    if request.method == 'POST':
        coffee_data = request.get_json()
        request.session.add(models.CoffeeDB.from_json(coffee_data))
        request.session.commit()
        return jsonify({"message": "Coffee added successfully"}), 200
    if request.method == 'GET':
        coffees_all = request.session.query(models.CoffeeDB).all()
        return jsonify([ob.convert_to_json() for ob in coffees_all]), 200

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
        request.session.add(models.GrinderDB.from_json(grinder_data))
        request.session.commit()
        return jsonify({"message": "Grinder added successfully"}), 200
    elif request.method == 'GET':
        grinders_all = request.session.query(models.GrinderDB).all()
        return jsonify([ob.convert_to_json() for ob in grinders_all]), 200


@app.route('/api/grinders/<grinder_name>', methods=['DELETE'])
def delete_grinder(grinder_name):
    '''deletes a grinder from the inventory'''
    request.session.query(models.GrinderDB).filter(models.GrinderDB.name == grinder_name).delete()
    request.session.commit()
    logging.debug('grinder %s deleted', grinder_name)
    return jsonify({"message": "Grinder {grinder_name} deleted successfully."}), 200


@app.route('/api/grinders/<grinder_name>', methods=['PUT'])
def update_grinder(grinder_name):
    '''updates a grinder in the inventory'''
    new_attribute = request.get_json()
    logging.debug('updated Attribute = %s of Grinder: %s', new_attribute, grinder_name)
    request.session.query(models.GrinderDB)\
        .filter(models.GrinderDB.name == grinder_name)\
        .update(new_attribute)
    request.session.commit()
    # inventory[coffee_index] = inventory_objects.Coffee.from_json(newCoffee)
    return jsonify({"message": "Grinder updated successfully."}), 200


# brewrecipes
@app.route('/api/recipes', methods=['POST', 'GET'])
def add_recipe():
    '''adds a new recipe to the inventory or returns the inventory'''
    if request.method == 'POST':
        recipe_data = request.get_json()
        request.session.add(models.RecipeDB.from_json(recipe_data))
        request.session.commit()
        return jsonify({"message": "Recipe added successfully"}), 200
    elif request.method == 'GET':
        recipes_all = request.session.query(models.RecipeDB).all()
        return jsonify([ob.convert_to_json() for ob in recipes_all]), 200

@app.route('/api/recipes/<recipe_name>', methods=['DELETE'])
def delete_recipe(recipe_name):
    '''deletes a recipe from the inventory'''
    request.session.query(models.RecipeDB).filter(models.RecipeDB.name == recipe_name).delete()
    request.session.commit()
    logging.debug('recipe %s deleted', recipe_name)
    return jsonify({"message": "Recipe {recipe_name} deleted successfully."}), 200



@app.route('/api/recipes/<recipe_name>', methods=['PUT'])
def update_recipe(recipe_name):
    '''updates a recipe in the inventory'''
    new_attribute = request.get_json()
    logging.debug('updated Attribute = %s of Recipe: %s', new_attribute, recipe_name)
    updated_coffee = (request.session.query(models.CoffeeDB)\
                      .filter(models.CoffeeDB.name == new_attribute['coffee_id']).first())
    logging.debug('updated coffee = %s', updated_coffee)
    updated_grinder = (request.session.query(models.GrinderDB)\
                       .filter(models.GrinderDB.name == new_attribute['grinder_id']).first())
    logging.debug('updated grinder = %s', updated_grinder)
    new_attribute['coffee_id'] = updated_coffee.id
    new_attribute['grinder_id'] = updated_grinder.id

    logging.debug('updated Attribute = %s of Recipe: %s', new_attribute, recipe_name)

    request.session.query(models.RecipeDB)\
        .filter(models.RecipeDB.name == recipe_name)\
        .update(new_attribute)
    logging.debug('updated recipe = %s', request.session.query(models.RecipeDB)\
                  .filter(models.RecipeDB.name == recipe_name).first())

    request.session.commit()
    # inventory[coffee_index] = inventory_objects.Coffee.from_json(newCoffee)
    return jsonify({"message": "Recipe updated successfully."}), 200

if __name__ == '__main__':
    app.run(host='localhost', port=8000)
