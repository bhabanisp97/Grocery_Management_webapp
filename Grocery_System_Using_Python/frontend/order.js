var productPrices = {};
$(function () {
    $.get(productlistApiUrl, function (response) {
        productPrices = {}
        if(response) {
            var options = '<option value="">--Select--</option>';
            $.each(response, function(i, product) {
                options += '<option value="'+ product.Product_id +'">'+ product.Product_Name +'</option>';
                options +='<td><span class= "btn btn-xs btn-danger" id="del" title="delete product">Delete</span></td></tr>';
                productPrices[product.Product_id] = product.Price_per_unit;
            });
            $(".product-box").find("select").empty().html(options);
        }
    });
});

$("#addMoreButton").click(function () {
    var row = $(".product-box").html();
    $(".product-box-extra").append(row);
    $(".product-box-extra .remove-row").last().removeClass('hideit');
    $(".product-box-extra .product-price").last().text('0.0');
    $(".product-box-extra .product-qty").last().val('1');
    $(".product-box-extra .product-total").last().text('0.0');
});
$(document).on("click", ".remove-row", function (){
    $(this).closest('.row').remove();
    calculateValue();
});
$(document).on("change", ".cart-product", function (){
    var product_id = $(this).val();
    var price = productPrices[product_id];

    $(this).closest('.row').find('#product_price').val(price);
    calculateValue();
});
$(document).on("change", ".product-qty", function ( ){
    calculateValue();
});


$("#saveOrder").on("click", function(){
    var formData = $("form").serializeArray();
    var requestPayload = {
        Custmer_Name: null,
        Total_Amount: null,
        order_details: []
    };
    var orderDetails = [];
    for(var i=0;i<formData.length;++i) {
        var element = formData[i];
        var lastElement = null;

        switch(element.name) {
            case 'customerName':
                requestPayload.Custmer_Name = element.value;
                break;
            case 'product_grand_total':
                requestPayload.Total_Amount = element.value;
                break;
            case 'product':
                requestPayload.order_details.push({
                    product_id: element.value,
                    Quantity: null,
                    Total_Amount: null
                });                
                break;
            case 'qty':
                lastElement = requestPayload.order_details[requestPayload.order_details.length-1];
                lastElement.Quantity = element.value
                break;
            case 'item_total':
                lastElement = requestPayload.order_details[requestPayload.order_details.length-1];
                lastElement.Total_Amount = element.value
                break;
        }

    }
    callApi("POST", ordersaveurl, {
        'data': JSON.stringify(requestPayload)
    });
});