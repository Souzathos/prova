import { z } from 'zod'

export const guestSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('E-mail deve ter @ e/ou Dominio correto.'),
    phone: z.string().length(11, 'Telefone deve ter 11 dígitos'),
    table_number: z.number().int().min(1, 'Número da mesa deve ser positivo')
})
