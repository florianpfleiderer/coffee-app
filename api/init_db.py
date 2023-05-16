"""This module contains the classes that represent the database tables.
"""

from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base


engine = create_engine('sqlite:///test.db')
Base = declarative_base()

class CoffeeDB(Base):
    '''This class represents the table with all the coffees in the database.
    
    The columns (= attributes) are the same as from InventoryObjects.Coffee.

    Columns:
        id (int): the id of the coffee
        name (str): the name of the coffee
        price (int): the price of the coffee
        farmer (str): the farmer of the coffee
        
    '''
    __tablename__ = 'coffees'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    farmer = Column(String, nullable=False)
    # TODO add rest of the attributes
    # TODO add a one to many relationship with BrewRecipes


class GrinderDB(Base):
    '''This class represents the table with all the grinders in the database.
    
    The columns (= attributes) are the same as from InventoryObjects.Grinder.

    Columns:
        id (int): the id of the grinder
        name (str): the name of the grinder
        price (int): the price of the grinder
        burr (str): the burrs inside the grinder
        
    '''
    __tablename__ = 'grinders'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    burr = Column(String, nullable=False)
    # TODO add rest of the attributes
    # TODO add a one to many relationsship with BrewRecipes


class BrewRecipes(Base):
    '''This class represents the table with all the brew recipes in the database.
    
    The columns (= attributes) are the recipes, and are connected to the other
    two databases containing coffees and grinders which are the relevant factors
    for choosing a recipes.
    
    Columns:
        id (int): the id of the brew recipe
        name (str): the name of the brew recipe
        coffee (str): the coffee used in the brew recipe
        grinder (str): the grinder used in the brew recipe
    '''
    __tablename__ = 'brew_recipes'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    method = Column(String, nullable=False)
    coffee = Column(String, ForeignKey('coffees.name'), nullable=False)
    grinder = Column(String, ForeignKey('grinders.name'), nullable=False)
    # TODO add a backpopulated relationship with CoffeeDB and GrinderDB for recipes
    # TODO how to add the recipe itself (a script that declares the
    # duration, stops, etc to be executed by the BrewSection when loaded?)

Base.metadata.create_all(engine)

testCoffee1 = CoffeeDB(name='testCoffee1', price=12, farmer='Max')
testCoffee2 = CoffeeDB(name='testCoffee2', price=14, farmer='Max')
coffees = [testCoffee1, testCoffee2]

fellowOde = GrinderDB(name='Fellow ode', burr='sspRedSpeed', price=350)
wilfaUniform = GrinderDB(name='Wilfa Uniform', burr='Wilfa Standard Burrs', price='250')
grinders = [fellowOde, wilfaUniform]

recipeV60 = BrewRecipes(name='V60', method='pour over', coffee=testCoffee1,
                        grinder=fellowOde)
recipeAeropress = BrewRecipes(name='Aeropress', method='immersion', coffee=testCoffee2,
                              grinder=wilfaUniform)
recipes = [recipeV60, recipeAeropress]

Session = sessionmaker(bind=engine)

with Session() as session:
    for coffee in coffees:
        session.add(coffee)
    # only one thread supported (siehe github issue)
    session.commit()

# with Session() as session:
#     for grinder in grinders:
#         session.add(grinder)
#     # only one thread supported (siehe github issue)
#     session.commit()

# with Session() as session:
#     for recipe in recipes:
#         session.add(recipe)
#     # only one thread supported (siehe github issue)
    # session.commit()


