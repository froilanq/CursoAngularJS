(function () {
    var movimientosFactory =   function ($resource)  {
        return $resource("/api/priv/movimientos/:id",{id: "@id" });
    };

    controlCajaApp.factory('movimientosFactory', ['$resource', movimientosFactory]);
}());

