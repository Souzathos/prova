import bcrypt from 'bcrypt'

async function hashada() {
    const hash = await bcrypt.hash('12345678', 10)
    console.log(hash)
}

hashada()