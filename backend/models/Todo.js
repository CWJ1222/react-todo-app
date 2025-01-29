const TodoModel = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0, // 기본값 false 로 설정
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: "todo",
    }
  );

  return Todo;
};

module.exports = TodoModel;
