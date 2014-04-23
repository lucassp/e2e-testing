var e2eTesting = angular.module("e2e", ["ngRoute"]);

e2eTesting.config(["$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix("!");
        $routeProvider
            .when("/", {
                templateUrl: "templates/todos.html",
                controller: "TodosCtrl"
            })
            .when("/edit/:id", {
                templateUrl: "templates/todo.html",
                controller: "EditTodoCtrl"
            })
            .when("/add", {
                templateUrl: "templates/todo.html",
                controller: "AddTodoCtrl"
            });
    }
]);

e2eTesting.factory("todos", ["$http",
    function ($http) {
        return {
            getTodos: function () {
                return $http.get("/todos");
            },
            getTodo: function (id) {
                return $http.get("/todos/" + id);
            },
            saveTodo: function (data) {
                return $http.post("/todos", data);
            },
            updateTodo: function (data) {
                return $http.put("/todos/" + data.id, data);
            },
            deleteTodo: function (data) {
                return $http.delete("/todos/" + data.id);
            }
        }
    }
]);

e2eTesting.controller("TodosCtrl", ["$scope", "todos",
    function ($scope, todos) {

        function init() {
            todos.getTodos().then(function (data) {
                $scope.todos = data.data;
            });
        }

        $scope.deleteTodo = function (todo) {
            todos.deleteTodo(todo).then(init);
        };

        init();
    }
]);

e2eTesting.controller("AddTodoCtrl", ["$scope", "todos", "$location",
    function ($scope, todos, $location) {
        $scope.save = function () {
            todos.saveTodo($scope.formData)
                .then(function () {
                    $location.url("/");
                });
        };
    }
]);

e2eTesting.controller("EditTodoCtrl", ["$scope", "todos", "$location", "$routeParams",
    function ($scope, todos, $location, $routeParams) {

        $scope.save = function () {
            todos.updateTodo($scope.formData)
                .then(function () {
                    $location.url("/");
                });
        };

        todos.getTodo($routeParams.id).then(function (data) {
            $scope.formData = data.data;
        });
    }
]);