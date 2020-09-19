// Карта
ymaps.ready(init);
var map;

function init(){
    map = new ymaps.Map ("map", {
        center: [55.89552760371417,37.697847584655754],
        zoom: 13,
        controls: ["zoomControl", "searchControl", "fullscreenControl"],
        options: {
            preciseZoom: false,
        },
    });
