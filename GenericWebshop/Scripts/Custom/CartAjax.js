
$(".amount").change(function() {
        var amount = Number(this.value);
        if (amount <= 0) {
            amount = 1;
            $(this).val(amount);
        } 
        AmountChangeAction(Number(this.id), amount);
    }
);

function UpdatePrices() {
    var cartItems = $(".cartItem");
    var totalPriceOfCart = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var tableRow = $(cartItems[i]);

        var amount = Number(tableRow.find(".amount")[0].value);
        var price = MoneyToNumber(tableRow.find(".price").text());
        var total = amount * price;

        totalPriceOfCart += total;
        tableRow.find(".total-price > strong").text("€"+total);
    }
    $("#total").text("€" + totalPriceOfCart);
}

function MoneyToNumber(moneyString) {
    return(Number(moneyString.substring(1)));
}


function AmountChangeAction(id, amount) {
    var orderItem = {
        "Orders_Id": 1,
        "Items_Id": id,
        "Amount": amount
    };
    PostItem(orderItem);
    UpdatePrices();
}

function DeleteItemAction(itemId) {
    var orderItem = {
        "Orders_Id": 1,
        "Items_Id": itemId
    };
    DeleteItem(orderItem);
}

//updates/adds an item
function PostItem(orderItem) {
    $.ajax({
        method: "Put",
        data: orderItem,
        url: "http://localhost:65359/api/cart/1"
    })
    .done()
    .fail(function () {
        ShowAlert("danger", "Could not change item amount");
    });
}
//deletes matching order item
function DeleteItem(orderItem) {
    $.ajax({
        method: "Delete",
        data: orderItem,
        url: "http://localhost:65359/api/cart/1"
    })
    .done(function () {
        RemoveRow(orderItem.Items_Id);
        UpdatePrices();
        ShowAlert("info", "successfully removed an item from cart");
    })
    .fail(function () {
        ShowAlert("danger", "Failed to remove item from cart");
    });
}

function RemoveRow(id) {
    $("#" + id).remove();
}