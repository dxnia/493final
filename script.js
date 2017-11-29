var app = angular.module('493Search', []);

app.controller('searchResult',[ '$scope', '$http', 'Movies', function($scope, $http, Movies) {
	

}]);


app.factory('Movies', function($http) {

	var descriptionData = "";

	return {
      getData: getData
    };

    function getData(artistName) {
      //storyInfo = newWords;
        // console.log(artistName);
          // $scope.loading = true;
		    return $http({
				  method: 'GET',
				  url: 'http://www.theimdbapi.org/api/find/person?name='+artistName
				}).then(function successCallback(response) {
					console.log("success " + response); 
					console.log("response object " + response.data); 

					if(response.data != null){ 
						descriptionData = response.data[0].description;
					} 
					else{ 
						descriptionData = "Sorry, no description found";
					}
					return descriptionData;
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
