const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

// GET /api-server
router.get("/", controller.getIndex);

// GET /api-server/user
router.get("/user", controller.getUser);

///////////////
// GET /api-server/todos
router.get("/todos", controller.getTodos);

// POST /api-server/todo
router.post("/todo", controller.addTodo);

// PATCH /api-server/todo/:todoId
router.patch("/todo/:todoId", controller.patchDoneState);

// DELETE /api-server/todo/:todoId
router.delete("/todo/:todoId", controller.deleteTodo);

// PATCH /api-server/content
router.patch("/content", controller.patchContent);
module.exports = router;
