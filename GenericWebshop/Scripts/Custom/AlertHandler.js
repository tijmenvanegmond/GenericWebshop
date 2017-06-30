//this script is loaded at the sharded _layout allowing showing alert messages in the header
//type == bootrap alert name success,info,warning,danger
function ShowAlert(type, message) {
    var alert = $('<div/>',
    {
        class: 'alert alert-' + type,
        text: message
    }).hide();

    $(".navbar > .container").append(alert);
    $(alert).slideDown(200).delay(1500).slideUp(200, function(){$(alert).remove()});
}