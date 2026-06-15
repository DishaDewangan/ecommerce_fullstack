const userService =
require("../services/userService");

const getUsers = (req,res)=>{
    res.json(
        userService.getUsers()
    );
};

const getUserById = (req,res)=>{
    res.json(
        userService.getUserById(
            req.params.id
        )
    );
};

const createUser = (req,res)=>{

    userService.createUser(
        req.body
    );

    res.json({
        message:"User Added"
    });
};

const updateUser = (req,res)=>{

    const user =
        userService.updateUser(
            req.params.id,
            req.body
        );

    if(!user){
        return res.status(404).json({
            message:"User Not Found"
        });
    }

    res.json({
        message:"User Updated",
        user
    });
};

const deleteUser = (req,res)=>{

    const deleted =
        userService.deleteUser(
            req.params.id
        );

    if(!deleted){
        return res.status(404).json({
            message:"User Not Found"
        });
    }

    res.json({
        message:"User Deleted"
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};