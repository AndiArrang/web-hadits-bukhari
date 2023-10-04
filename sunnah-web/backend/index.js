import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser'
import { getHaditsBySearch,getAllKitabName,getHaditsByKitab,getHaditsByNumber } from './controllers/bukhariController.js'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded()); 

app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  const validCredentials = 'Basic ' + btoa('webhadits:arrangs3710').toString('base64');

  if (!authHeader || authHeader !== validCredentials) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send('Autentikasi gagal');
  }

  next();
});

app.post('/search',getHaditsBySearch)
app.get('/kitab',getAllKitabName)
app.get('/kitab/:nama_kitab',getHaditsByKitab)
app.get('/hadits/:number',getHaditsByNumber)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})