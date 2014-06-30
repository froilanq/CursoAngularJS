(function () {

    var maestrosFactory =   function ($http)  {
        var urlBase = "http://localhost:3000/api/";
        
        var factory  =   {};
        
        factory.getMaestros =   function ()  {
            return $http.get(urlBase+'pub/maestros');  
        };

        return factory;
    };

    controlCajaApp.factory('maestrosFactory', ['$http',maestrosFactory]);
}());