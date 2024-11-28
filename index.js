import express from "express";
const app = express();

const port = 1200;
app.use(express.json());
const users = [];
let Id = 1;
//create user
app.post("/User", (req, res) => {
    const { name, email, password } = req.body;
    const newUser = { id: Id++, name, email, password }
    users.push(newUser);
    res.status(201).json(newUser);
});
//get all users
app.get("/User", (req, res) => {
    res.status(200).json(users);
});
//get specific user by id
app.get("/User/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "user not found!" });
    }
})
//update user
app.put("/User/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);

    if (index !== -1) {
        // const { name, email, password } = req.body;

        // if (!name && !email && !password) {
        //     return res.status(400).json({ message: "At least one field (name, email, password) must be provided to update." });
        // }

        users[index] = { ...users[index], ...req.body };
        res.status(200).json({ data: users[index], message: "User updated successfully!" });
    } else {
        res.status(404).json({ message: "User not found!" });
    }
});

//delete user
app.delete("/User/:id", (req, res) => {
    const index = users.findIndex(user => user.id === parseInt(req.params.id));
    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).json({ message: "user deleted successfully!" });
    } else {
        res.status(404).json({ message: "user not found!" });
    }
})
app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`)
})
