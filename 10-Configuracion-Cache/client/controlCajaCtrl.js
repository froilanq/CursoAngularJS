(function () {
    var controlCajaCtrl = function (movimientosFactory, maestrosFactory, totalFactory, cfg, $http) {
        var scope = this;

        scope.titulo = "Controla tu Cash Flow";
        if (cfg.maestrosLocal) {
            $http.get('maestros.json').success(function (data) {
                scope.maestros = data;
            });
        } else {
            scope.maestros = maestrosFactory.get();
        }
        scope.nuevoMovimiento = {
            esIngreso: 1,
            esGasto: 0,
            importe: 0,
            fecha: new Date()
        };
        scope.total = {
            ingresos: 0,
            gastos: 0
        }

        scope.movimientos = movimientosFactory.query();
        scope.total = totalFactory.get();


        scope.funciones = {};
        scope.funciones.guardarMovimiento = function () {
            var auxCopyMov = angular.copy(scope.nuevoMovimiento);
            auxCopyMov.tipo = scope.funciones.tipo(auxCopyMov);
            var newMov = new movimientosFactory(auxCopyMov);
            newMov.$save();
            scope.movimientos = movimientosFactory.query();
            scope.total = totalFactory.get();
            scope.nuevoMovimiento.importe = 0;
        }
        scope.funciones.balance = function () {
            return scope.total.ingresos - scope.total.gastos
        }
        scope.funciones.tipo = function (movimiento) {
            return movimiento.esIngreso && 'Ingreso' || 'Gasto'
        }
    }
    controlCajaApp.controller('ControlCajaCtrl', ['movimientosFactory', 'maestrosFactory', 'totalFactory', 'cfg','$http', controlCajaCtrl]);
}());