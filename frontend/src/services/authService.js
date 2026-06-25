import { api } from './api'

export async function login(email, password) {
    return api('/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
}
