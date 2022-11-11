import express, { Request, Response } from 'express';
import { createCollection, deleteCollection, getAllRequestsInCollection, getCollection, updateCollection } from '../controllers/collectionController';
import { checkJwt } from "../middleware/checkJwt";
import cors from "cors"
const router = express.Router();



router.get("/", getCollection)

router.get("/:id",getAllRequestsInCollection)

router.post('/create',createCollection)


router.put('/:id',updateCollection)

router.delete('/:id',deleteCollection)

module.exports = router
