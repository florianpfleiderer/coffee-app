from flask import Flask, request
from products import Coffee

app = Flask(__name__)

testcoffee = Coffee.Coffee("Ethiopia", "Arabica", "Washed", "Light", farmer="Max", price=12)

@app.route('/get_price')
def get_price():
    return {'price': testcoffee.price}

@app.route('/post_price', methods=['POST'])
def receive_price():
    testcoffee.price = request.json
    return {'message': 'Price received'}

@app.route('/post_farmer', methods=['POST'])
def receive_data():
    testcoffee.farmer = request.json
    return {'message': 'Data received'}

@app.route('/get_farmer')
def get_farmer():
    return {'farmer': testcoffee.farmer}