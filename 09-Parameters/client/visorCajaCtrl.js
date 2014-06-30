(function () {
    var visorCajaCtrl = function ($routeParams, movimientosFactory) {
        var scope = this;
            var movId = $routeParams.movId;
            scope.movimiento = movimientosFactory.get({id:movId});
        }
    
    controlCajaApp.controller('VisorCajaCtrl', ['$routeParams','movimientosFactory', visorCajaCtrl]);
}());