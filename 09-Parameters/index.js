var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
console.log('ready');

var usuarios = [];
var sesiones = [];

var movimientos = [];
var maxId = 0;
var total = {
    ingresos: 0,
    gastos: 0
}


// Middleware para acceso a recursos estáticos
app.use(express.static(__dirname + '/client'));

// Middleware de validación de sesiones
app.use('/api/priv/', function (req, res, next) {
    var sessionId = req.get('sessionId');
    var sesionEncontrada = sesiones.filter(function (sesion) {
        return sesion.sessionId == sessionId;
    })[0];
    if (sesionEncontrada) {
        if ((new Date() - sesionEncontrada.timeStamp) > 20 * 60 * 1000) {
            console.log('Sesión caducada:' + JSON.stringify(sesionEncontrada));
            res.send(419, 'Sesión caducada');
        } else {
            sesionEncontrada.timeStamp = new Date();
        }
    } else {
        res.send(401, 'Credencial inválida');
    }
    next();
});


// Gestión de usuarios: Lista y registro
app.route('/api/usuarios/')
    .get(function (req, res, next) {
        res.json(usuarios);
    }).post(function (req, res, next) {
        var email = req.body.email;
        if (!usuarios.some(function (usuario) {
            return usuario.email == email;
        })) {
            var password = req.body.password;
            var usuario = {
                email: email,
                password: password
            };
            usuarios.push(usuario);
            res.json(newSession(email));
        } else {
            console.log('email ya registrado:' + email);
            res.send(409, 'email ' + email + ' ya registrado');
        }
    });

// Gestión de sesiones: listado y login
app.route('/api/sesiones')
    .get(function (req, res, next) {
        res.json(sesiones);
    }).post(function (req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        var usuarioValidado = usuarios.filter(function (usuario) {
            return usuario.email == email && usuario.password == password;
        })[0];
        if (usuarioValidado) {
            res.json(newSession(email));
        } else {
            console.log('Credencial inválida:' + email);
            res.send(401, 'Credencial inválida');
        }
    });

// funcion auxiliar para crear una nueva sesión
function newSession(email) {
    var sessionId = Math.random() * (88888) + 11111;
    var timeStamp = new Date();
    sesiones.push({
        sessionId: sessionId,
        email: email,
        timeStamp: timeStamp
    });
    return sessionId;
}


app.get('/api/pub/maestros', function (req, res, next) {
    var maestros = {
        categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
        categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
    };
    res.json(maestros);
});


app.get('/api/priv/movimientos/:id', function (req, res, next) {
    var movId = req.params.id;
    var movimientoBuscado = movimientos.filter(function (movimiento) {
            return movimiento.id == movId;
        })[0];
    res.json(movimientoBuscado);
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
        maxId++;
        var movimiento = {
            id: maxId,
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