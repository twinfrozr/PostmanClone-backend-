import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getRequest=async(req:Request, res:Response)=>{
    try {
        const requestsList = await prisma.requests.findMany({
        
        })
        res.json(requestsList)

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

export const createRequest=async(req:Request, res:Response)=>{
    let duplicate = false
    const {userId,collectionId} = req.params

    const {url,method,header,body} = req.body;
    
    try {
       
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
            const requestData = await prisma.requests.create({
                data: {
                    url,
                    method,
                    header,
                    body,
                    collection:{connect:{id:collectionId}},
                          
                },
            })
            res.json({
                requestData,
                message:"New contributor added!"
            })
        }else{

            const requestData = await prisma.requests.create({
                data: {
                    url,
                    method,
                    header,
                    body,
                    collection:{connect:{id:collectionId}},
                        
                },
            })
            res.json({
                requestData,
                message:"Request by exisiting contributor!"
            })
    
        }

    } catch (error) {
        res.status(500)
        console.log("Not found")
        
    }

}

//------------------------------------------------//

export const updateRequest=async(req:Request, res:Response)=>{
    try {
        const { id } = req.params
        const {url,method,header,body} = req.body;
        const requestData = await prisma.requests.update({
          where: { id:id },
          data:{
                url,
                method,
                header,
                body,
          }
          
        })
        res.json(requestData)
        

    } catch (error) {
        res.status(500)
        console.log("Not found")
        
    }

}

//------------------------------------------------//

export const deleteRequest=async(req:Request, res:Response)=>{
    try {
        const { id } = req.params
        const requestData = await prisma.requests.delete({
          where: {
            id: id
          }
        })
        res.json(requestData)
    
    } catch (error) {
        res.status(500)
        console.log("Not found")
        
    }

}

//------------------------------------------------//