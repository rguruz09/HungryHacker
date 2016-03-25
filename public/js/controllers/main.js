angular.module('foodController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Foods', function($scope, $http, Foods) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Foods.get()
			.success(function(data) {
				$scope.foods = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.food_name != undefined && angular.isNumber($scope.formData.food_cost) && $scope.formData.food_desc != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Foods.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foods = data; // assign our new list of todos
					});
			
				$scope.badd = false;

				if ($scope.showblc) {
					$scope.getTotal();
				}

			} else {

			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.foods = data; // assign our new list of todos
				});

			if ($scope.showblc) {
					$scope.getTotal();
				}
		};

		// Get the the total cost for all the food items
		$scope.getTotal = function() {
			$scope.loading = true;

			Foods.getTotalCost()
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.ttlCost = 'Total : $ ' + data.total + '      (inc 7.5% tax)'; // assign our new list of todos
					$scope.showblc = true;
					$scope.bcalc = true;
				});
		};


		$scope.showForm = function() {
			$scope.loading = false;
			$scope.badd = true;	
		};

	}]);