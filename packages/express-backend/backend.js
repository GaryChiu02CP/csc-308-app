console.log("SERVER FILE STARTED");

import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUsersByNameAndJob = (name, job) =>
  users["users_list"].filter((user) => user["name"] === name && user["job"] === job);

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  console.log("GET")
  if (name != undefined) {
    let result = findUsersByNameAndJob(name, job);
    result = { users_list: result };
    console.log("found")
    res.send(result);
  } else {
    console.log("can't find")
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user
};

app.post("/users", (req, res) => {
  let newId = "";
  for (let i = 0; i<3; i++) {
    newId += (String.fromCharCode(Math.floor(Math.random() * 26) + 97));
  }
  for (let i = 0; i<3; i++) {
    newId += (Math.floor(Math.random() * 10));
  }

  const userToAdd = {
    id: newId,
    ...req.body
  };

  userToAdd.id = newId
  res.status(201).send(addUser(userToAdd));
});

const delUserById = (id) => {
  users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  delUserById(id);
  res.send("User(s) deleted.")
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});