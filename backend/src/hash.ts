import bcrypt from 'bcrypt'

async function hash() {
    const password = await bcrypt.hash("123456", 10)
    console.log(password)
}

hash()