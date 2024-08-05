const jwt = require('jsonwebtoken')

const secret = 'myCat'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyMjM0NTU1OH0.AlugQ8QcVLeRP3BXCOS5w7r0Obhbk_K_c2Rqgykz63c'
function verifyToken(token, secret){
    return jwt.verify(token,secret)
}

const payload = verifyToken(token, secret)
console.log(payload)