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

//* LOGGING ING
export const login = async ( req, res ) => {
  try {
    const { email, password } = req.body

    const user = await SocialUser.findOne({ email: email })
    if(!user) return res.status(404).json({ message: "User does not exist" })

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    //delete user.password

    res.status(200).json({
      status: "success",
      message: "Welcome",
      token
    })

  } catch (err) {
    res.status(500).json({ error: err.message })

  }
}