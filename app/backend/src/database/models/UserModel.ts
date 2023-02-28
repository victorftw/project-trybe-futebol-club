import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  declare readonly id: number;
  declare teamName: string;
}

UserModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
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
    modelName: 'users',
    timestamps: false,
  },
);

export default UserModel;
