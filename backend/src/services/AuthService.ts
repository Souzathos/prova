import { AppDatSource } from "../config/data-source";
import { User } from "../models/User";
import bcrypt from 'bcrypt'


export class AuthService {
    private repo = AppDatSource.getRepository(User)

    async login(email: string, password: string) {
        const user = await this.repo.findOneBy({email})
        if(!user) throw new Error('Usuário nao encontrado')
        const validate = await bcrypt.compare(password, user.password)
        if(!validate) throw new Error('Senha inválida')

        return user
    }
}