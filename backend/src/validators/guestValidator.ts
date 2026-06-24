
import {z} from 'zod'
export const guestSchema = z.object({
    name: z.string().min(3, 'Nome muito pequeno.'),
    email: z.email('E-mail inválido.'),
    cpf: z.string().length(11, 'CPF deve ter exatamente 11 digitos'),
    phone: z.string().length(11, 'Número inválido'),
    table_number: z.number()
})