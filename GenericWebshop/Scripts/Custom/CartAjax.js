
$(".amount").change(function () {
    var value = Number(this.value);
        if (value <= 0) {
            $(this).val(1);
        } else {
            AmountChangeAction(Number(this.id), value);
        }
    }
);

function AmountChangeAction(id, amount) {
    var orderItem = {
        "Orders_Id": 1,
        "Items_Id": id,
        "Amount": amount
    };
    PostItem(orderItem);
}

function DeleteItemAction(itemId) {
    var orderItem = {
        "Orders_Id": 1,
        "Items_Id": itemId
    };

    DeleteItem(orderItem);
}

function PostItem(orderItem) {
    $.ajax({
        method: "Post",
        data: orderItem,
        url: "http://localhost:65359/api/cart/1"
    }).success(function (data) {
    });
}


function DeleteItem(orderItem) {
    $.ajax({
        method: "Delete",
        data: orderItem,
        url: "http://localhost:65359/api/cart/1"
    })
    .done(function () {
            RemoveRow(orderItem.Items_Id);
            ShowAlert('info', 'successfully removed an item from cart');
        })
    .fail(function () {
        ShowAlert('danger', 'Failed to remove item from cart');
    });
}

function RemoveRow(id) {
    $("#" + id).remove();
}