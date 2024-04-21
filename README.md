1. POST /api/posts:
    URL: http://localhost:8000/api/posts
    Método: POST
    Cuerpo de la solicitud (en formato JSON):

    json

    {
      "title": "Título del post",
      "text": "Contenido del post",
      "author": "Autor del post"
    }

2. GET /api/posts:

    URL: http://localhost:8000/api/posts
    Método: GET

3. GET /api/posts/<id>:

    Reemplaza <id> con el ID real de un post existente en tu base de datos.
    Ejemplo de URL: http://localhost:8000/api/posts/123456789
    Método: GET

4. PATCH /api/posts/<id>:

    Reemplaza <id> con el ID real de un post existente en tu base de datos.
    Ejemplo de URL: http://localhost:8000/api/posts/123456789
    Método: PATCH
    Cuerpo de la solicitud (en formato JSON):

    json

        {
          "title": "Nuevo título del post"
        }

5. DELETE /api/posts/<id>:
    Reemplaza <id> con el ID real de un post existente en tu base de datos.
    Ejemplo de URL: http://localhost:8000/api/posts/123456789
    Método: DELETE


Instalar la bibliote uuid:npm install uuid
npm install jsonwebtoken
npm i dotenv libreria que busca un fichero en la raiz llamado dotenv, donde estan definidas las variable de entorno definidas al ejecutar el programa


1. POST /api/users:
    URL: http://localhost:8000/api/users
    Método: POST
    Cuerpo de la solicitud (en formato JSON):

    json

    {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "clave123",
    "bio": "Hola, soy Juan Pérez. Me gusta la programación y la tecnología."
    }

2. POST /api/login
    URL: http://localhost:8000/api/login
    Método: POST
    Cuerpo de la solicitud (en formato JSON):

    json

    {
        "email": "juan@example.com",
        "password": "clave123",
    }

    Para probar la autentificacion de postController.js:
    