from flask import Flask, request, jsonify
from products import Inventory

app = Flask(__name__)
inventory = []


@app.route('/api/coffees', methods=['POST'])
def add_coffee():
    coffee_data = request.get_json()
    inventory.append(coffee_data)
    return 'Coffee added', 200


# @app.route('/get_coffee')
# def get_coffee():
#     return {'coffee1': {'origin': coffees['coffee1'].origin, 'farmer': coffees['coffee1'].farmer, 'price': coffees['coffee1'].price},
#             'coffee2': {'origin': coffees['coffee2'].origin, 'farmer': coffees['coffee2'].farmer, 'price': coffees['coffee2'].price}}

# @app.route('/post_price', methods=['POST', 'GET'])
# def receive_price():
#     if request.method == 'POST':
#         coffees['coffee1'].price = request.json['data']
#         return {'message': 'Price received'}
#     return {'message': 'no price received'}
