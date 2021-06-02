from SQL_connection import connection
from datetime import datetime

def insertorder(connect,order):
    cursor=connect.cursor()
    query=("INSERT INTO orders" 
    "(Custmer_Name,Date,Total_Amount)"
     "VALUES (%s,%s,%s)")

    data=(order['Custmer_Name'],datetime.now(),order['Total_Amount'])
    cursor.execute(query,data)
    order_id=cursor.lastrowid

    order_detail=("INSERT INTO order_details" 
    "(order_id,Quantity,product_id,Total_Amount)"
     "VALUES (%s,%s,%s,%s)")
    data2= []

    for records in order['order_details']:
        data2.append([
            
                order_id,
                int(records['Quantity']),
                float(records['product_id']),
                float(records['Total_Amount'])
            ]
        )
    
    cursor.executemany(order_detail,data2)
    connect.commit()

def orders(connect):
    cursor = connect.cursor()
    order_query=("SELECT * FROM orders")
    cursor.execute(order_query)
    OUTPUT=[]
    for (order_id,Date,Custmer_Name,Total_Amount) in cursor:
        OUTPUT.append({
        'order_id':order_id,
        'Date':Date,
        'Custmer_Name':Custmer_Name,
        'Total_Amount':Total_Amount,
        }
        )

    return OUTPUT
def delete(connect,order_id):
    cursor = connect.cursor()
    query=("DELETE FROM orders WHERE order_id="+str(order_id))
    cursor.execute(query)
    connect.commit()
  

if __name__=="__main__":
    connect=connection()
    