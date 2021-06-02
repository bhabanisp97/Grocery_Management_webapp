from SQL_connection import connection

def SHOW_UNITS(connect):

    cursor = connect.cursor()

    query= ("SELECT unit.unit_id,unit FROM grocery_store.unit;")

    cursor.execute(query)

    OUTPUT=[]
    for (Unit_id,unit) in cursor:
        OUTPUT.append({
        'Unit_id':Unit_id,
        'unit':unit
        }
        )
    return OUTPUT

if __name__=="__main__":
    connect=connection()
    print(SHOW_PRODUCTS(connect))
