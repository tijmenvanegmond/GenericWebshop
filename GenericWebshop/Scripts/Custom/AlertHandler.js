//this script is loaded at the sharded _layout allowing showing alert messages in the header
//type == bootrap alert name success,info,warning,danger
function ShowAlert(type, message) {
    var alert = $('<div/>',
    {
        class: 'alert alert-' + type,
        text: message
    }).hide();

    $(".navbar > .container").append(alert);
    $(alert).slideDown(250).delay(1000).slideUp(250, function(){$(alert).remove()});
}