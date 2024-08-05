const bcrypt = require('bcrypt')
async function verifyPassword(){

    const myPassword = 'admin123 .202'
    const hash = '$2b$07$S8kLwKGY4YezW7jlnE0XO.iPntniS3Jsh4gw37VDF75KZlu9neQzW'
    const isMatch = await bcrypt.compare(myPassword, hash) 
    // eslint-disable-next-line no-console
    console.log(isMatch)
}

verifyPassword()