import { v4 as uuidv4 } from 'uuid';

const UsersDB = [
    {id: '1' ,email: "email1@gmail.com", userName: "userName1", password: "123456"},
    {id: '2', email: "email2@gmail.com", userName: "userName2", password: "123456"},
    {id: '3' ,email: "email3@gmail.com", userName: "userName3", password: "123456"},
]


export const UsersRepository = {
    create: (email,userName,password) =>{
        try{
            const foundUser = UsersDB.find( user => user.email == email)
            if(foundUser) throw new Error("El email ya esta en uso...")
            UsersDB.push({id:uuidv4(),email:email,userName:userName,password:password})
            return {...UsersDB.find( user => user.email == email)}
        }catch(error){
            console.error(error)
            throw error
        }
    
    },
    
    getById: (id) =>{
        const foundUser = UsersDB.find( user => user.id == id)
        if (!foundUser) return null
        return {...foundUser}
    },

    getByEmail: (email) =>{
        const foundUser = UsersDB.find( user => user.email == email)
        if (!foundUser) return null
        return {...foundUser}
    },

    getAll: ()=>{
        return [...UsersDB]
    }

    
    
}