""" init_db.py

Created on Wed Nov 15 2023 by Florian Pfleiderer

Copyright (c) MIT License

This module contains the classes that represent the database tables.
It also contains methods, which are often used.
"""

import os
import logging
from api_database import database, models

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Delete existing database file if it exists
if os.path.exists(database.DB_PATH):
    os.remove(database.DB_PATH)
    logger.info(f"Existing database at {database.DB_PATH} has been removed.")

# Drop all tables and recreate them
models.Base.metadata.drop_all(bind=database.engine)
models.Base.metadata.create_all(bind=database.engine)
logger.info("Database tables dropped and recreated.")

# Real coffee varieties with detailed information
ethiopian_yirgacheffe = models.CoffeeDB(
    name='Ethiopian Yirgacheffe',
    price=18,
    farmer='Yirgacheffe Coffee Farmers Cooperative',
    origin='Ethiopia',
    variety='Heirloom',
    process='Washed',
    roast='Light',
    size=250
)

colombia_huila = models.CoffeeDB(
    name='Colombia Huila',
    price=16,
    farmer='Asociación de Productores de Café del Huila',
    origin='Colombia',
    variety='Caturra, Castillo',
    process='Natural',
    roast='Medium',
    size=250
)

guatemala_antigua = models.CoffeeDB(
    name='Guatemala Antigua',
    price=17,
    farmer='Antigua Coffee Producers',
    origin='Guatemala',
    variety='Bourbon',
    process='Washed',
    roast='Medium-Light',
    size=250
)

kenya_nyeri = models.CoffeeDB(
    name='Kenya Nyeri AA',
    price=20,
    farmer='Nyeri Hill Estate',
    origin='Kenya',
    variety='SL28, SL34',
    process='Washed',
    roast='Light',
    size=250
)

coffees = [ethiopian_yirgacheffe, colombia_huila, guatemala_antigua, kenya_nyeri]

# Quality grinders with real specifications
fellow_ode = models.GrinderDB(
    name='Fellow Ode Gen 2',
    burr='SSP Multi-Purpose',
    price=495
)

comandante = models.GrinderDB(
    name='Comandante C40 MK4',
    burr='Nitro Blade',
    price=285
)

df64 = models.GrinderDB(
    name='DF64',
    burr='Standard Italmill',
    price=399
)

wilfa_uniform = models.GrinderDB(
    name='Wilfa Uniform',
    burr='58mm Flat Steel',
    price=299
)

grinders = [fellow_ode, comandante, df64, wilfa_uniform]

# Detailed brewing recipes
v60_recipe = models.RecipeDB(
    name='Hoffman V60',
    water=300,
    coffee_In=18,
    totalTime=210,
    coffee=ethiopian_yirgacheffe,
    grinder=fellow_ode,
    method='V60',
    grind_size='Medium-Fine',
    temp=94,
    time1=45,
    time2=90,
    steps=[
        {
            "time": 0,
            "action": "Rinse filter & preheat",
            "details": "Rinse paper filter thoroughly with hot water and warm the V60"
        },
        {
            "time": 0,
            "action": "Add coffee",
            "details": "Add 18g of freshly ground coffee and create a flat bed"
        },
        {
            "time": 0,
            "action": "Bloom",
            "details": "Pour 45g water (2.5x coffee weight) in gentle circular motion"
        },
        {
            "time": 45,
            "action": "First pour",
            "details": "Slowly pour to 180g total, spiral from center outward"
        },
        {
            "time": 90,
            "action": "Second pour",
            "details": "Continue pouring to 300g total, maintain gentle spiral"
        },
        {
            "time": 120,
            "action": "Gentle swirl",
            "details": "Give the V60 a gentle swirl to flatten the bed"
        },
        {
            "time": 210,
            "action": "Finish",
            "details": "Drawdown should complete around 3:30"
        }
    ]
)

aeropress_recipe = models.RecipeDB(
    name='Aeropress Championship',
    water=200,
    coffee_In=15,
    totalTime=120,
    coffee=colombia_huila,
    grinder=comandante,
    method='Aeropress',
    grind_size='Fine',
    temp=85,
    time1=30,
    time2=60,
    steps=[
        {
            "time": 0,
            "action": "Setup",
            "details": "Insert filter, rinse with hot water, attach to mug"
        },
        {
            "time": 0,
            "action": "Add coffee",
            "details": "Add 15g finely ground coffee"
        },
        {
            "time": 0,
            "action": "Add water",
            "details": "Add 200g water at 85°C"
        },
        {
            "time": 30,
            "action": "Stir",
            "details": "Stir gently 3 times"
        },
        {
            "time": 60,
            "action": "Attach cap",
            "details": "Secure the filter cap"
        },
        {
            "time": 90,
            "action": "Flip & Press",
            "details": "Flip onto mug and press gently"
        },
        {
            "time": 120,
            "action": "Finish",
            "details": "Stop at first hiss, dilute to taste"
        }
    ]
)

