import SocialUser from "../models/SocialUser.model.js";

//* READ

export const getUser = async ( req, res ) => {
  try {
    const { id } = req.params
    const user = await SocialUser.findById(id)

    res.status(200).json({
      status: "suceess",
      user
    })

  } catch (err) {
    res.status(404).json({ message: err.message })

  }
}

export const getUserFriends = async ( req, res ) => {
  try {
    const { id } = req.params
    const user = await SocialUser.findById(id)

    const friends = await Promise.all(
      user.friends.map((id) => SocialUser.findById(id))
    )
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    )

    res.status(200).json({
      status: "success",
      formattedFriends
    })

  } catch (err) {
    res.status(404).json({ message: err.message })
    
  }
}

//* UPDATE
export const addRemoveFriend = async ( req, res ) => {
  try {
    const { id, friendId } = req.params
    const user = await SocialUser.findById(id)
    const friend = await SocialUser.findById(friendId)

    if(user.friends.includes(friendId)){
      user.friends = user.friends.filter((id) => id !== friendId)
      friend.friends = friend.friends.filter((id) => id !== id)
    }else {
      user.friends.push(friendId)
      friend.friends.push(id)
    }

    await user.save()
    await friend.save()

    const friends = await Promise.all(
      user.friends.map((id) => SocialUser.findById(id))
    )
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    )

    res.status(200).json({
      status: "success",
      formattedFriends
    })

  } catch (err) {
    res.status(404).json({ message: err.message })
    
  }
}