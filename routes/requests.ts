import express, { Request, Response } from 'express';
import { createRequest, deleteRequest, getRequest, updateRequest } from '../controllers/requestController';


import { checkJwt } from "../middleware/checkJwt";
const router = express.Router();


router.get("/", getRequest);

//router.post('/create',createRequest)

router.post('/create/:userId/:collectionId',createRequest)

router.patch('/:id',updateRequest)

router.delete('/:id',deleteRequest)


module.exports = router