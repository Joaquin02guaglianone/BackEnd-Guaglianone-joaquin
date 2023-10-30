import userModel from "../dao/models/users.js";

export const AllUsers = async (req,res) => {
    try {
      const Users = await userModel.find().lean();

     return Users; 
    } catch (error) {
      console.error(error)
      throw new Error("No se logro traer a todos los usuarios");
    }
  }

export const userById  = async (uid) => {
    try {
  
      const userID = uid || req.params.uid
  
      if (!userID) {
        throw new Error ("no se recibio ningun id")
      } 
      const userFound = await userModel.findById(userID).lean()
  
      if (!userFound) {
        throw new Error ("no se encontro ningun usuario con ese id")
      }
  
      return userFound;
  
    } catch (error) {
      throw new Error ("error interno del server") 
    }
  }

export const deleteUserByID = async (req,res) => {
try {
    const userID = req.params.uid
  
    console.log(userID)
  
    const deleteId = await userModel.findByIdAndDelete(userID)
  
    if (!deleteId) {
      return res.status(404).send("el usuario no fue encontrado")
    }
  
    return res.status(200).send(`usuario eliminado ${deleteId}`)
  
} catch (error) {
    return res.status(500).send(`error interno en el server`)
}
  }

export const UpdateUserById = async (req,res) => {
    try {
    
      const updateId = req.params.uid;
    
      const body = req.body;
    
      const updateUser = await this.productModel.updateOne({_id: updateId}, body)
    
      if(!updateUser) {
        return res.status(404).send("el usuario no fue encontrado")
      }
    
      return res.status(200).send(`usuario actualizado ${updateUser}`)
      
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del server' });
    }
    }