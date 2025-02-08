import { UsersRepository } from "../../database.js"
import { createHash, isValidPassword } from "../utils/hashpassword.js"

export const usersService = {
   
    createUser: (email,userName,password) => {
        try{
            const newUser = UsersRepository.create(email,userName, createHash(password)
            )
            delete newUser.password
            return newUser
        }catch(error){
            console.error(error)
            throw error
        }
    },

    getUserById: (id) => {
        try{
            const foundUser = UsersRepository.getById(id)
            if (!foundUser) throw new Error("User not exist !!")
            delete foundUser.password
            return foundUser
        }catch(error){
            console.error(error)
            throw error
        }
    },

    getUserByEmail: (email) => {
        try{
            const foundUser = UsersRepository.getByEmail(email)
            if (!foundUser) throw new Error("User not exist !!")
            delete foundUser.password
            return foundUser
        }catch(error){
            console.error(error)
            throw errorhhholl
        }
    },

    checkCredentials(email,password){
        try{
            const foundUser = UsersRepository.getByEmail(email)
            if (!foundUser) throw new Error("User not exist !!")
            if (isValidPassword(password,foundUser.password)) return true
            else return false
        }catch(error){
            console.error(error)
            throw error
        }
    }

    

    
}