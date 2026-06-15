const users = require("../models/userModel");

const getUsers = () => users;

const getUserById = (id) =>
    users.find(u => u.id == id);

const createUser = (user) =>
    users.push(user);

const updateUser = (id, data) => {

    const user = users.find(
        u => u.id == id
    );

    if (!user) return null;

    user.name = data.name || user.name;
    user.email = data.email || user.email;

    return user;
};

const deleteUser = (id) => {

    const index = users.findIndex(
        u => u.id == id
    );

    if (index === -1) return false;

    users.splice(index, 1);

    return true;
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};