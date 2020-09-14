function buildUrl(url, fromDate, dueDate, due, reportName) {
    if (reportName != undefined && reportName != null && reportName != "") {
        return url + "?" + "fromDate=" + encodeURIComponent(fromDate) + "&dueDate=" + encodeURIComponent(dueDate) + "&due=" + encodeURIComponent(due) + "&reportName=" + encodeURIComponent(reportName);
    } else {
        return url + "?" + "fromDate=" + encodeURIComponent(fromDate) + "&dueDate=" + encodeURIComponent(dueDate) + "&due=" + encodeURIComponent(due);
    }
}

function buildUrlRCPD(url, fromDate, dueDate, due, reportName, days_count) {
    if (reportName != undefined && reportName != null && reportName != "") {
        url = url + "?" + "fromDate=" + encodeURIComponent(fromDate) + "&dueDate=" + encodeURIComponent(dueDate) + "&due=" + encodeURIComponent(due) + "&reportName=" + encodeURIComponent(reportName);
    } else {
        url = url + "?" + "fromDate=" + encodeURIComponent(fromDate) + "&dueDate=" + encodeURIComponent(dueDate) + "&due=" + encodeURIComponent(due);
    }

    if (days_count != undefined && days_count != null && days_count != "") {
        return url + "&days_count=" + encodeURIComponent(days_count);
    } else {
        return url;
    }
}

function buildRcUrl(rc_isn) {
    var result = "http://delo-web/delo/open_obj.aspx?rc_id=" + rc_isn;
    return result;
}

function fnExcelReportIE(id) {
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById(id); // id of table

    for(j = 0 ; j < tab.rows.length ; j++) {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text+"</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa = txtArea1.document.execCommand("SaveAs",true,"report.xls");
    } 

    return (sa);
}

/* Объявление функции выгрузки таблиц в Excel средствами Javascript */
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

    return function(table, name) {
        table_id = table
        if (!table.nodeType) {
            table = document.getElementById(table)
        }
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        file = uri + base64(format(template, ctx));
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE "); 

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            fnExcelReportIE(table_id);
        } else {
            window.location.href = file;
        }
    }
})()

//=========================

function clearModalTable() {
    $('#docsList').css("hide", "table");
    $('#docsList tbody').remove();
    $('#docsList thead').remove();
    $('#date-form-header').remove();
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

$('#dateform').on('submit', function(){
    $('#preloader-report').show();
    $('#table').hide();
});

$(document).on('ready', function(){
    $('#preloader-report').hide();
});

$( document ).ready( function(){
    $('#preloader-report').hide();
});

//Вывод таблицы на печать
$('#printList').on('click', function() {
    /*jQuery('.modalBody').print();*/
    var iframe=$('<iframe id="print_frame">'); // создаем iframe в переменную
    $('body').append(iframe); //добавляем эту переменную с iframe в наш body (в самый конец)
    var html_to_print=$('.modal-body').html();
    var doc = $('#print_frame')[0].contentDocument || $('#print_frame')[0].contentWindow.document;
    var win = $('#print_frame')[0].contentWindow || $('#print_frame')[0];
    doc.getElementsByTagName('body')[0].innerHTML = html_to_print;
    win.print();
    $('iframe').remove();
    var printing_css='<style media="print">td{border: 1px solid #000;}</style>';
    var html_to_print=printing_css + $('#to_print').html();
    
});

$('form').on('submit', function(){
    if ($('#preloader-main')) {
        $('#preloader-main').show();
    }
});

$('.isnDoc').each(function(index) {
    var url = buildRcUrl($(this).attr("data") ? $(this).attr("data") : "#");
    $(this).attr("href", url);
});