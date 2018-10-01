'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {
        $scope.getAllVisitors = '';
        $scope.id = '';

        $http.get('http://localhost:5000/visitors')
            .then(
                function (response) {
                    console.log(response.data);
                    $scope.getAllVisitors = response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching visitors');
                    return $q.reject(errResponse);
                }
            );

        $scope.listVisitors = function () {
            $http.get('http://localhost:5000/visitors')
                .then(
                    function (response) {
                        console.log(response.data);
                        $scope.getAllVisitors = response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching visitors');
                        return $q.reject(errResponse);
                    }
                );
        };

        $scope.editVisitor = function (id) {
            console.log("edit");
            console.log(id);

        };

        $scope.deleteVisitor = function (id) {
            $http.delete('http://localhost:5000/deleteVisitor/' + id)
                .success(function (id) {
                    console.log("delete");
                    console.log(id);
                    $scope.listVisitors();
                })
        }

        $scope.setId = function (id) {
            $scope.id = id;
        };
    }]);