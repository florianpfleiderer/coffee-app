import json
class Coffee:
    """represents an Instance of a Coffee Variety 
    
    Attributes:
        origin (str): 
        variety (str): 
        process (str):
        roast (str):
        farmer (str):
        size (float): the size of the coffee bag in g
        price (float): the price of the coffee in € 
            e.g.: 1.6 equals 1€ and 60 cents
    """

    def __init__(self, name=None, origin=None, variety=None, process=None, roast=None, farmer=None,size=None, price=None) -> None:
        self.name = name
        self.origin = origin
        self.variety = variety
        self.process = process
        self.roast = roast
        self.farmer = farmer
        self.size = size
        self.price = price
    
    # INFO: wir brauchen in Python keine getter und setter, da es in Python keine private or protected variables gibt.
    #       der Konsens in Python ist es, achtsamer mit variablen umzugehen
    #       private variablen würde man mit __var angeben, die sind aber auch mit einem kleinen Umweg von außen zugänglich 
    #       - daher macht es auch keinen Sinn, getter und setter zu schreiben

    def getPrice_perKilo(self):
        """returns the price per Kilo to compare different beans
        
        takes size and price to calculate price per kilo

        Args:
            self

        Returns:
            price_perKilo (float): the price per Kilo

        Raises:
            -
        """

        return self.price / (self.size * 0.1)

    def convertToJson(self):
        my_dict = vars(self)
        return my_dict
