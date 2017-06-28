function RequestFilters() {
    var form = $("#filters");
    console.log(form.serialize());
    FetchItems(form.serialize());
}

function FetchItems(queryString) {
    $.ajax({
        method: "GET",
        data: queryString,
        url: "http://localhost:65359/api/items"
    }).success(function (data) {
        ShowItems(data);
    });
}

function ShowItems(data) {
    var wrap = $("#itemWrap");
    wrap.empty();
    for (var i = 0; i < data.length; i++) {
        wrap.append(CreateItemCard(data[i]));
    }
}

function CreateItemCard(item) {
    var panel = $("<div />", {
        class: "panel panel-default col-md-04"
    });
    var panelBody = $("<div />", {
        class: "panel-body"
    }).appendTo(panel);
    $("<a/>", {
        class: "panel-title",
        text: item.Title,
        href: "/items/Details/" + item.Id
    }).appendTo(panelBody);
    $("<p></p>").text(item.Description).appendTo(panelBody);
    var list = $("<ul/>",
        {
            class: "list-group list-group-flush"
        }).appendTo(panel);
    $("<li/>",
        {
            class: "list-group-item",
            text: "€" + item.Price
        }).appendTo(list);
    $("<li/>", {
        class: "list-group-item",
        text: item.InStock + " in stock"
    }).appendTo(list);
    var catLI = $("<li/>", {
        class: "list-group-item"
    }).appendTo(list);

    var CartBtn = $("<button/>",{
            class: "btn btn-default",
            text: "Add to Cart "
    }).appendTo(panelBody);
    $("<span />", {
        class: "glyphicon glyphicon-shopping-cart"
    }).appendTo(CartBtn);

    for (var i = 0; i < item.Categories.length; i++) {
        catLI.append(CreateCategoryLinkNode(item.Categories[i]));
    }

    return panel;
}

function CreateCategoryLinkNode(category) {
    return $("<a/>",
        {
            'href': "/categories/Details/" + category.Id,
            'text': category.Title
        });
}