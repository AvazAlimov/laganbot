import Sequelize from 'sequelize';
import sequelize from '..';

export const UserModel = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    language: {
        type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

UserModel.sync({ force: process.env.DB_MIGRATE });

export default {
    addUser(from) {
        return new Promise((resolve) => {
            UserModel.findByPk(from.id).then((user) => {
                if (!user) {
                    UserModel.create({
                        id: from.id,
                        username: from.username,
                        first_name: from.first_name,
                        last_name: from.last_name,
                        language: 'uz',
                    }).then(() => {
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        });
    },

    setLanguage(from, language) {
        return new Promise((resolve) => {
            UserModel.findByPk(from.id).then((user) => {
                user
                    .update({
                        language,
                    })
                    .then(() => resolve());
            });
        });
    },
};
