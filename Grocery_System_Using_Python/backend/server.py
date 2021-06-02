from flask import Flask,request,jsonify
import productindex
from SQL_connection import connection
import json
import unit
from flask_cors import CORS
import orders
app= Flask(__name__)
connect=connection()
CORS(app)

@app.route('/getproducts',methods=['GET'])
def get_products():
    products = productindex.SHOW_PRODUCTS(connect)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/getOrders',methods=['GET'])
def get_orders():
    products = orders.orders(connect)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
@app.route('/getunit',methods=['GET'])
def get_units():
    products = unit.SHOW_UNITS(connect)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
@app.route('/deleteproducts',methods=['POST'])
def del_products():
    return_id=productindex.delete(connect,request.form['product_id'])
    response = jsonify({
        'product_id':return_id
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/deleteorders',methods=['POST'])
def del_order():
    ret_id=orders.delete(connect,request.form['order_id'])
    response = jsonify({
        'order_id':ret_id
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/insertorder',methods=['POST'])
def insert_order():
    info=json.loads(request.form['data'])
    ROW_id=orders.insertorder(connect, info)
    respose=jsonify({
        'product_id':ROW_id
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

if __name__=="__main__":
    print("hello!")
    app.run(port=5000)
