import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
const prisma = new PrismaClient();


export const getCollection=async(req:Request, res:Response)=>{
    try {
        const collectionList = await prisma.collections.findMany()
        console.log()
        res.json(collectionList).status(200)

    } catch (error) {
        res.status(404).json({
            message:"Server Error!",
            error
        }
        )
        console.log(error)
        
    }

}

//------------------------------------------------//

export const createCollection=async(req:Request, res:Response)=>{
    try {
        const {name,isOwner,isContributor}= req.body
        console.log(typeof(req.body))
        const collectionData = await prisma.collections.create({
            data: {
                name,
                isOwner,
                isContributor
                
            }
        })
        res.json(collectionData)
    

    } catch (error) {
        res.status(500)
        console.log("Not found")
        
    }

}

//------------------------------------------------//

export const updateCollection=async(req:Request, res:Response)=>{
    try {
        const { id } = req.params
        const {name,isOwner,isContributor} = req.body
        const collectionData = await prisma.collections.update({
          where: { id:id },
          data:{
                name,
                isOwner,
                isContributor
          }
          
        })
        res.json(collectionData).status(200)
    
    

    } catch (error) {
        res.status(500)
        console.log("Not found")
        
    }
}

//------------------------------------------------//

export const deleteCollection=async(req:Request, res:Response)=>{
    try {
        const { id } = req.params
        const collectionData = await prisma.collections.delete({
          where: {
            id: id
          }
        })
        res.json(collectionData).status(200)
    
    
    

    } catch (error) {
        res.status(500)
        console.log("Not found")
        
    }

    
}

//------------------------------------------------//

export const getAllRequestsInCollection=async(req:Request, res:Response)=>{
    try {
        const { id } = req.params
        const requestInCollection = await prisma.collections.findUnique({
          where: {
            id: id
          },
          include:{
            collectionRequests:true,
          }
        })
        res.json(requestInCollection).status(200)
    
    
    

    } catch (error) {
        res.status(500)
        console.log("Not found")
        
    }
}

//-----------------------------------------------------------------//

