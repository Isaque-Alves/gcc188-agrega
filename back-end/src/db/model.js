import { Sequelize } from 'sequelize';
import db from './connection';

const Usuario = db.define('Usuario', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { tableName: 'Usuarios' });

const GrupoLink = db.define('GrupoLink', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { tableName: 'GruposLinks' });

const Link = db.define('Link', {
    nome: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { tableName: 'Links' });

const Comentario = db.define('Comentario', {
    texto: {
        type: Sequelize.STRING(1000)
    }
}, { tableName: 'Comentarios' });

Usuario.hasMany(GrupoLink);
GrupoLink.hasMany(Link);
Link.hasMany(Comentario);
Usuario.hasMany(Comentario);

export { db, Usuario, GrupoLink, Link, Comentario };
