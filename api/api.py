import time
from flask import Flask
from products import Coffee

app = Flask(__name__)

@app.route('/coffee')
def coffee():
    testcoffee = Coffee.Coffee("Ethiopia", "Arabica", "Washed", "Light", "Max", price=12)
    return {'coffee': testcoffee.getPrice()}

'''
@app.route('/time')
def get_current_time():
    return {'time2': time.time()}
'''

