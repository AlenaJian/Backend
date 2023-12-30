import express from 'express'
import { createUser,accountActivation, loginUser, getUser, resetPass, resetpassactivation, throughemailresetpass, forgetEmail, logout } from '../controller/user.js'
import isAuthenticate from '../middleware/isAuthenticate.js'

const router = express.Router()


router.post('/create-user',createUser)
router.post("/activation",accountActivation)
router.post("/login-user",loginUser)
router.get("/get-user",isAuthenticate,getUser)
router.post("/reset-pass",isAuthenticate,resetPass)
router.post('/reset-pass-activation',resetpassactivation)
router.post('/through-email-reset-pass',throughemailresetpass)
router.post("/forget-email",forgetEmail)
router.get('/log-out',isAuthenticate,logout)

export default router

