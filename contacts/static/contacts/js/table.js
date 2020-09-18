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
});

    
    
    // $('#info').show();
    // $('.filter-form').hide("slow");
    // clearModalTable();
    // var dep_due = $(this).attr('data');
    // var reportName = $(this).attr('data-reportName');
    // $('#preloader-modal').show();
    // $.ajax({
    //     url: "/deloreports/effectiveness_report/get_docs_list",
    //     method: 'POST',
    //     data: {
    //         due: $(this).attr('data'),
    //         fromDate: fromDate.toISOString(),
    //         dueDate: dueDate.toISOString(),
    //         reportName: reportName 
    //     },
    //     success: function( data ) {
    //         $('#preloader-modal').hide();
    //         result = data.data
    //         html = '<thead><tr><th>№</th><th style="width:150px;">Номер документа</th>' + 
    //         '<th>Дата регистрации</th>' + 
    //         '<th>Исполнитель</th>' +
    //         '<th>Содержание</th></tr></thead><tbody>'
    //         var i = 0;
    //         for (var row in result) {
    //             i++;
    //             html += '<tr>' + 
    //                         '<td>'+ i +'</td>'+
    //                         '<td>'+ result[row][0] +'</td>'+
    //                         '<td>'+ result[row][1] +'</td>'+
    //                         '<td>'+ result[row][2] +'</td>'+
    //                         '<td>'+ (result[row][3] ? result[row][3] : "Нет содержания") + '</td>'+
    //                     '</tr>';
    //         }
    //         $('#docsList').append(html + '</tbody>')
            
    //         setTablePlugins('#docsList');
    //         url = buildUrl("/deloreports/effectiveness_report/download_docs_list", fromDate.toISOString(), dueDate.toISOString(), dep_due, reportName)
            // $('#info').show();
            // $('#downloadList').attr({
    //             "href" : url
    //         });
    //     }
    // });

