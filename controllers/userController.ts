import { PrismaClient } from '@prisma/client';
import { json } from 'body-parser';
import { resolvePtr } from 'dns';
import e from 'express';
import express, { Request, Response } from 'express';
import { cp } from 'fs';
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


export const findAllUsers=async(req:Request, res:Response)=>{
    
    try {
        const userData = await prisma.user.findMany({
           
        })
        res.json(userData)


    } catch (error) {
        
        res.status(500)
        console.log(error)
    }

}

//------------------------------------------------//

export const createUser=async(req:Request, res:Response)=>{
    
   
    try {
        
        let {email,password} = req.body;
        const hash = bcrypt.hashSync(password, 8);
        
        
        const userData = await prisma.user.create({
            data: {
                email,
                password:hash
            },
        })

//        const token = generateToken(userData)
        const token = jwt.sign(
            {
                id: userData.id, email: email },
            "secret123",
            { expiresIn: "3h" }
          );
        res.status(201).json({ success: true, data: { userData, token } });
    

    } catch (error) {
        res.status(400)
        console.log("Could not create new user!")
        
    }

}

//------------------------------------------------//

export const findUserById=async(req:Request, res:Response)=>{
    const { id } = req.params
    
    try {
        const userData = await prisma.user.findUnique({
            where:{
                id
            }
        
        })
        res.json(userData)

    } catch (error) {
        res.status(500)
        console.log("Not found")
        
    }

}

//------------------------------------------------//

export const deleteUser=async(req:Request, res:Response)=>{
   
    try {
        const { userid } = req.params
        
        const deleteOwnership = await prisma.collections.updateMany({
            where:{
                isOwner:userid

            },
            data:{
                isOwner:""
            }
        })

        const deleteUserIdFromCollection = await prisma.collections.updateMany({
            where:{
                isOwner:userid
            },
            data:{
                userID:{
                    set:[]
                }

            }
        })

        const userData = await prisma.user.delete({
          where: {
            id: userid
          }
        })

        res.json(userData)
    
    } catch (error) {
        res.status(404)
        console.log("Not found")
        
    }

}
//---------------------------------------------------------//

export const createCollectionAndUser=async(req:Request, res:Response)=>{
   
   
    try{
       
        let {email,password,name} = req.body;

        const hash = bcrypt.hashSync(password, 8);
        
        const userData = await prisma.user.create({
            data: {
                email,
                password:hash,
                collection:{
                    create:{
                        name
                        
                    }
                }
            } 
            
        })
    
        const token = jwt.sign(
            {
                id: userData.id, email: email },
            "secret123",
            { expiresIn: "3h" }
          );
        res.status(201).json({ success: true, data: { userData, token } });
       

    }catch(error){
        res.status(404)
        console.log("Not found")

    }

}

//-----------------------------------------------------------------//

export const addUserToCollection=async(req:Request, res:Response)=>{

    try{
       
        let {email,password} = req.body;
        let {id} = req.params
        const hash = bcrypt.hashSync(password, 8);
        
        const userData = await prisma.user.create({
            data: {
                email,
                password:hash,
                collection:{
                    connect:{
                        id
                    }
                }
            },
            include:{
                collection:true

            } 
            
        })
    
        const token = jwt.sign(
            {
                id: userData.id, email: email },
            "secret123",
            { expiresIn: "3h" }
          );
        res.status(201).json({ success: true, data: { userData, token } });
       

    }catch(error){
        res.status(404)
        console.log("Not found")

    }

}

//-----------------------------------------------------------------//

export const addExistingUserToCollection=async(req:Request, res:Response)=>{
    
    let duplicate=false

    const {
        userId,
        collectionId
      } = req.params
    
    
    
    try{
       
        const checkForDuplicate = await prisma.collections.findUnique({
            where:{
                id:collectionId
            }
        })

        checkForDuplicate?.isContributor.forEach(element => {
            if(element == userId)
            {
                duplicate = true
            }
            
        });
    
            if(duplicate == false)
            {
                const collectionData = await prisma.collections.update({
                    where:{
                        id:collectionId
                    },
                    data:{
                        isContributor:{
                            push:userId
                        }
                    }
                })
                res.json(collectionData).status(200)
            }
            else{
                res.json(checkForDuplicate)
            }
            }
                    catch(error){
                        res.status(404).json({
                            message:"Server Error!",
                            error
                        }
                    )

                }

    
}

//----------------------------------------------------------------//
export const createNewCollectionByUser=async(req:Request, res:Response)=>{

    
    let {id} = req.params
    let role = id
    let {name} = req.body

    try{
        const userData = await prisma.user.update({
            where:{
                id
            },
            data:{
                collection:{
                    create:{
                        name,
                        isOwner:role,
                        isContributor:role
                        
                    }
                    
                }
            }
           
        })
        res.json(userData)

    }catch(error){
        res.status(404)
        console.log("Not found")

    }

}

//----------------------------------------------------------------//
export const updateCollectionByUser=async(req:Request, res:Response)=>{

    const {
        userId,
        collectionId
      } = req.params
    
    let {name} = req.body


    try{
        const userData = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                collection:{
                    update:{
                        where:{
                            id:collectionId
                        },
                        data:{
                            name
                        }
                    }
                    
                }
            }
           
        })
        res.json(userData)

    }catch(error){
        res.status(404)
        console.log(error)
        

    }

}
//----------------------------------------------------------------//
export const deleteCollectionByUser=async(req:Request, res:Response)=>{

    const {
        userId,
        collectionId
      } = req.params


    try{
        
        const userDataUpdated = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                collection:{
                    disconnect:[{id:collectionId}]
                }
            }
        })

        
        const collectionData = await prisma.collections.delete({
          where: {
            id: collectionId
          }
        })
    
        res.json(userDataUpdated)

    }catch(error){
        res.status(404)
        console.log(error)
        

    }

}
