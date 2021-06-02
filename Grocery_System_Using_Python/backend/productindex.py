from SQL_connection import connection


def SHOW_PRODUCTS(connect):

    cursor = connect.cursor()

    query= ("SELECT products.Product_id,products.Product_Name,products.unit_id,products.Price_per_unit,unit.unit FROM grocery_store.products inner join unit on products.unit_id=unit.unit_id")

    cursor.execute(query)

    OUTPUT=[]
    for (Product_id,Product_Name,unit_id,Price_per_unit,unit) in cursor:
        OUTPUT.append({
        'Product_id':Product_id,
        'Product_Name':Product_Name,
        'unit_id':unit_id,
        'Price_per_unit':Price_per_unit,
        'unit':unit
        }
        )

    return OUTPUT

def Insert_data(connect,data_item):
    cursor = connect.cursor()
    query = ("INSERT INTO products "
              "(Product_Name,unit_id,Price_per_unit) "
              "VALUES (%s, %s, %s)")
    data=(data_item['Product_Name'],data_item['unit_id'],data_item['Price_per_unit'])
    cursor.execute(query,data)
    connect.commit()
    

def delete(connect,product_id):
    cursor = connect.cursor()
    query=("DELETE FROM products WHERE Product_id="+str(product_id))
    cursor.execute(query)
    connect.commit()


if __name__=="__main__":
    connect=connection()
    print(Insert_data(connect,{'Product_Name':'yeappi','unit_id':4,'Price_per_unit':50}))
