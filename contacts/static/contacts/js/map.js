ymaps.ready(init);
var mlat = Number(document.getElementById('mlat').value);
var mlong = Number(document.getElementById('mlong').value);

function init() {
    
    var myMap = new ymaps.Map("map", {
            center: [mlat,mlong],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        })
    myMap.geoObjects
        .add(new ymaps.Placemark([mlat,mlong], {
            balloonContent: 'Филиал',
            iconCaption: 'Филиал'
        }, {
            preset: 'islands#dotIcon',
            iconColor: '#735184'
       
        }));
}
