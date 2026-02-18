const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '../data/users.json');

const readData = async () => {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = async (data) => {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

const createUser = async (userData) => {
    const users = await readData();
    const newUser = { id: uuidv4(), ...userData, createdAt: new Date() };
    users.push(newUser);
    await writeData(users);
    return newUser;
};

const getAllUsers = async () => {
    return await readData();
};

const getUserById = async (id) => {
    const users = await readData();
    return users.find(u => u.id === id);
};

const updateUser = async (id, data) => {
    const users = await readData();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...data, updatedAt: new Date() };
    await writeData(users);
    return users[index];
};

const deleteUser = async (id) => {
    const users = await readData();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    const deletedUser = users.splice(index, 1);
    await writeData(users);
    return deletedUser[0];
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
