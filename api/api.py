from api import app
from products import Coffee

@app.route('/')
@app.route('/coffee')
def coffee():
    testcoffee = Coffee.Coffee("Ethiopia", "Arabica", "Washed", "Light", "Max", price=12)
    return {"Preis:": testcoffee.getPrice()}

