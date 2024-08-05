const bcrypt = require('bcrypt')
async function hashPassword(){

    const myPassword = 'admin123 .202'
    const hash = await bcrypt.hash(myPassword, 7) 
    // eslint-disable-next-line no-console
    console.log(hash)
}

hashPassword()