const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const jwt = require('jsonwebtoken'); // Requiere instalar el paquete 'jsonwebtoken'

const { sessions } = require('../middlewares/secure.middleware');

module.exports.createUser =(req, res) => {
    User.create(req.body)
    .then((user) =>{
        res.status(201).json(user);
    })
    .catch((err)=>{
        res.status(400).json(err);
    });
};

module.exports.list = (req,res) =>{
    User.find()
    .then((users) =>{
        res.status(200).json(users);
    })
    .catch((err) =>{
        res.status(400).json(err);
    });
}

module.exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Validar los datos de entrada
    if (!email || !password) {
        return res.status(400).json({ error: 'Se requieren tanto el email como la contraseña' });
    }

    User.findOne({ email, password })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }

            // Generar un token JWT
            const token = jwt.sign({ userId: user._id }, 'secretKey'); // Reemplaza 'secretKey' con tu clave secreta

            res.status(200).json({ token });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
        });
};
