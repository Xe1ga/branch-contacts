$('.get-data-modal').on('click', function(){
    $('.filter-form').hide("slow");
    clearModalTable();
    var dep_due = $(this).attr('data');
    var reportName = $(this).attr('data-reportName');
    // $('#preloader-modal').show();
    // $('#preloader-modal').hide();
    // html = 'НЕКИЙ ТЕКСТ';
    // $('#docsList').append(html + '</tbody>');
    setTablePlugins('#docsList');
    $('#docsList').show();
});