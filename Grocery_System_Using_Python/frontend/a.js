//Define apis
var productlistApiUrl='http://127.0.0.1:5000/getproducts';
var unitlistUrl='http://127.0.0.1:5000/getunit';
var productdeleteApiUrl='http://127.0.0.1:5000/deleteproducts';
var productsaveurl='http://127.0.0.1:5000/insertproducts';
var ordersaveurl='http://127.0.0.1:5000/insertorder';
var orderlisturl='http://127.0.0.1:5000/getOrders';
var orderdeleteurl='http://127.0.0.1:5000/deleteorders';


function  callApi(method,url,data) {
    $.ajax({

        method: method,
        url: url,
        data: data
    }).done(function(status) {
        window.location.reload();   
    });
    
}


function calculateValue() {
    var total = 0;
    $(".product-item").each(function( index ) {
        var qty = parseFloat($(this).find('.product-qty').val());
        var price = parseFloat($(this).find('#product_price').val());
        price = price*qty;
        $(this).find('#item_total').val(price.toFixed(2));
        total += price;
    });
    $("#product_grand_total").val(total.toFixed(2));
}