// backend/index.js
const express = require('express');
const router = express.Router();
const userRouter = require("./user");
const User = require('./models/User');  // Import the User model

const app = express.Router();

router.use("/user", userRouter)

app.use(express.json());

// Example route to create a new user
app.post('/signup', async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        const newUser = new User({ username, password, firstName, lastName });
        await newUser.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to create user' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = router ;