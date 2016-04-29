$(document).foundation();

lohudmetrics({
  'pagename': 'NYC Traffic Camera map',
  'author': 'Kai Teoh'
})

//Create a locally scoped function so we're not messing with the global namespace
function initialize() {
    /*****************/
    /*** VARIABLES ***/
    /*****************/
    
    //App config variables
    var config = {
        'mapicon': 'http://data.lohud.com/icon46small.png',
        'camlayertoggled': false
    };

    
    //Variables for this scope
    var map,
    infowindow,
    trafficLayer,
    cameras = [];

    
    
    /********************/
    /*** MAIN PROGRAM ***/
    /********************/
    
    //Create map
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: new google.maps.LatLng(41.076265, -73.858356),
            zoom: 10
        });
        var style = [{
            featureType: 'all',
            elementType: 'all',
            stylers: [{
                saturation: 3
            }]
        }, {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{
                visibility: 'off'
            }]
        }, {
            featureType: 'transit',
            elementType: 'all',
            stylers: [{
                visibility: 'off'
            }]
        }];

        trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        $.ajax({
            // type: "GET",
            url: 'camdata.php',
            dataType: "json",
            success: jsondata
            // success: console.log('YES!')
         });
    
    
   
    /******************/
    /*** FUNCTIONS ***/
    /*****************/
    
    
    //Parse json data
    function jsondata(data){
      var markers = data;
      for (var i = 0; i < markers.length; i++) {
          var latlng = new google.maps.LatLng(markers[i].Latitude, markers[i].Longitude);
          var marker = createMarker(markers[i].Name, markers[i].DirectionOfTravel, markers[i].Url, latlng);
          cameras.push(marker);
      }
    }
    
    
    function createMarker(Name, DirectionOfTravel, Url, latlng) {
        var marker = new google.maps.Marker({
            position: latlng,
            icon: config.mapicon
        });
            
            
        google.maps.event.addListener(marker, "click", function () {
            if (infowindow) infowindow.close();
            infowindow = new google.maps.InfoWindow({
                content: '<b>' + Name + '</b>' + '<br>' + 'Tap <a href="' + Url + '"' + 'target="_blank"' + '>' + 'here' + '</a>' + ' for larger image.' + '<img src="' + Url + '" ' + 'width="195" />' + '<br>' + DirectionOfTravel,
                maxWidth: 200
            });
            infowindow.open(map, marker);
        });
        return marker;
    }
    
    
    /**********************/
    /*** EVENT HANDLERS ***/
    /**********************/
    
    //Toggle camera layer
    $('#MapSwitch').click(function (e) {
      
            if (config.camlayertoggled == false){
                //show the layer
                for (var i = 0; i < cameras.length; i++) {
                    cameras[i].setMap(map);
                }
            }
            else{
                //hide the layer
                for (var i = 0; i < cameras.length; i++) {
                    cameras[i].setMap(null);
                }
            }
            
            //toggle the config variable
            config.camlayertoggled = !config.camlayertoggled;

    });
};