chemex_recipe = models.RecipeDB(
    name='Chemex Classic',
    water=500,
    coffee_In=30,
    totalTime=270,
    coffee=guatemala_antigua,
    grinder=df64,
    method='Chemex',
    grind_size='Medium-Coarse',
    temp=96,
    time1=45,
    time2=120,
    steps=[
        {
            "time": 0,
            "action": "Filter prep",
            "details": "Place filter with 3 layers against spout, rinse thoroughly"
        },
        {
            "time": 0,
            "action": "Add coffee",
            "details": "Add 30g coffee, level the bed"
        },
        {
            "time": 0,
            "action": "Bloom",
            "details": "Add 60g water, ensure all grounds are saturated"
        },
        {
            "time": 45,
            "action": "First pour",
            "details": "Pour in spirals to 250g total"
        },
        {
            "time": 120,
            "action": "Second pour",
            "details": "Continue pouring to 500g total"
        },
        {
            "time": 240,
            "action": "Wait",
            "details": "Allow for complete drawdown"
        },
        {
            "time": 270,
            "action": "Finish",
            "details": "Remove filter and serve"
        }
    ]
)

# Update existing recipes with the new required fields
recipeV60 = models.RecipeDB(
    name='V60',
    water=250,
    totalTime=180,
    coffee_In=15,
    coffee=ethiopian_yirgacheffe,
    grinder=fellow_ode,
    method='V60',
    grind_size='Medium-Fine',
    temp=94,
    time1=30,
    time2=90,
    steps=[
        {
            "time": 0,
            "action": "Rinse filter & preheat",
            "details": "Rinse paper filter thoroughly with hot water and warm the V60"
        },
        {
            "time": 0,
            "action": "Add coffee",
            "details": "Add 15g of freshly ground coffee"
        },
        {
            "time": 0,
            "action": "Bloom",
            "details": "Pour 45g water in gentle circular motion"
        },
        {
            "time": 30,
            "action": "First pour",
            "details": "Pour to 150g total in spiral motion"
        },
        {
            "time": 90,
            "action": "Final pour",
            "details": "Pour remaining water to reach 250g total"
        },
        {
            "time": 180,
            "action": "Finish",
            "details": "Drawdown should complete around 3:00"
        }
    ]
)

recipeAeropress = models.RecipeDB(
    name='Aeropress',
    water=200,
    totalTime=120,
    coffee_In=15,
    coffee=colombia_huila,
    grinder=wilfa_uniform,
    method='Aeropress',
    grind_size='Fine',
    temp=85,
    time1=30,
    time2=60,
    steps=[
        {
            "time": 0,
            "action": "Setup",
            "details": "Insert filter, rinse with hot water, attach to mug"
        },
        {
            "time": 0,
            "action": "Add coffee",
            "details": "Add 15g finely ground coffee"
        },
        {
            "time": 0,
            "action": "Add water",
            "details": "Add 200g water at 85°C"
        },
        {
            "time": 30,
            "action": "Stir",
            "details": "Stir gently 3 times"
        },
        {
            "time": 60,
            "action": "Press",
            "details": "Attach cap and press gently"
        },
        {
            "time": 120,
            "action": "Finish",
            "details": "Stop at first hiss"
        }
    ]
)

recipeSpecial = models.RecipeDB(
    name='Special',
    water=300,
    totalTime=280,
    coffee_In=14,
    coffee=colombia_huila,
    grinder=fellow_ode,
    method='Custom',
    grind_size='Medium',
    temp=93,
    time1=45,
    time2=120,
    steps=[
        {
            "time": 0,
            "action": "Preparation",
            "details": "Prepare your brewing device"
        },
        {
            "time": 0,
            "action": "Add coffee",
            "details": "Add 14g of ground coffee"
        },
        {
            "time": 0,
            "action": "First pour",
            "details": "Pour 50g water for blooming"
        },
        {
            "time": 45,
            "action": "Second pour",
            "details": "Pour to 150g total"
        },
        {
            "time": 120,
            "action": "Final pour",
            "details": "Pour remaining water to reach 300g"
        },
        {
            "time": 280,
            "action": "Finish",
            "details": "Allow to drain completely"
        }
    ]
)

recipes = [v60_recipe, aeropress_recipe, chemex_recipe, recipeV60, recipeAeropress, recipeSpecial]

with database.Sessionlocal() as session:
    for coffee in coffees:
        existing_coffees = (session.query(models.CoffeeDB)
                            .filter(models.CoffeeDB.name == coffee.name)
                            .filter(models.CoffeeDB.price == coffee.price)
                            .first()
                            )
        if existing_coffees is None:
            session.add(coffee)

    for grinder in grinders:
        existing_grinders = (
            session.query(models.GrinderDB)
            .filter(models.GrinderDB.name == grinder.name)
            .filter(models.GrinderDB.price == grinder.price)
            .first()
        )
        if existing_grinders is None:
            session.add(grinder)

    for recipe in recipes:
        existing_recipes = (
            session.query(models.RecipeDB)
            .filter(models.RecipeDB.name == recipe.name)
            .first()
        )
        if existing_recipes is None:
            session.add(recipe)
    session.commit()

logger.info(f"Added {len(coffees)} coffees, {len(grinders)} grinders, and {len(recipes)} recipes to the database.")

if __name__ == '__main__':
    with database.Sessionlocal() as session:
        coffees_all = session.query(models.CoffeeDB).all()
        for coffee in coffees_all:
            print(f'\nCoffee:\n{coffee.name}, {coffee.price}, {coffee.farmer}')
            print('Brew recipes:')
            for recipe in coffee.brew_recipes:
                print(f'{recipe.name}, {recipe.coffee.name}, {recipe.grinder.name}')

        recipes_all = session.query(models.RecipeDB).all()
        print('\n')
        for recipe in recipes_all:
            print(f'Recipe:{recipe.name}, {recipe.coffee.name}, {recipe.grinder.name}')
