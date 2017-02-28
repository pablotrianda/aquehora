var aqueHora = angular.module('aqueHora',[]);

function mainController($scope, $http){
	$scope.formData = {};

	//carga todos los 3 horarios al principio
	$http.get('/api/aquehora/cole')
		.success(function(data){
			$scope.horarios = data;
			console.log(data);
		})
	.error(function(data){
		console.log('Error: ' + data);
	});
}