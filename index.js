const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const dataPath = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Helper to read data
const readData = async () => {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
};

// Helper to write data
const writeData = async (data) => {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

// --- CRUD Endpoints ---

// Create User
app.post('/api/users', async (req, res) => {
    try {
        const users = await readData();
        const newUser = { id: uuidv4(), ...req.body, createdAt: new Date() };
        users.push(newUser);
        await writeData(users);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Users
app.get('/api/users', async (req, res) => {
    try {
        const users = await readData();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get User By ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const users = await readData();
        const user = users.find(u => u.id === req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update User
app.put('/api/users/:id', async (req, res) => {
    try {
        const users = await readData();
        const index = users.findIndex(u => u.id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'User not found' });

        users[index] = { ...users[index], ...req.body, updatedAt: new Date() };
        await writeData(users);
        res.json(users[index]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete User
app.delete('/api/users/:id', async (req, res) => {
    try {
        const users = await readData();
        const index = users.findIndex(u => u.id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'User not found' });

        users.splice(index, 1);
        await writeData(users);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Health check
app.get('/', (req, res) => res.send('Backend is running with JSON storage.'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Required for Vercel
