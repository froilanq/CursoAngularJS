(function () {
    var movimientosFactory =   function ($resource)  {
        return $resource("/api/priv/movimientos/");
    };

    controlCajaApp.factory('movimientosFactory', ['$resource', movimientosFactory]);
}());

