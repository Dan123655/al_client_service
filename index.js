import express from 'express'
import multer from 'multer'
import cors from 'cors'
import mongoose from 'mongoose'
import { registerValidation,loginValidation, postCreateValidation } from './validations.js'
import { UserController, PostController } from './controllers/index.js' 
import { checkAuth, handleValidationErrors } from './utils/index.js'
mongoose.connect('mongodb+srv://almanac:080356almanac@cluster0.m7wffkp.mongodb.net/almanac?retryWrites=true&w=majority')
    .then(() => console.log('db ok'))
.catch((err)=>console.log('db ewrror', err))
const app = express();
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    }, filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))


app.post('/api/login', loginValidation,handleValidationErrors,UserController.login )
app.post('/api/register',registerValidation,handleValidationErrors,  UserController.register)
app.get('/api/me', checkAuth, UserController.getMe)
app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url:`/uploads/${req.file.originalname}`
    })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id',  PostController.getOne)
app.post('/posts',checkAuth, postCreateValidation,  PostController.create)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)
app.get('/posts/tags',PostController.getLastTags)
app.get('/tags',PostController.getLastTags)

app.listen(3500, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('serv started')
}) 