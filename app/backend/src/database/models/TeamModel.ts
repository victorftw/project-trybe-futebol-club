import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  declare readonly id: number;
  declare teamName: string;
}

Team.init(
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
    modelName: 'teams',
    timestamps: false,
  },
);

export default Team;
