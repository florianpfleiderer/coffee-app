class Burr:
    """represents a specific burr type

    this class is used to filter out for burrtype or burr size as you can extract these data from this class

    args:
        name
        type: this can either be flat or conical (if smething else as input -> set type None)
        size: in mm
        price: 
    
    """
    def __init__(self, name=None, type=None, size=None, price=None):
        self.name = name
        if(type == 'flat' or type == 'conical'):
            self.type = type
        self.size = size
        self.price = price

    def convertToJson(self):
        my_dict = vars(self)
        return my_dict
    