$(document).ready(function() {
    $.get(productlistApiUrl,function(response) {
        if(response){
            var val=' ';
            $.each(response,function(index,product){
                val +=  '<tr id="tr" data-id="'+ product.Product_id +'" data-name="'+ product.Product_Name +'" data-unit="'+ product.unit +'" data-price="'+ product.Price_per_unit +'">'+
                '<td>'+ product.Product_Name +'</td>'+
                '<td >' + product.unit + '</td>'+
                '<td>' + product.Price_per_unit + '</td>'+
                '<td><span class= "btn btn-xs btn-danger" id="del" title="delete product">Delete</span></td></tr>';

            });
            $("table").find("tbody").empty().html(val);
        }
        
    });
    


$(document).on("click","#del",function(){
    var row = $(this).closest('tr');
    var data={
        product_id :row.data("id")
    };
    var isDelete = confirm("do you Really want to Delete "+row.data("name") + " From Your Repository ?");
    if(isDelete){
        callApi("POST",productdeleteApiUrl,data);
    }
});

$("#prosave").on("click",function(){
    var data=$("#newproductForm").serializeArray();
    var a={
        Product_Name:null,
        unit_id:null,
        Price_per_unit:null
    };
    for(var i=0;i<data.length;++i){
        var element = data[i];
        switch(element.name) {
            case 'name':
                a.Product_Name = element.value;
                break;
            case 'unit':
                a.unit_id = element.value;
                break;
            case 'price':
                a.Price_per_unit = element.value;
                break;
        }
    }
    callApi("POST",productsaveurl,{'data':JSON.stringify(a)
});

});

});