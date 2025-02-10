const { Todo, sequelize } = require("../models");

///// test API  /////
exports.getIndex = (req, res) => {
  res.send("response from api-server: [GET /api-server]");
};

exports.getUser = (req, res) => {
  res.send("response from api-server: [GET /api-server/user]");
};

///// todo API 작성 /////
// 전체 조회 GET /api-server/todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await Todo.findAll();
    console.log(todoAll);
    res.send(todoAll);
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("서버에러.. 관리자에게 문의하세요!");
  }
};

// todo 하나 추가 POST /api-server/todo
// req.body 로 text 받을 예정
exports.addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    await Todo.create({
      text,
    });

    res.send({ isSuccess: true });
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("서버에러.. 관리자에게 문의하세요!");
  }
};

// todo.done 값 변경
// req.params 로 id 받을 예정
exports.patchDoneState = async (req, res) => {
  try {
    const { todoId } = req.params;
    const [isUpdated] = await Todo.update(
      { done: sequelize.literal("NOT done") }, // 바꿀 값,
      { where: { id: todoId } } // 찾을 조건
    );

    // [0], [1]
    Boolean(isUpdated)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false }); // 잘못된 todoId를 보내는 경우
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("서버에러.. 관리자에게 문의하세요!");
  }
};

///// 수정 삭제에 대한 API /////
exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const isDeleted = await Todo.destroy({ where: { id: todoId } });
    Boolean(isDeleted)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false });
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("Server Error!");
  }
};
exports.patchContent = async (req, res) => {
  try {
    const { id, text } = req.body;
    console.log("받은 데이터:", id, text);

    const todo = await Todo.findOne({ where: { id } });
    if (!todo) {
      return res.status(404).send({
        isSuccess: false,
        message: "수정할 할 일을 찾을 수 없습니다.",
      });
    }

    const [isUpdated] = await Todo.update({ text }, { where: { id } });

    if (isUpdated) {
      const updatedTodo = await Todo.findOne({ where: { id } }); // 업데이트 확인
      res.send({
        isSuccess: true,
        message: "할 일이 성공적으로 수정되었습니다.",
        updatedTodo,
      });
    } else {
      res.send({ isSuccess: false, message: "수정 실패" });
    }
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("서버에러.. 관리자에게 문의하세요!");
  }
};
