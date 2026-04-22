import express from "express";
import { connection, collectionname } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.insertOne(userData);
    
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "1h" }, (err, token) => {
        res.send({
          message: "User registered successfully",
          success: true,
          token,
        });
      });
    } else {
      res.send({ message: "Failed to register user", success: false });
    }
  }
});
app.post("/login", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.findOne({
      email: userData.email,
      password: userData.password,
    });
    
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5 days" }, (err, token) => {
        res.send({
          message: "User logged in successfully",
          success: true,
          token,
        });
      });
    } else {
      res.send({ message: "Failed to log in as user not found", success: false });
    }
  }else {
    res.send({ message: "Email and password are required", success: false });
  }
});




app.post("/add-task",verifyToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionname);
  const result = await collection.insertOne(req.body);
  if (result) {
    res.send({ message: "Task added successfully", success: true, result });
  } else {
    res.send({ message: "Failed to add task", success: false });
  }
  res.send("working...");
});

app.get("/tasks",verifyToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionname);
  const result = await collection.find().toArray();
  if (result) {
    res.send({
      message: "Tasks retrieved successfully",
      success: true,
      result,
    });
  } else {
    res.send({ message: "Failed to retrieve tasks", success: false });
  }
});

app.get("/task/:id",verifyToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionname);
  const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
  if (result) {
    res.send({ message: "Task retrieved successfully", success: true, result });
  } else {
    res.send({ message: "Failed to retrieve task", success: false });
  }
  res.send("working...");
});
app.put("/update-task",verifyToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionname);
  const { _id, ...rest } = req.body;
  const update = { $set: rest };

  console.log(req.body);
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);

  if (result) {
    res.send({ message: "Task updated successfully", success: true, result });
  } else {
    res.send({ message: "Failed to update task", success: false });
  }
});

app.delete("/delete-task/:id",verifyToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionname);
  const result = await collection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  if (result) {
    res.send({ message: "Task deleted successfully", success: true });
  } else {
    res.send({ message: "Failed to delete task", success: false });
  }
});
app.delete("/delete-multiple",verifyToken, async (req, res) => {
  const db = await connection();
  const ids = req.body;
  const objectIds = ids.map((id) => new ObjectId(id));
  const collection = await db.collection(collectionname);
  const result = await collection.deleteMany({ _id: { $in: objectIds } });
  if (result) {
    res.send({ message: "Tasks deleted successfully", success: true });
  } else {
    res.send({ message: "Failed to delete tasks", success: false });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


function verifyToken(req,res,next) {
    console.log("verifying token...",req.cookies['token'] );
    const token=req.cookies['token'];
    jwt.verify(token,"Google",(err,decoded)=>{
        if(err){
            return res.send({message: "Unauthorized access", success: false});
        }
      next();
    })
    
}