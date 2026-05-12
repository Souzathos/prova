import {z} from 'zod'

export const guestSchema = z.object({
    name: z.string().min(3, 'Nome muito pequeno.'),
    email: z.email('Email inválido'),
    phone: z.string().min(11, 'Número inválido'),
    table_number: z.number()
})