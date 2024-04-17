const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');
const user = require('../controllers/userController');
const { checkAuth,checkAuthJWT } = require("../middlewares/secure.middleware");

router.post('/api/posts', checkAuth, post.createPost); // Crear un nuevo post
router.get('/api/posts', checkAuth, post.getPosts); // Obtener todos los posts
router.get('/api/posts/:id', checkAuth, post.getPostById); // Obtener un post por su ID
router.patch('/api/posts/:id', checkAuth, post.updatePost); // Actualizar un post por su ID
router.delete('/api/posts/:id', checkAuth, post.deletePost); // Eliminar un post por su ID

// Nuevos endpoints para el controlador de usuario
router.post('/api/users', user.createUser); // Crear un nuevo usuario
router.get('/api/list', checkAuthJWT, user.list); // Encontrar el usuario agregado
router.post('/api/login', user.loginUser); // Iniciar sesión de usuario

module.exports = router;