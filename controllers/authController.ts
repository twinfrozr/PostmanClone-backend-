import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



export const login = async (req: Request, res: Response) => {
       
    try {
        let { email, password } = req.body;
        
        const user = await prisma.user.findUnique({
            where: { email }
        });
        
        if(user)
        {
            if(!bcrypt.compareSync(password, user.password))
            {

                res.status(401).send();
                return;

            }
            else
            {
                
                res.status(200).json({ success: true, data: { user } });
            }
        }

    } catch (error) {
      res.status(401).send();

    }
};

  