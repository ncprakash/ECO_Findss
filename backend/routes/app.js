import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.post('/', (req, res) => {
    const {name}=req.body;
    res.send("this user name is"+name);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});