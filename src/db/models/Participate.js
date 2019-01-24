import Sequelize from 'sequelize';
import sequelize from '..';
import { UserModel } from './User';
import { GroupModel } from './Group';

const ParticipateModel = sequelize.define('participate', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    groupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

ParticipateModel.belongsTo(UserModel, { foreignKey: 'userId' });
ParticipateModel.belongsTo(GroupModel, { foreignKey: 'groupId' });

ParticipateModel.sync({ force: process.env.DB_MIGRATE });

export default {
    bind(from, chat) {
        return new Promise((resolve, reject) => {
            ParticipateModel.findAll({
                where: {
                    userId: from.id,
                    groupId: chat.id,
                },
            }).then((participations) => {
                if (!participations.length) {
                    ParticipateModel.create({
                        userId: from.id,
                        groupId: chat.id,
                    }).then(() => resolve());
                } else {
                    reject(new Error('Already a member'));
                }
            });
        });
    },
};
