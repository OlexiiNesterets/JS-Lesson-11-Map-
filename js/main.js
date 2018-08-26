'use strict';

(function ($) {

    (function mapInit(){

        var firstLocation;
        var secondLocation;
    
        var route = new google.maps.Polyline();
    
        var markerFirst = new google.maps.Marker();
        var markerSecond = new google.maps.Marker();
    
        var coordinates = { lat: 51.49778, lng: 31.287695 };
        var map = $('.map')[0];
        var myMap = new google.maps.Map(map,
            {
                zoom: 4,
                center: coordinates,
            });
    
        var geocoder = new google.maps.Geocoder();
    
        $('.button').on('click', function() {
    
            markerFirst.setMap(null);
            markerSecond.setMap(null);
            route.setMap(null);
    
            var $addressFirst = $('.input-first').val();
            var $addressSecond = $('.input-second').val();
    
            geocoder.geocode({ 'address': $addressFirst },
                function (result, status) {
                    if (status === 'OK') {
                        firstLocation = result[0].geometry.location;
                        
                        geocoder.geocode({ 'address': $addressSecond },
                            function (result, status) {
                                if (status === 'OK') {
    
                                    markerFirst = new google.maps.Marker({
                                        map: myMap,
                                        position: firstLocation
                                    });
                                        
                                    secondLocation = result[0].geometry.location;
                                    markerSecond = new google.maps.Marker({
                                        map: myMap,
                                        position: secondLocation
                                    });

                                    myMap.setCenter(result[0].geometry.location);
        
                                    route = new google.maps.Polyline({
                                        path: [
                                            new google.maps.LatLng(firstLocation.lat(), firstLocation.lng()),
                                            new google.maps.LatLng(secondLocation.lat(), secondLocation.lng())
                                        ],
                                        strokeColor: "#0066ff",
                                        strokeOpacity: 0.4,
                                        strokeWeight: 4,
                                    });
    
                                    route.setMap(myMap);
    
                                } else {
                                    console.log("Что-то не так в поле 2: " + status);
                                }
                            });
    
                    } else {
                        console.log("Что-то не так в поле 1: " + status);
                    }
                });
    
        });

    })();

})(jQuery);