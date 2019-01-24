import User from '../db/models/User';
import Group from '../db/models/Group';
import Participate from '../db/models/Participate';

function languagePredicate(callbackData) {
    return callbackData === 'uz' || callbackData === 'ru';
}

export default (bot) => {
    bot.action(languagePredicate, (context) => {
        const { from } = context.callbackQuery;
        const { chat } = context.callbackQuery.message;
        new Promise((resolve) => {
            if (chat.type === 'group') {
                Group.setLanguage(chat, context.callbackQuery.data).then(() => resolve());
            } else {
                User.setLanguage(from, context.callbackQuery.data).then(() => resolve());
            }
        }).then(() => {
            //
            context.reply(`Language is set to ${context.callbackQuery.data}`);
        });
    });

    bot.action('add', (context) => {
        const { from } = context.callbackQuery;
        const { chat } = context.callbackQuery.message;

        new Promise((resolve, reject) => {
            if (chat.type === 'group') {
                Participate.bind(from, chat).then(() => {
                    context.reply('Added');
                    resolve();
                });
            } else {
                reject(new Error('It is supported for group'));
            }
        }).then((message) => {
            context.reply(message);
        }).catch((error) => {
            context.reply(error.message);
        });
    });
};
