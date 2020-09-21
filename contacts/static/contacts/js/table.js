$('.get-data-modal').on('click', function(){
    var org_id = $(this).attr('data');
    var address = $(this).attr('data-address');
    var workinghours = $(this).attr('data-workinghours');
    var metro = $(this).attr('data-metro');
    var phone = $(this).attr('data-phone');
    var coordinates = $(this).attr('data-coord');
    
    document.getElementById('address').value = address;
    document.getElementById('workinghours').value = workinghours;
    document.getElementById('metro').value = metro;
    document.getElementById('phone').value = phone;
    document.getElementById('coordinates').value = coordinates;
    document.getElementById('organizationid').value = org_id;

    url = buildUrl("/contacts/map", org_id)
    $('#showmap').attr({
        "href" : url
    });
});   
$('#orgdelete').click(function(){
    org_id = document.getElementById('organizationid').value;
    $.ajax({
            url: "/contacts/delete_organization/",
            method: 'POST',
            data: {
                org_id : org_id  
            }
        });
    location.reload();
});

function buildUrl(url, org_id) {
    return url + "?" + "org_id=" + org_id;
}