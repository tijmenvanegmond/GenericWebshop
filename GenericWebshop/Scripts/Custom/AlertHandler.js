//type == bootrap alert name success,info,warning,danger
function ShowAlert(type, message) {
    var alert = $('<div/>',
    {
        class: 'alert alert-' + type,
        text: message
    }).hide();

    $(".navbar > .container").append(alert);
    $(alert).slideDown(400).delay(800).slideUp(400, function(){$(alert).remove()});
}