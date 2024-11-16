// backend/index.js
const express = require("express");
const rootRouter = require("./routes/index");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express.Router();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);
app.use("/api/v1/user",userRouter);

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