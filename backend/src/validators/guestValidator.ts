import {z} from 'zod'

export const guestSchema = z.object({
    name: z.string().min(3, 'Nome muito pequeno.'),
    email: z.email('Email inválido'),
    cpf: z.string().min(11, 'CPF deve ter exatamente 11 digitos.').max(11, 'CPF deve ter exatamente 11 digitios'),
    phone: z.string().min(11, 'Número inválido'),
    table_number: z.number()
})