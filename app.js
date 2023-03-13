const express = require('express');
const path = require('path');
const {users} = require('./db/users');

const app = express();

app.use(express.static('statics'));

app.get("/api/users", (req, res) => {
    const newUsers = users.map(user => {
        const {id, first_name, gender} = user;
        return {id, first_name, gender};
    });
    res.json(newUsers);
});

app.get("/api/users/:userId", (req, res) => {
    const {userId} = req.params;
    const newUser = users.find(user => user.id === Number(userId));
    if(!newUser){
        return res.sendStatus(404).send("User not found");
    }
    return res.json(newUser);
});

app.get("/api/v1/query", (req, res) => {
    let sortedUsers = [ ...users];
    const {search, limit} = req.query;
    if(search){
        sortedUsers = sortedUsers.filter(sortedUser => sortedUser.first_name.startsWith(search));
    }
    if(Number(limit)){
        sortedUsers = sortedUsers.slice(0, Number(limit));
    }
    return res.json(sortedUsers);
});

// app.all("*", (req, res) => {
//     console.log("i'm here too");
//     res.sendStatus(404).send("Not found");
// });

app.listen(5000, () => console.log("Server listen to port:5000.."))