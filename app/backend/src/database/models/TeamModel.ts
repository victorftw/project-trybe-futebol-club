import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare readonly id: number;
  declare teamName: string;
}

TeamModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    teamName: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    sequelize: db,
    underscored: true,
    modelName: 'TeamModel',
    tableName: 'teams',
    timestamps: false,
  },
);

export default TeamModel;
