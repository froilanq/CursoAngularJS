var controlCajaApp = angular.module('controlCajaApp', ['ngRoute']);

controlCajaApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'ControlCajaCtrl',
            controllerAs: 'controlCaja',
            templateUrl: 'total.html'
        })
        .when('/nuevo', {
            controller: 'ControlCajaCtrl',
            controllerAs: 'controlCaja',
            templateUrl: 'nuevo.html'
        })
        .when('/lista', {
            controller: 'ControlCajaCtrl',
            controllerAs: 'controlCaja',
            templateUrl: 'lista.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});