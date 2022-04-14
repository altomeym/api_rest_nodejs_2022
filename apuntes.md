# API REST Nodejs desde cero usando MongoDB o MySQL
+ [Curso en Udemy](https://www.udemy.com/course/api-rest-nodejs-desde-cero-usando-mongodb-o-mysql)
+ [Mi repositorio en GitHub](https://github.com/petrix12/api_rest_nodejs_2022.git)
+ [Repositorio del autor](https://github.com/leifermendez/curso-node-api-js)
+ [Node.js](https://nodejs.org)
+ [Visual Studio Code](https://code.visualstudio.com)
+ [Git](https://git-scm.com/downloads)
+ [Atlas MongoDB](https://www.mongodb.com/atlas/database)
+ [Express.js](https://expressjs.com)


## Antes de iniciar:
1. Crear proyecto en la página de [GitHub](https://github.com) con el nombre: **api_rest_nodejs_2022**.
    + **Description**: Proyecto para seguir el curso de "API REST Nodejs desde cero usando MongoDB o MySQL", creado por Leifer Mendez en Udemy.
    + **Public**.
2. En la ubicación raíz del proyecto en la terminal de la máquina local:
    + $ git init
    + $ git add .
    + $ git commit -m "Antes de iniciar"
    + $ git branch -M main
    + $ git remote add origin https://github.com/petrix12/api_rest_nodejs_2022.git
    + $ git push -u origin main


## Sección 1: Introducción
### 1. Introducción
+ **Repositorio**: https://github.com/leifermendez/curso-node-api-js
+ **Contenido**: presentación del curso.

### 2. Expectativas del curso
+ **Contenido**: sobre Node.js y expectativas del curso.

### 3. Entorno de Trabajo (Preparación)
1. Requerimientos:
    + [Node.js](https://nodejs.org)
    + [Visual Studio Code](https://code.visualstudio.com)
    + [Git](https://git-scm.com/downloads)

### 4. Entorno MongoDB
+ https://www.mongodb.com/atlas/database
1. Crear una cuenta en MongoDB Atlas para luego crear un servicio de base de datos MongoDB.
2. Obtener la cádena de conexión:
    + Click en **Database**.
    + Click en **Connect**.
    + Click en **Connect your application**.
    + Copiar cádena de conexión:
        + mongodb+srv://petrix:<password>@cluster0.hrqzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
        + Donde se deberá reemplazar:
            + <'password'>: password
            + myFirstDatabase: nombre de la base de datos

## Sección 2: Iniciando Proyecto
### 5. Iniciando
1. Crear carpeta **node** para iniciar un proyecto y en la raíz de esta ejecutar:
    + $ npm init --y
    + $ npm install express --save
    + $ npm i cors dotenv multer -S
2. Crear **node\\.gitignore**:
    ```gitignore
    node_modules/
    .env
    ```
3. Crear archivo **node\app.js**:
    ```js
    require('dotenv').config()
    const express = require('express')
    const cors = require('cors')
    const app = express()

    app.use(cors())

    const port = process.env.PORT || 3000

    app.listen(port, () => {
        console.log('Tu app esta lista por http://localhost:' + port)
    })
    ```
4. Ejecutar:
    + $ node app.js
5. Crear archivo **node\\.env.example**:
    ```env
    PORT=3000
    ```
6. Crear archivo **node\\.env**:
    ```env
    PORT=3001
    ```

### 6. Scaffold (Estructura de proyecto)
1. Crear la siguiente estructura de carpetas en el proyecto **node**:
    + $ mkdir models
    + $ mkdir controllers
    + $ mkdir routes
    + $ mkdir config
    + $ mkdir utils
    + $ mkdir storage
2. Instalar Mongoose:
    + $ npm i mongoose -S
3. Crear archivo de configuración **node\config\mongo.js**:
    ```js
    const mongoose = require('mongoose')

    const dbConnect = () => {
        const DB_URI = process.env.DB_URI
        mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, res) => {
            if(!err) {
                console.log('*** CONEXIÓN EXITOSA ***')
            } else {
                console.log('*** ERROR DE CONEXIÓN ***')
            }
        })
    }

    module.exports = dbConnect
    ```
4. Modificar **node\\.env.example**:
    ```env
    ≡
    DB_URI=mongodb+srv://petrix:<password>@cluster0.hrqzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    ```
5. Modificar **node\\.env**:
    ```env
    ≡
    DB_URI=mongodb+srv://petrix:Q80hlUftAABIVrv5@cluster0.hrqzg.mongodb.net/dbapi?retryWrites=true&w=majority
    ```
6. Modificar **node\app.js**:
    ```js
    ≡
    const dbConnect = require('./config/mongo')
    const app = express()
    ≡
    dbConnect()
    ```

### 7. Modelos (MongoDB)
1. Crear modelo **node\models\nosql\users.js**:
    ```js
    const mongoose = require('mongoose')

    const UserScheme = new mongoose.Schema(
        {
            name: {
                type: String
            },
            age: {
                type: Number
            },
            email: {
                type: String,
                unique: true
            },
            passwor: {
                type: String,
            },
            role: {
                type: ['user', 'admin'],
                default: 'user'
            }
        },
        {
            timestamps: true,    // TODD createdAt, updatedAt
            versionKey: false
        }
    )

    module.exports = mongoose.model('users', UserScheme)
    ```
2. Crear modelo **node\models\nosql\storage.js**:
    ```js
    const mongoose = require('mongoose')

    const StorageSchema = new mongoose.Schema(
        {
            url: {
                type: String
            },
            filename: {
                type: String
            }
        },
        {
            timestamps: true,    // TODD createdAt, updatedAt
            versionKey: false
        }
    )

    module.exports = mongoose.model('storages', StorageSchema)
    ```
3. Crear modelo **node\models\nosql\tracks.js**:
    ```js
    const mongoose = require('mongoose')

    const TracksSchema = new mongoose.Schema(
        {
            name: {
                type: String
            },
            album: {
                type: String
            },
            cover: {
                type: String,
                validate: {
                    validator: (req) => {
                        return true
                    },
                    message: "ERROR_URL"
                }
            },
            artist: {
                name: {
                    type: String
                },
                nickname: {
                    type: String,
                },
                nationality: {
                    type: String
                }
            },
            duration: {
                start: {
                    type: Number
                },
                end: {
                    type: Number
                }
            },
            mediaId: {
                type: mongoose.Types.ObjectId
            }
        },
        {
            timestamps: true,    // TODD createdAt, updatedAt
            versionKey: false
        }
    )

    module.exports = mongoose.model('tracks', TracksSchema)
    ```

### 8. Rutas
1. Crear archivo de rutas principal **node\routes\index.js**:
    ```js
    const express = require('express')
    const fs = require('fs')
    const router = express.Router()

    const PATH_ROUTES = __dirname

    const removeExtension = (fileName) => {
        //TODO tracks.js [tracks, js]
        return fileName.split('.').shift()
    }

    const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
        const name = removeExtension(file)
        if(name !== 'index') {
            router.use(`/${name}`, require(`./${file}`))
        }
    })

    // console.log({a})

    module.exports = router
    ```
2. Crear archivo de rutas **node\routes\tracks.js**:
    ```js
    const express = require('express')
    const router = express.Router()

    // TODO http://localhost/tracks     GET, POST, DELETE, PUT

    router.get('/', (req, res) => {
        const data = ['Soluciones', '++']
        res.send({data})
    })

    module.exports = router
    ```
3. Modificar **node\app.js**:
    ```js
    ≡
    const port = process.env.PORT || 3000

    // invocación de Rutas
    app.use('/api', require('./routes'))

    app.listen(port, () => {
        console.log('Tu app esta lista por http://localhost:' + port)
    })
    ≡
    ```
4. Instalar Nodemon:
    + $ npm i nodemon -g
5. Modificar **node\package.json**:
    ```json
    ≡
    "scripts": {
        "start": "node ./app.js",
        "dev": "nodemon ./app.js",
        ≡
    },
    ≡
    ```

### 9. Controladores
1. Crear controlador **node\controllers\tracks.js**:
    ```js
    const { tracksModel } = require('../models')

    /**
    * Obtener lista de la base de datos
    * @param {*} req 
    * @param {*} res 
    */
    const getItems = async (req, res) => {
        const data = await tracksModel.find({})
        res.send({data})
    }

    /**
    * Obtener un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const getItem = (req, res) => {}

    /**
    * Insertar un registro o documento a la lista
    * @param {*} req 
    * @param {*} res 
    */
    const createItem = async (req, res) => {
        const { body } = req
        console.log(body)
        const data = await tracksModel.create(body)
        res.send({data})
    }

    /**
    * Actualizar un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const updateItem = (req, res) => {
    }

    /**
    * Eliminar un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const deleteItem = (req, res) => {}

    module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
    ```
2. Modificar archivo de rutas **node\routes\tracks.js**:
    ```js
    const express = require('express')
    const router = express.Router()
    const { getItems, getItem, createItem } = require('../controllers/tracks')

    router.get('/', getItems)
    // router.get('/:id', getItem)
    router.post('/', createItem)

    module.exports = router
    ```
3. Crear administrador de modelos **node\models\index.js**:
    ```js
    const models = {
        usersModel: require('./nosql/users'),
        tracksModel: require('./nosql/tracks'),
        storageModel: require('./nosql/storage')
    }

    module.exports = models
    ```
4. Realizar petición http:
    + URL: http://localhost:3001/api/tracks
    + Método: GET
5. Modificar **node\app.js**:
    ```js
    ≡
    app.use(cors())
    app.use(express.json())
    ≡
    ```
6. Realizar petición http:
    + URL: http://localhost:3001/api/tracks
    + Método: POST
    + Body:
        ```json
        {
            "name":"Eminem - Without Me (Official Music Video)",
            "album":"Eminem",
            "cover":"https://cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/350x350.jpg",
            "artist":{
                "name":"Eminem",
                "nickname":"Eminem",
                "nationality":"US"
            },
            "duration":{
                "start":1,
                "end":0
            },
            "mediaId":"62271512ee5081a7027e636a"
        }
        ```

### 10. Cargar archivo (Upload)
1. Crear archivo de rutas **node\routes\storage.js**:
    ```js
    const express = require('express')
    const router = express.Router()
    const uploadMiddleware = require('../utils/handleStorage')
    const { getItems, getItem, createItem } = require('../controllers/storage')

    router.post('/', uploadMiddleware.single('myfile'), createItem)


    module.exports = router
    ```
2. Crear **node\utils\handleStorage.js**:
    ```js
    const multer = require('multer')

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const pathStorage = `${__dirname}/../storage`
            cb(null, pathStorage)
        },
        filename: function(req, file, cb) {
            const ext = file.originalname.split('.').pop()
            const filename = `file-${Date.now()}.${ext}`
            cb(null, filename)
        }
    })

    const uploadMiddleware = multer({ storage })

    module.exports = uploadMiddleware
    ```
3. Crear controlador **node\controllers\storage.js**:
    ```js
    const { storageModel } = require('../models')
    const PUBLIC_URL = process.env.PUBLIC_URL

    /**
    * Obtener lista de la base de datos
    * @param {*} req 
    * @param {*} res 
    */
    const getItems = async (req, res) => {
        const data = await storageModel.find({})
        res.send({data})
    }

    /**
    * Obtener un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const getItem = (req, res) => {}

    /**
    * Insertar un registro o documento a la lista
    * @param {*} req 
    * @param {*} res 
    */
    const createItem = async (req, res) => {
        const { body, file } = req
        console.log(file)
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    }

    /**
    * Actualizar un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const updateItem = (req, res) => {
    }

    /**
    * Eliminar un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const deleteItem = (req, res) => {}

    module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
    ```
4. Modificar **node\app.js**:
    ```js
    ≡
    app.use(express.json())
    app.use(express.static('storage'))
    ≡
    ```
5. Modificar **node\\.env**:
    ```env
    ≡
    PUBLIC_URL=http://localhost:3001
    ```
6. Modificar **node\.env.example**:
    ```env
    ≡
    PUBLIC_URL=http://localhost:3001
    ```
7. Realizar petición http:
    + URL: http://localhost:3001/api/storage
    + Método: POST
    + Body (Form o form-data): en form data crear Key **myfile** tipo File y adjuntar cualquier archivo.

### 11. Postman
+ https://www.postman.com/downloads
+ **Contenido**: sobre la administración y publicación de peticiones y su documentación en Postman.

### 12. Validación de datos
1. Instalar Express Validator:
    + $ npm i express-validator --save
2. Crear validator **node\validators\tracks.js**:
    ```js
    const { check } = require('express-validator')
    const validateResults = require('../utils/handleValidator')

    const validatorCreateItem = [
        check("name")
            .exists()
            .notEmpty(),
        check("album")
            .exists()
            .notEmpty(),
        check("cover")
            .exists()
            .notEmpty(),
        check("artist")
            .exists()
            .notEmpty(),
        check("artist.name")
            .exists()
            .notEmpty(),
        check("artist.nickname")
            .exists()
            .notEmpty(),
        check("artist.nationality")
            .exists()
            .notEmpty(),
        check("duration")
            .exists()
            .notEmpty(),
        check("duration.start")
            .exists()
            .notEmpty(),
        check("duration.end")
            .exists()
            .notEmpty(),
        check("mediaId")
            .exists()
            .notEmpty()
            .isMongoId(),
        (req, res, next) => {
            return validateResults(req, res, next)
        }
    ]

    module.exports = { validatorCreateItem }
    ```
3. Crear **node\utils\handleValidator.js**:
    ```js
    const { validationResult } = require("express-validator")

    const validateResults = (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()   //TODO Continua hacia el controlador!
        } catch (err) {
            res.status(403)
            res.send({ errors: err.array() })
        }
    }

    module.exports = validateResults
    ```
4. Modificar archivo de rutas **node\routes\tracks.js**:
    ```js
    const express = require('express')
    const router = express.Router()
    const { validatorCreateItem } = require('../validators/tracks')
    const { getItems, getItem, createItem } = require('../controllers/tracks')

    router.get('/', getItems)
    router.post('/', validatorCreateItem, createItem)

    module.exports = router
    ```
5. Realizar petición http:
    + URL: http://localhost:3001/api/tracks
    + Método: POST
    + Body:
        ```json
        {
            "name":"Prueba 2",
            "album":"Eminem",
            "cover":"https://cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/350x350.jpg",
            "artist":{
                "name":"Eminem",
                "nickname":"Eminem",
                "nationality":"US"
            },
            "duration":{
                "start":1,
                "end":0
            },
            "mediaId":"62271512ee5081a7027eeeea"
        }
        ```

### 13. Middleware
1. Crear middleware **node\middleware\customHeader.js**:
    ```js
    const customHeader = (req, res, next) => {
        try {
            /* console.log('HEADERS DE LA PETICIÓN', req.headers)
            console.log('BODY DE LA PETICIÓN', req.body) */
            const apiKey = req.headers.api_key
            if(apiKey === 'petrix12') {
                next()
            } else {
                res.status(403)
                res.send({error: 'API_KEY_NO_ES_CORRECTA'})
            }
        } catch(e) {
            res.status(403)
            res.send({error: 'ALGO_OCURRIO_EN_EL_CUSTOM_HEADER'})
        }
    }

    module.exports = customHeader
    ```
2. Modificar archivo de rutas **node\routes\tracks.js**:
    ```js
    const express = require('express')
    const router = express.Router()
    const customHeader = require('../middleware/customHeader')
    const { validatorCreateItem } = require('../validators/tracks')
    const { getItems, getItem, createItem } = require('../controllers/tracks')

    router.get('/', getItems)
    router.post('/', validatorCreateItem, customHeader, createItem)

    module.exports = router
    ```
3. Realizar petición http:
    + URL: http://localhost:3001/api/tracks
    + Método: POST
    + Headers:
        ```json
        {
            "api_key": "petrix12"
        }
        ```
    + Body:
        ```json
        {
            "name":"Prueba 3",
            "album":"Eminem",
            "cover":"https://cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/350x350.jpg",
            "artist":{
                "name":"Eminem",
                "nickname":"Eminem",
                "nationality":"US"
            },
            "duration":{
                "start":1,
                "end":0
            },
            "mediaId":"62271512ee5081a7027eeeea"
        }
        ```


## Sección 3: CRUD (Create - Read - Update - Delete)
### 14. Capturar errores
+ https://www.webfx.com/web-development/glossary/http-status-codes
1. Crear handle **node\utils\handleError.js**:
    ```js
    const handleHttpError = (res, message = "Algo sucedio", code = 403) => {
        res.status(code)
        res.send({ error: message })
    }

    module.exports = { handleHttpError }
    ```
2. Modificar controlador **node\controllers\tracks.js**:
    ```js
    ≡
    const { handleHttpError } = require('../utils/handleError')

    ≡
    const getItems = async (req, res) => {
        try {
            const data = await tracksModel.find({})
            res.send({data})
        } catch(e) {
            handleHttpError(res, 'ERROR_GET_ITEMS')
        }
    }
    ≡
    const createItem = async (req, res) => {
        try {
            const body = matchedData(req)
            const data = await tracksModel.create(body)
            res.send({ data })
        } catch(e) {
            handleHttpError(res, 'ERROR_CREATE_ITEMS')
        }
    }
    ≡
    ```
3. Modificar archivo de rutas **node\routes\tracks.js**:
    ```js
    const express = require('express')
    const router = express.Router()
    const { validatorCreateItem } = require('../validators/tracks')
    const { getItems, getItem, createItem } = require('../controllers/tracks')

    router.get('/', getItems)
    router.post('/', validatorCreateItem, createItem)

    module.exports = router
    ```
4. Realizar petición http:
    + URL: http://localhost:3001/api/tracks
    + Método: POST
    + Body:
        ```json
        {
            "otro": "valor",
            "dato": "basura",
            "name":"Prueba 4",
            "album":"Eminem",
            "cover":"https://cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/350x350.jpg",
            "artist":{
                "name":"Eminem",
                "nickname":"Eminem",
                "nationality":"US"
            },
            "duration":{
                "start":1,
                "end":0
            },
            "mediaId":"62271512ee5081a7027eeeea"
        }
        ```

### 15. CRUD
1. Modificar controlador **node\controllers\tracks.js**:
    ```js
    const { matchedData } = require('express-validator')
    const { tracksModel } = require('../models')
    const { handleHttpError } = require('../utils/handleError')

    /**
    * Obtener lista de la base de datos
    * @param {*} req 
    * @param {*} res 
    */
    const getItems = async (req, res) => {
        try {
            const data = await tracksModel.find({})
            res.send({data})
        } catch(e) {
            handleHttpError(res, 'ERROR_GET_ITEMS')
        }
    }

    /**
    * Obtener un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const getItem = async (req, res) => {
        try {
            req = matchedData(req)
            const { id } = req
            const data = await tracksModel.findById(id)
            res.send({ data })
        } catch(e) {
            handleHttpError(res, 'ERROR_GET_ITEM')
        }
    }

    /**
    * Insertar un registro o documento a la lista
    * @param {*} req 
    * @param {*} res 
    */
    const createItem = async (req, res) => {
        try {
            const body = matchedData(req)
            const data = await tracksModel.create(body)
            res.send({ data })
        } catch(e) {
            handleHttpError(res, 'ERROR_CREATE_ITEMS')
        }
    }

    /**
    * Actualizar un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const updateItem = async (req, res) => {
        try {
            const {id, ...body} = matchedData(req)
            const data = await tracksModel.findOneAndUpdate(id, body)
            res.send({ data })
        } catch(e) {
            handleHttpError(res, 'ERROR_UPDATE_ITEMS')
        }
    }

    /**
    * Eliminar un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const deleteItem = async (req, res) => {
        try {
            req = matchedData(req)
            const { id } = req
            const data = await tracksModel.deleteOne({_id:id})
            res.send({ data })
        } catch(e) {
            handleHttpError(res, 'ERROR_DELETE_ITEM')
        }
    }

    module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
    ```
2. Modificar archivo de rutas **node\routes\tracks.js**:
    ```js
    const express = require('express')
    const router = express.Router()
    const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')
    const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks')

    router.get('/', getItems)
    router.get('/:id', validatorGetItem, getItem)
    router.post('/', validatorCreateItem, createItem)
    router.put('/:id', validatorGetItem, validatorCreateItem, updateItem)
    router.delete('/:id', validatorGetItem, deleteItem)

    module.exports = router
    ```
3. Modificar validator **node\validators\tracks.js**:
    ```js
    ≡
    const validatorGetItem = [
        check("id")
            .exists()
            .notEmpty()
            .isMongoId(),
        (req, res, next) => {
            return validateResults(req, res, next)
        }
    ];

    module.exports = { validatorCreateItem, validatorGetItem }
    ```
4. Realizar petición http:
    + URL: http://localhost:3001/api/tracks
    + Método: GET
5. Realizar petición http:
    + URL: http://localhost:3001/api/tracks/62575746f7af8bb840b8a7f2
    + Método: GET
6. Realizar petición http:
    + URL: http://localhost:3001/api/tracks/62575746f7af8bb840b8a7f2
    + Método: PUT
    + Body:
        ```json
        {
            "otro": "valor",
            "dato": "basura",
            "name":"Prueba 2 Actualizado",
            "album":"Eminem",
            "cover":"https://cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/350x350.jpg",
            "artist":{
                "name":"Eminem",
                "nickname":"Eminem",
                "nationality":"US"
            },
            "duration":{
                "start":1,
                "end":0
            },
            "mediaId":"62271512ee5081a7027eeeea"
        }
        ```
7. Realizar petición http:
    + URL: http://localhost:3001/api/tracks/62575746f7af8bb840b8a7f2
    + Método: DELETE

### 16. Soft Delete (Eliminado Lógico)
+ https://www.npmjs.com/package/mongoose-delete
1. Ejecutar:
    + $ npm i mongoose-delete -S
2. Modificar modelo **node\models\nosql\tracks.js**:
    ```js
    const mongoose = require('mongoose')
    const mongooseDelete = require('mongoose-delete')
    ≡
    TracksSchema.plugin(mongooseDelete, { overrideMethods: 'all'})
    module.exports = mongoose.model('tracks', TracksSchema)
    ```
3. Modificar modelo **node\models\nosql\storage.js**:
    ```js
    const mongoose = require('mongoose')
    const mongooseDelete = require('mongoose-delete')
    ≡
    StorageSchema.plugin(mongooseDelete, { overrideMethods: 'all'})
    module.exports = mongoose.model('tracks', TracksSchema)
    ```
4. Modificar modelo **node\models\nosql\users.js**:
    ```js
    const mongoose = require('mongoose')
    const mongooseDelete = require('mongoose-delete')
    ≡
    UserScheme.plugin(mongooseDelete, { overrideMethods: 'all'})
    module.exports = mongoose.model('tracks', TracksSchema)
    ```

### 17. Controlador de Archivos
1. Modificar controlador **node\controllers\storage.js**:
    ```js
    const fs = require('fs')
    const { matchedData } = require('express-validator')
    const { storageModel } = require('../models')
    const { handleHttpError } = require('../utils/handleError')

    const PUBLIC_URL = process.env.PUBLIC_URL
    const MEDIA_PATH = `${__dirname}/../storage`

    /**
    * Obtener lista de la base de datos
    * @param {*} req 
    * @param {*} res 
    */
    const getItems = async (req, res) => {
        try {
            const { id } = matchedData(req)
            const data = await storageModel.find(id)
            res.send({data})
        } catch (e) {
            handleHttpError(res, 'ERROR_GET_ITEMS')
        }
    }

    /**
    * Obtener un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const getItem = async (req, res) => {
        try {
            const { id } = matchedData(req)
            const data = await storageModel.findById(id)
            res.send({ data })
        } catch (e) {
            handleHttpError(res, 'ERROR_GET_ITEM')
        }
    }

    /**
    * Insertar un registro o documento a la lista
    * @param {*} req 
    * @param {*} res 
    */
    const createItem = async (req, res) => {
        try {
            const { file } = req
            const fileData = {
                filename: file.filename,
                url: `${PUBLIC_URL}/${file.filename}`
            }
            const data = await storageModel.create(fileData)
            res.send({data})
        } catch (e) {
            handleHttpError(res, 'ERROR_CREATE_ITEM')
        }
    }

    /**
    * Actualizar un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const updateItem = async (req, res) => {
        try {
        } catch (e) {
            handleHttpError(res, 'ERROR_UPDATE_ITEM')
        }
    }

    /**
    * Eliminar un registro o documento de la lista
    * @param {*} req 
    * @param {*} res 
    */
    const deleteItem = async (req, res) => {
        try {
            const { id } = matchedData(req)
            const dataFile = await storageModel.findById(id)
            await storageModel.delete({_id: id})
            const { filename } = dataFile
            const filePath = `${MEDIA_PATH}/${filename}`
            //fs.unlinkSync(filePath)
            const data = {
                filePath,
                delete: 1
            }
            res.send({ data })
        } catch (e) {
            handleHttpError(res, 'ERROR_DELETE_ITEM')
        }
    }

    module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
    ```
2. Modificar archivo de rutas **node\routes\storage.js**:
    ```js
    const express = require('express')
    const router = express.Router()
    const uploadMiddleware = require('../utils/handleStorage')
    const { validatorGetItem } = require('../validators/storage')
    const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/storage')

    router.get('/', getItems)
    router.get('/:id', validatorGetItem, getItem)
    router.post('/', uploadMiddleware.single('myfile'), createItem)
    router.put('/:id', validatorGetItem, updateItem)
    router.delete('/:id', validatorGetItem, deleteItem)

    module.exports = router
    ```
3. Crear validator **node\validators\storage.js**:
    ```js
    const { check } = require("express-validator")
    const validateResults = require("../utils/handleValidator")

    const validatorGetItem = [
        check("id")
            .exists()
            .notEmpty(),
        (req, res, next) => {
            return validateResults(req, res, next)
        }
    ]

    module.exports = { validatorGetItem };
    ```

## Sección 4: Sesion / Login / JWT
### 18. Creando controlador de Registro
27 min






    ```js
    ≡
    ≡
    ```




### 19. Registro / Generar JWT (Json Web Token)
12 min
### 20. Login JWT (Json Web Token)
12 min
### 21. Proteger rutas (solo con sesión de usuario)
13 min
### 22. Proteger rutas (Permisos)
13 min
### 23. Enviar errores a Slack
20 min


## Sección 5: Motor de Base de datos MySQL / MongoDB
### 24. Implementando MySQL
13 min
### 25. Modelos MySQL
23 min
### 26. Login con MySQL
4 min
### 27. (MongoDB) Métodos Personalizados Relacion
10 min
### 28. (MySQL) Métodos Personalizados Relación
10 min
### 29. Instalación de Swagger / OpenAPI
12 min
### 30. Swagger Schemas
7 min
### 31. Swagger JWT Rutas protegidas
15 min
### 32. Swagger subir archivo
8 min
### 33. Instalando Jest
9 min
### 34. Probando rutas AUTH
15 min
### 35. Jest BeforeAll
6 min
### 36. Jest Watch
6 min
### 37. Jest memory leek
6 min
### 38. Jest Todas las pruebas
9 min
### 39. Reporte de cobertura
9 min
### 40. Subir a GIT
2 min
### 41. Desplegando en Heroku
11 min
### 42. Desplegando a la nube Ubuntu Server (AWS)
18 min
### 43. CI / CD Integración continua y despliegue continuo
26 min
### 44. Implementar TypeScript
15 min
### 45. Creando APP TypeScript
17 min
### 46. Usando la importación dinámica en TypeScript
7 min
### 47. Compilando aplicación TypeScript
4 min


