import express from 'express'
import * as dotenv from 'dotenv'
import { AppDatSource } from './config/data-source'
import routes from './routes'
import cors from 'cors'

dotenv.config()
const port = Number(process.env.PORT)
const app = express()
app.use(cors())
app.use(express.json())


AppDatSource.initialize().then(() => {
    console.log('Banco conectado')
    app.use(routes)
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
    })
})