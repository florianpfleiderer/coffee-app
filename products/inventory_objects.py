'''this class resembles an Inventory Object of the Coffee App.

it contains the Methods used in all Inventory objects
'''

class InventoryObjects():
    """represents an Inventory Object

    Args:
        self
        name(str)
        price(float)
    """

    def __init__(self, name, price):
        self.name = name
        self.price = price

    def convert_to_json(self):
        '''converts the Object to a json object'''
        return vars(self)

    @classmethod
    def from_json(cls, json):
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

    def __init__(self, name=None, origin=None, variety=None, process=None, roast=None,
                 farmer=None, size=None, price=None) -> None:
        super().__init__(name, price)
        self.origin = origin
        self.variety = variety
        self.process = process
        self.roast = roast
        self.farmer = farmer
        self.size = size
        self.price = price

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

    this class is used to filter out for burrtype or burr size as you can 
    extract these data from this class

        args:
        name
        type: this can either be flat or conical (if smething else as input 
            -> set type None)
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


#recipe
class Recipe(InventoryObjects):
    '''represents a Recipe for a Coffee

    Args:
        self
        type(str)
        price(float)

    Attributes:
        name (str): name of the recipe
        coffee (Coffee): the coffee used in the recipe
        grinder (Grinder): the grind size in microns
        water (int): the amount of water in ml
        coffeeIn (int): the amount of coffee in g
        ratio (float): the ratio of coffee to water
        temp (int): the temperature of the water in °C
        totalTime (int): the time in seconds till the coffee is ready
        Pour1stTime (int): the time in seconds till the first pour is finished
        Pour2ndTime (int): the time in seconds till the second pour is finished
    '''

    def __init__(self, name=None, coffee='Choose a Coffee', grinder='Choose a Grinder', water=0,
                 coffeeIn=0, ratio=0, temp=0, totalTime=0, Pour1stTime=0, Pour2ndTime=0, price=0):
        super().__init__(name, price)
        self.coffee = coffee
        self.grinder = grinder
        self.water = water
        self.coffeeIn = coffeeIn
        if(self.water != 0 and self.coffeeIn != 0):
            self.ratio = self.water / self.coffeeIn
        else:
            self.ratio = ratio
        self.temp = temp
        self.totalTime = totalTime
        self.Pour1stTime = Pour1stTime
        self.Pour2ndTime = Pour2ndTime

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
 