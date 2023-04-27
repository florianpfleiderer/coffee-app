import json
'''this class resembles an Inventory Object of the Coffee App

it conatains the Methods used in all Inventory objects'''

class InventoryObjects:
    """represents an Inventory Object

    Args:
        self
        name(str)
        price(float)
    """ 

    def __init__(self, name, price):
        self.name = name
        self.price = price

    def convertToJson(self):
        return vars(self)
    
    @classmethod
    def fromJson(cls, json):
        ''' creates a new instance of an Object from a json object
        
        Args:
            json (dict): a json object with the attributes of the Object
            
        Returns:
            Object: a new instance of the sepcified inventory object
        '''
        return cls(**json) 
    
    def __str__(self):
        return f'{self.name} costs {self.price}€'
    

class Coffee(InventoryObjects):
    '''represents an Instance of a Coffee Variety
    
    Attributes:
        origin (str): 
        variety (str): 
        process (str):
        roast (str):
        farmer (str):
        size (float): the size of the coffee bag in g
        price (float): the price of the coffee in € 
            e.g.: 1.6 equals 1€ and 60 cents
    '''

    def __init__(self, name=None, origin=None, variety=None, process=None, roast=None, farmer=None,size=None, price=None) -> None:
        super().__init__(name, price)
        self.origin = origin
        self.variety = variety
        self.process = process
        self.roast = roast
        self.farmer = farmer
        self.size = size
        self.price = price

    def getPrice_perKilo(self):
        '''returns the price per Kilo to compare different beans
        
        takes size and price to calculate price per kilo

        Args:
            self

        Returns:
            price_perKilo (float): the price per Kilo

        Raises:
            -
        '''

        return self.price / (self.size * 0.1)
    
    def __str__(self):
        return f'{self.name} costs {self.price}€'
    

class Grinder(InventoryObjects):
    '''represents a Coffee Grinder

    Args:
        self
        burrType(str)
        price(float)
    ''' 

    def __init__(self, name, burrs, price):
        super().__init__(name, price)
        self.burrs = burrs
    
    def __str__(self):
        return f'{self.name} costs {self.price}€'
    

class Burr(InventoryObjects):
    '''represents a specific burr type

    this class is used to filter out for burrtype or burr size as you can extract these data from this class

        args:
        name
        type: this can either be flat or conical (if smething else as input -> set type None)
        size: in mm
        price: 
    '''

    def __init__(self, name=None, type=None, size=None, price=None):
        super().__init__(name, price)
        if(type == 'flat' or type == 'conical'):
            self.type = type
        self.size = size
        self.price = price

    def __str__(self):
        return f'{self.name} costs {self.price}€'
    

# class CoffeeMachine(InventoryObjects):
#     '''represents a Coffee Machine

#     Args:
#         self
#         type(str)
#         price(float)
#     ''' 

#     def __init__(self, name, type, price):
#         super().__init__(name, price)
#         self.type = type
    
#     def __str__(self):
#         return f'{self.name} costs {self.price}€'
    

# class Accessory(InventoryObjects):
#     '''represents an Accessory for Coffee

#     Args:
#         self
#         type(str)
#         price(float)
#     ''' 

#     def __init__(self, name, type, price):
#         super().__init__(name, price)
#         self.type = type
    
#     def __str__(self):
#         return f'{self.name} costs {self.price}€'
    
    

    