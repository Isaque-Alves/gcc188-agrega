import { DataTypes } from "sequelize";
import db from "./connection";

const Usuario = db.define(
  "Usuario",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    verificado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  { tableName: "Usuarios" }
);

const GrupoLink = db.define(
  "GrupoLink",
  {
    gid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "GruposLinks" }
);

const Link = db.define(
  "Link",
  {
    lid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "Links" }
);

const Comentario = db.define(
  "Comentario",
  {
    cid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    texto: {
      type: DataTypes.STRING(1000),
    },
  },
  { tableName: "Comentarios" }
);

Usuario.hasMany(GrupoLink, { foreignKey: "id" });
Usuario.hasMany(Link, { foreignKey: "id" });
Usuario.hasMany(Comentario, { foreignKey: "id" });
Comentario.belongsTo(Usuario, { foreignKey: "id" });
GrupoLink.hasMany(Link, { foreignKey: "gid" });
Link.hasMany(Comentario, { foreignKey: "lid" });

export { db, Usuario, GrupoLink, Link, Comentario };
