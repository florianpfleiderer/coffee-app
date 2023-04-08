class Grinder:
    """represents a Coffee Grinder

    Args:
        self
        burrType(str)
        price(float)
    """ 

    def __init__(self, name=None, burrs=None, price=None):
        self.name = name
        self.burrs = burrs
        self.price = price

    def convertToJson(self):
        my_dict = vars(self)
        return my_dict
