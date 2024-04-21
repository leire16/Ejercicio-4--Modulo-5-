const User = require('../models/User');

const jwt = require('jsonwebtoken');

module.exports.createUser =(req, res) => {
    User.create(req.body)
    .then((user) =>{

        const token = jwt.sign({sub:user.id}, process.env.JWT_SECRET);

        const verifyURL = `http://localhost:8000/api/users/verify?token=${token}`;

        // Aquí se podria enviar un correo electrónico al usuario con el enlace de verificación
        console.log(`URL de verificación: ${verifyURL}`);

        res.status(201).json(user);
    })
    .catch((err)=>{
        res.status(400).json(err);
    });
};

module.exports.verify = (req, res) => {
    const token = req.query.token;

    try {

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Actualizar el campo "verified" del usuario a true
        User.findByIdAndUpdate(decoded.sub, { active: true },{new:true})
            .then((user) => {
                if (user) {
                    res.json(user);
                } else {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: "Error al actualizar el usuario" });
            });
    } catch (err) {
        res.status(500).json({ message: "Error al verificar el token" });
    }
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

        // Verificar si la cuenta está activada
        if (!user.active) {
            return res.status(401).json({ error: 'Cuenta no activada' });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ token });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
    });

};
