"""This module contains the classes that represent the database tables.
"""

from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship, declarative_base


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

    __tablename__ = 'coffee'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    farmer = Column(String, nullable=False)
    # TODO add rest of the attributes


class GrinderDB(Base):
    '''This class represents the table with all the grinders in the database.
    
    The columns (= attributes) are the same as from InventoryObjects.Grinder.

    Columns:
        id (int): the id of the grinder
        name (str): the name of the grinder
        price (int): the price of the grinder
        burr (str): the burrs inside the grinder
        
    '''

    __tablename__ = 'grinder'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    burr = Column(String, nullable=False)
    # TODO add rest of the attributes


def BrewRecipes(Base):
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
    coffee = Column(String, ForeignKey('coffee.name'), nullable=False)
    grinder = Column(String, ForeignKey('grinder.name'), nullable=False)
    # TODO how to add the recipe itself (a script that declares the
    # duration, stops, etc to be executed by the BrewSection when loaded?)

