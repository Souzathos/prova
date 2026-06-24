import express from 'express'
import * as dotenv from 'dotenv'
import { AppDataSource } from './config/data-source'
import cors from 'cors'
import routes from './routes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
dotenv.config()

const port = Number(process.env.PORT)

AppDataSource.initialize().then(() => {
    console.log(`Banco de dados conectado`)

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
    })
})
