const jwt = require('jsonwebtoken')

const PRIVATE_KEY = "Llave secreta";

const generateToken = (payload) => {
    const token = jwt.sing({ user: payload }, PRIVATE_KEY, { expiresIn: '24' })
    return token
}

const verifyToken = (token) => {
    return new Promise ((res, rej)=> {
    jwt.verify(token, PRIVATE_KEY, (err, payload))
    if(err){
        return rej(err)
    }
    return res(payload)
})
}

module.export = {
    generateToken,
    verifyToken
}