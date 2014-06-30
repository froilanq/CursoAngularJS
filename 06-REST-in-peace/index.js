var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
console.log('ready');

var movimientos = [];
var total = {
    ingresos: 0,
    gastos: 0
}


// Middleware para acceso a recursos estáticos
app.use(express.static(__dirname + '/client'));



app.get('/api/pub/maestros', function (req, res, next) {
    var maestros = {
        categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
        categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
    };
    res.json(maestros);
});



app.route('/api/priv/movimientos')
    .get(function (req, res, next) {
        res.json(movimientos);
    }).post(function (req, res, next) {
        var reqBody = req.body;
        var reqImporte = reqBody.importe;
        var reqFecha = reqBody.fecha;
        var reqTipo = reqBody.tipo;
        var reqCategoria = reqBody.categoria;
        var movimiento = {
            importe: reqImporte,
            fecha: reqFecha,
            tipo: reqTipo,
            categoria: reqCategoria
        };
        movimientos.push(movimiento);
        if (movimiento.tipo == 'Ingreso')
            total.ingresos += movimiento.importe;
        else
            total.gastos += movimiento.importe;
        res.status(200);
    });
app.get('/api/priv/total', function (req, res, next) {
    res.json(total);
});

// Página de prueba
app.get('/test', function (req, res, next) {
    res.send('<h1>Flujo de caja</h1><p>NodeJS y Express funcionan</p>');
});

console.log('steady');
app.listen(3000);
console.log('go');