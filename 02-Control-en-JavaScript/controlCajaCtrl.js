(function () {
    var controlCajaCtrl = function () {
        var scope = this;

        scope.titulo = "Controla tu Cash Flow";

        scope.total = {
            ingresos: 0,
            gastos: 0
        };

        scope.maestros = {
            categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
            categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
        };

        scope.nuevoMovimiento = {
            esIngreso: 1,
            esGasto: 0,
            importe: 0,
            fecha: new Date()
        };

        scope.movimientos = [];

        scope.funciones = {};
        scope.funciones.guardarMovimiento = function () {
            var auxCopyMov = angular.copy(scope.nuevoMovimiento);
            scope.total.ingresos += auxCopyMov.esIngreso * auxCopyMov.importe;
            scope.total.gastos += auxCopyMov.esGasto * auxCopyMov.importe;
            auxCopyMov.tipo = scope.funciones.tipo(auxCopyMov);
            scope.movimientos.push(auxCopyMov);
            scope.nuevoMovimiento.importe = 0;
        }
        scope.funciones.balance = function () {
            return scope.total.ingresos - scope.total.gastos
        }
        scope.funciones.tipo = function (movimiento) {
            return movimiento.esIngreso && 'Ingreso' || 'Gasto'
        }
    }

    //angular.module('controlCajaApp').controller('ControlCajaCtrl', controlCajaCtrl);
    controlCajaApp.controller('ControlCajaCtrl', controlCajaCtrl);
}());