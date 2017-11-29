var app = angular.module('493FinalProj', []);

app.controller('searchPage',[ '$scope', '$http', 'Places', function($scope, $http, Places) {
	console.log("i got here");
	


	$scope.add = function(city) {
		console.log("worked");

		 	alert("add function works " + city);
		 	Places.getData(city).then(function(response){
		 		$scope.predictions  = response;
				console.log($scope.predictions);

		 	});

   		}; 
   		// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=



	// $scope.initAutocomplete = function() {
 //        var map = new google.maps.Map(document.getElementById('map'), {
 //          center: {lat: -33.8688, lng: 151.2195},
 //          zoom: 13,
 //          mapTypeId: 'roadmap'
 //        });

 //        // Create the search box and link it to the UI element.
 //        var input = document.getElementById('pac-input');
 //        var searchBox = new google.maps.places.SearchBox(input);
 //        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

 //        // Bias the SearchBox results towards current map's viewport.
 //        map.addListener('bounds_changed', function() {
 //          searchBox.setBounds(map.getBounds());
 //        });

 //        var markers = [];
 //        // Listen for the event fired when the user selects a prediction and retrieve
 //        // more details for that place.
 //        searchBox.addListener('places_changed', function() {
 //          var places = searchBox.getPlaces();

 //          if (places.length == 0) {
 //            return;
 //          }

 //          // Clear out the old markers.
 //          markers.forEach(function(marker) {
 //            marker.setMap(null);
 //          });
 //          markers = [];

 //          // For each place, get the icon, name and location.
 //          var bounds = new google.maps.LatLngBounds();
 //          places.forEach(function(place) {
 //            if (!place.geometry) {
 //              console.log("Returned place contains no geometry");
 //              return;
 //            }
 //            var icon = {
 //              url: place.icon,
 //              size: new google.maps.Size(71, 71),
 //              origin: new google.maps.Point(0, 0),
 //              anchor: new google.maps.Point(17, 34),
 //              scaledSize: new google.maps.Size(25, 25)
 //            };

 //            // Create a marker for each place.
 //            markers.push(new google.maps.Marker({
 //              map: map,
 //              icon: icon,
 //              title: place.name,
 //              position: place.geometry.location
 //            }));

 //            if (place.geometry.viewport) {
 //              // Only geocodes have viewport.
 //              bounds.union(place.geometry.viewport);
 //            } else {
 //              bounds.extend(place.geometry.location);
 //            }
 //          });
 //          map.fitBounds(bounds);
 //        });
 //      }


}]);



app.factory('Places', function($http) {

	var descriptionData = "";

	return {
      getData: getData
    };

    function getData(city) {
      //storyInfo = newWords;
        // console.log(artistName);
          // $scope.loading = true;
          console.log('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+city+'&key='+'AIzaSyAk2w4o27LZQzZrSk7QKq-erTQEGqZnnZo'); 
		    return $http({
				  method: 'GET',
				  dataType: 'jsonp', 
				  cache: false, 
				  url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+city+'&key='+'AIzaSyAk2w4o27LZQzZrSk7QKq-erTQEGqZnnZo'
				}).then(function successCallback(response) {
					console.log("success " + response.data.predictions); 
					var obj = JSON.stringify(response); 
		        console.log("object: " + obj); 
					console.log("response object " + response.predictions); 

					if(response.data != null){ 
						descriptionData = response.data.predictions[0].description;
						locationId = response.data.predictions[0].id; 
						predictions = response.data.predictions; 
					} 
					else{ 
						descriptionData = "Sorry, no description found";
					}
					return predictions;
				  })
    }
	
});



app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

