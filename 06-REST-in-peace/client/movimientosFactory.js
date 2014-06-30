(function () {

    var movimientosFactory =   function ($http)  {
        var urlBase = "http://localhost:3000/api/";

        var factory  =   {};

        factory.getMovimientos =   function ()  {
            return $http.get(urlBase + 'priv/movimientos');
        };
        factory.getTotal =   function ()  {
            return $http.get(urlBase + 'priv/total');
        };
        factory.postMovimiento =   function (movimiento)  {
            return $http.post(urlBase + 'priv/movimientos', movimiento);
        };
        return factory;
    };

    controlCajaApp.factory('movimientosFactory', ['$http', movimientosFactory]);
}());