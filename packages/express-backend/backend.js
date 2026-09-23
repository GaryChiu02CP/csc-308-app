console.log("SERVER FILE STARTED");

import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices.getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.findUserById(id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.post("/users", (req, res) => {
  userServices.addUser(req.body)
    .then((savedUser) => {
      res.status(201).send(savedUser);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.delUserById(id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});