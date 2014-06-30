(function () {
    var controlCajaCtrl = function (movimientosFactory, maestrosFactory) {
        var scope = this;

        scope.titulo = "Controla tu Cash Flow";

        maestrosFactory.getMaestros().success(function (data) {
            scope.maestros = data;
        });

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

        movimientosFactory.getMovimientos().success(function (data) {
            scope.movimientos = data;
        });
        movimientosFactory.getTotal().success(function (data) {
            scope.total = data;
        });

        scope.funciones = {};
        scope.funciones.guardarMovimiento = function () {
            var auxCopyMov = angular.copy(scope.nuevoMovimiento);
            auxCopyMov.tipo = scope.funciones.tipo(auxCopyMov);
            movimientosFactory.postMovimiento(auxCopyMov);
            movimientosFactory.getMovimientos().success(function (data) {
                scope.movimientos = data;
            });
            movimientosFactory.getTotal().success(function (data) {
                scope.total = data;
            });
            scope.nuevoMovimiento.importe = 0;
        }
        scope.funciones.balance = function () {
            return scope.total.ingresos - scope.total.gastos
        }
        scope.funciones.tipo = function (movimiento) {
            return movimiento.esIngreso && 'Ingreso' || 'Gasto'
        }
    }
    controlCajaApp.controller('ControlCajaCtrl', ['movimientosFactory', 'maestrosFactory', controlCajaCtrl]);
}());