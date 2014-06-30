(function () {
    var menuCtrl = function ($location) {
        this.funciones = {};
        this.funciones.isActive = function (ruta) {
            return ruta === $location.path();
        }
    }
    controlCajaApp.controller('MenuCtrl',['$location', menuCtrl]);
}());