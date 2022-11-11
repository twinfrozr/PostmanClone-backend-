import { Router } from "express";
import{createUser, deleteUser, findAllUsers, findUserById,createCollectionAndUser, addUserToCollection,addExistingUserToCollection, createNewCollectionByUser, updateCollectionByUser, deleteCollectionByUser} from "../controllers/userController"
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.get("/", findAllUsers);
router.post("/create", createUser);

router.post('/createCollectionAndUser',createCollectionAndUser)
router.put('/addNewUserInCollection/:id',addUserToCollection)
router.put('/addExistingUserInCollection/:userId/:collectionId',addExistingUserToCollection)
router.put('/createCollectionByUser/:id',createNewCollectionByUser)
router.put('/updateCollectionByUser/:userId/:collectionId',updateCollectionByUser)
router.put('/deleteCollectionByUser/:userId/:collectionId',deleteCollectionByUser)


router.get("/:id", findUserById);
router.delete("/:id", deleteUser);




module.exports = router