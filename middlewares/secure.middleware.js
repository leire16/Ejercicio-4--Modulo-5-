const sessions = [];

module.exports.sessions = sessions;

module.exports.checkAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split("Bearer ")[1];

  const session = sessions.find((x) => x.token === token);

  if(!session){
    return res.status(401).json({ error: "unauthorized: session not found" });
  }

  next();
};

const jwt = require('jsonwebtoken');

module.exports.checkAuthJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Verifica si el encabezado de autorización está presente y tiene el formato correcto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "unauthorized: missing or invalid token" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    // Verifica el token JWT utilizando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Añade el ID de usuario decodificado a la solicitud
    next();
  } catch (err) {
    return res.status(401).json({ error: "unauthorized: invalid token" });
  }
};
