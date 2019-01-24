import Sequelize from 'sequelize';
import sequelize from '..';

export const GroupModel = sequelize.define('group', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
    },
    language: {
        type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

GroupModel.sync({ force: process.env.DB_MIGRATE });

export default {
    addGroup(chat) {
        return new Promise((resolve) => {
            GroupModel.findByPk(chat.id).then((group) => {
                if (!group) {
                    GroupModel.create({
                        id: chat.id,
                        title: chat.title,
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

    setLanguage(chat, language) {
        return new Promise((resolve) => {
            GroupModel.findByPk(chat.id).then((group) => {
                group
                    .update({
                        language,
                    })
                    .then(() => resolve());
            });
        });
    },
};
