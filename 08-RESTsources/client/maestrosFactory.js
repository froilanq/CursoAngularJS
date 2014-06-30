(function () {

    var maestrosFactory =   function ($resource)  {
        return $resource("/api/pub/maestros/");
    };

    controlCajaApp.factory('maestrosFactory', ['$resource', maestrosFactory]);
}());