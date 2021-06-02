$(document).ready(function(){
    $(function () {
        $.get(orderlisturl, function (response) {
            if(response) {
                var table = '';
                var totalCost = 0;
                $.each(response, function(index, order) {
                    totalCost += parseFloat(order.Total_Amount);
                    table +='<tr id="tr" data-Date="'+ order.Date +'" data-id="'+order.order_id+'" data-name="'+ order.Custmer_Name +'" data-price="'+ order.Total_Amount +'">'+
                        '<td>'+ order.Date +'</td>'+
                        '<td >'+ order.order_id +'</td>'+
                        '<td>'+ order.Custmer_Name+'</td>'+
                        '<td>'+ order.Total_Amount.toFixed(2) +' Rs</td>'+
                        '<td><span class= "btn btn-xs btn-danger" id="del" title="delete product">Delete</span></td></tr>';
                });
                table += '<tr id="tr"><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
                $("table").find('tbody').empty().html(table);
            }
        });
    });
    $(document).on("click","#del",function(){
        var row = $(this).closest('tr');
        var data={
            order_id :row.data("id")
        };
        var isDelete = confirm("Mr. "+row.data("name") + "Do you Really wants to cancel the order");
        if(isDelete){
            callApi("POST",orderdeleteurl,data);
        }
    });
    
});