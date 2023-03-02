import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  declare readonly id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    username: {
      allowNull: false,
      type: STRING,
    },
    role: {
      allowNull: false,
      type: STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: STRING,
    },
    password: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    modelName: 'UserModel',
    timestamps: false,
  },
);

export default UserModel;
