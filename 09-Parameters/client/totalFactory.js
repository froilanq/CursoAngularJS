(function () {
    var totalFactory =   function ($resource)  {
        return $resource("/api/priv/total/");
    };

    controlCajaApp.factory('totalFactory', ['$resource', totalFactory]);
}());