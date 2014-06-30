(function () {

    var maestrosFactory =   function ($resource)  {
        return $resource("/api/pub/maestros/", {}, {get: {cache: true}});
    };

    controlCajaApp.factory('maestrosFactory', ['$resource', maestrosFactory]);
}());