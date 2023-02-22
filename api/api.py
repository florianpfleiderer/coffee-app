from flask import Flask, request,jsonify
from products import Coffee

app = Flask(__name__)

testcoffee = Coffee.Coffee(origin="Ethiopia", variety="Arabica", process="Washed", roast="Light", farmer="Max", price=12)

@app.route('/get_coffee')
def get_coffee():
    return {'origin': testcoffee.origin, 'farmer': testcoffee.farmer, 'price': testcoffee.price}

@app.route('/post_price', methods=['POST', 'GET'])
def receive_price():
    if request.method == 'POST':
        testcoffee.price = request.json['data']
        return {'message': 'Price received'}
    return {'message': 'no price received'}
    
