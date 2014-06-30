(function () {
    var registroCtrl = function ($scope,$rootScope, $location, $http, $cookieStore) {
        var urlBase = "http://localhost:3000/api/";
        $scope.funciones={};
        $scope.usuario={};
        
        
        $scope.funciones.login = function(){
           $http.post(urlBase+'sesiones/',$scope.usuario).success(function (data) {
               $rootScope.nombre=$scope.usuario.email;
               $rootScope.mensaje='recién entrado';
               $cookieStore.put("sessionId", data);
               $location.path("/");
            });
        }
        $scope.funciones.registro = function(){
            $http.post(urlBase+'usuarios/',$scope.usuario).success(function (data) {
                $rootScope.nombre=$scope.usuario.email;
                $rootScope.mensaje='recién creado';
                $cookieStore.put("sessionId", data);
                $location.path("/");
            });
        }
        
    }
    
    controlCajaApp.controller('RegistroCtrl', ['$scope','$rootScope' ,'$location', '$http', '$cookieStore', registroCtrl]);
}());