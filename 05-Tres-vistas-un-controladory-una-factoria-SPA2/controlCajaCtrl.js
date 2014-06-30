(function () {
    var controlCajaCtrl = function (movimientosFactory) {
        var scope = this;

        scope.titulo = "Controla tu Cash Flow";
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

        scope.movimientos = movimientosFactory.getMovimientos();
        scope.total = movimientosFactory.getTotal();

        scope.funciones = {};
        scope.funciones.guardarMovimiento = function () {
            var auxCopyMov = angular.copy(scope.nuevoMovimiento);
            auxCopyMov.tipo = scope.funciones.tipo(auxCopyMov);
            movimientosFactory.postMovimiento(auxCopyMov);
            scope.movimientos = movimientosFactory.getMovimientos();
            scope.total = movimientosFactory.getTotal();
            scope.nuevoMovimiento.importe = 0;
        }
        scope.funciones.balance = function () {
            return scope.total.ingresos - scope.total.gastos
        }
        scope.funciones.tipo = function (movimiento) {
            return movimiento.esIngreso && 'Ingreso' || 'Gasto'
        }
    }
    controlCajaApp.controller('ControlCajaCtrl', ['movimientosFactory', controlCajaCtrl]);
}());