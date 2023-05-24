'''This Module contains the models for the tables in the database.

'''
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class InventoryObject():
    '''This Base Class contains the methods that are similar for every Object.
    
    methods:
        convert_to_json: converts the object to a json object
        from_json: returns an Instance of the Class
    '''

    @classmethod
    def from_json(cls, json):
        ''' creates a new instance of an Object from a json object

        Args:
            json (dict): a json object with the attributes of the Object

        Returns:
            Object: a new instance of the specified inventory object
        '''
        return cls(**json)



class CoffeeDB(Base, InventoryObject):
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
    origin = Column(String, nullable=True)
    variety = Column(String, nullable=True)
    process = Column(String, nullable=True)
    roast = Column(String, nullable=True)
    size = Column(Integer, nullable=True)
    brew_recipes = relationship('RecipeDB', back_populates='coffee')

    def convert_to_json(self):
        '''converts the object to a json object

        without the id, as this is not a field in frontend

        Returns:
            dict: a json object with the attributes of the object
        '''
        return {
            'name': self.name,
            'price': self.price,
            'farmer': self.farmer,
            'origin': self.origin,
            'variety': self.variety,
            'process': self.process,
            'roast': self.roast,
            'size': self.size
        }


class GrinderDB(Base, InventoryObject):
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
    brew_recipes = relationship('RecipeDB', back_populates='grinder')

    def convert_to_json(self):
        '''converts the object to a json object

        without the id, as this is not a field in frontend

        Returns:
            dict: a json object with the attributes of the object
        '''
        return {
            'name': self.name,
            'price': self.price,
            'burr': self.burr
        }


class RecipeDB(Base, InventoryObject):
    '''This class represents the table with all the brew recipes in the database.
    
    The columns (= attributes) are the recipes, and are connected to the other
    two databases containing coffees and grinders which are the relevant factors
    for choosing a recipes.
    
    Columns:
        id (int): the id of the brew recipe
        name (str): the name of the brew recipe
        totalTime (int): the total time of the brew recipe
        time1 (int): the time of the first pour
        time2 (int): the time of the second pour
        temp (int): the temperature of the water used in the brew recipe
        coffee_id (int): the id of the coffee used in the brew recipe
        grinder_id (int): the id of the grinder used in the brew recipe
       
        
    '''
    __tablename__ = 'recipes'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    water = Column(Integer, nullable=False)
    coffee_In = Column(Integer, nullable=False)
    totalTime = Column(Integer, nullable=False)
    time1 = Column(Integer, nullable=True)
    time2 = Column(Integer, nullable=True)
    temp = Column(Integer, nullable=True)
    coffee_id = Column(Integer, ForeignKey('coffees.id'), nullable=False)
    grinder_id = Column(Integer, ForeignKey('grinders.id'), nullable=False)
    coffee = relationship('CoffeeDB', back_populates='brew_recipes')
    grinder = relationship('GrinderDB', back_populates='brew_recipes')

    def convert_to_json(self):
        '''converts the object to a json object

        without the id, as this is not a field in frontend

        Returns:
            dict: a json object with the attributes of the object
        '''
        return {
            'name': self.name,
            'coffee': self.coffee.name,
            'grinder': self.grinder.name,
            'water': self.water,
            'coffee_In': self.coffee_In,
            'temp': self.temp,
            'totalTime': self.totalTime,
            'time1': self.time1,
            'time2': self.time2

        }
