import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SocialUser from "../models/SocialUser.model.js"

//* REGISTER USER
export const register = async ( req, res ) => {
  try {
    const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body // frontend send this

    //crypt password
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new SocialUser({
      firstName, 
      lastName, 
      email, 
      password: passwordHash,
      picturePath, 
      friends, 
      location, 
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    })
    const savedUser = await newUser.save()

    res.status(201).json({
      status: "Success",
      message: "New User created succesfully",
      savedUser
    })

  } catch (err) {
    res.status(500).json({ error: err.message })

  }
}