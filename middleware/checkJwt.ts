import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  
  const token = <string>req.headers["auth"];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, 'secret123');
    
  } catch (error) {
    res.status(401).json({message:"You are not authorized!"});
    return;
  }

  const { id, email } = jwtPayload;
  const newToken = jwt.sign({ id, email }, 'secret123', {
    expiresIn: "3h"
  });
  res.setHeader("token", newToken);

  next();
};