import bcrypt from 'bcrypt'

function createHash(password){
    console.log('Creamos el hash para: ', password)
    return bcrypt.hashSync(password, 10)
}


function isValidPassword  (password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
}

export {createHash,isValidPassword}