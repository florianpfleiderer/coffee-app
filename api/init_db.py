"""This module contains the classes that represent the database tables.
It also contains methods, which are often used.
"""

from api_database import database, models

models.Base.metadata.create_all(bind=database.engine)

testCoffee1 = models.CoffeeDB(name='testCoffee1', price=12, farmer='Max')
testCoffee2 = models.CoffeeDB(name='testCoffee2', price=14, farmer='Max')
coffees = [testCoffee1, testCoffee2]

fellowOde = models.GrinderDB(name='Fellow ode', burr='sspRedSpeed', price=350)
wilfaUniform = models.GrinderDB(name='Wilfa Uniform', burr='Wilfa Standard Burrs', price=250)
grinders = [fellowOde, wilfaUniform]

recipeV60 = models.RecipeDB(name='V60', water=250, totalTime=180, coffee_In=15, coffee=testCoffee1,
                        grinder=fellowOde)
recipeAeropress = models.RecipeDB(name='Aeropress', water=200, totalTime=150, coffee_In=12, coffee=testCoffee2,
                            grinder=wilfaUniform)
recipeSpecial = models.RecipeDB(name='Special', water=300, totalTime=280, coffee_In=14, coffee=testCoffee2,
                            grinder=fellowOde)
recipes = [recipeV60, recipeAeropress, recipeSpecial]


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
