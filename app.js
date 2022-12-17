const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1/todolist')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const Task = mongoose.model("Task", itemSchema)

const task1 = new Task({
  name: "Welcome to ToDo List"
})
const task2 = new Task({
  name: "Click + to ADD a Task"
})

const defaultTasks = [task1, task2]

app.get("/", function (req, res) {
  const day = date.getDay();

  Task.find({}, function (err, result) {
    if (result.length === 0) {
      Task.insertMany(defaultTasks, function (err) { })
    }
    else {
    }
    res.render("list", { listTitle: day, newListItems: result });
  })

});

app.post("/", function (req, res) {

  const taskname = req.body.newTask;
  const task = new Task({
    name: taskname
  })
  task.save()
  res.redirect("/")
});

app.post("/d", function (req, res) {

  const checkedItemId = req.body.deleteItem
  console.log(checkedItemId)

  Task.findByIdAndDelete({ _id: checkedItemId }, function (item) {

  })
  res.redirect("/")
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
