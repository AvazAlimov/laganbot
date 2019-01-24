import Telegraf from 'telegraf';
import User from '../db/models/User';
import Group from '../db/models/Group';

const langKeyboards = Telegraf.Extra.markdown().markup(markdown => markdown.inlineKeyboard([
    markdown.callbackButton('🇺🇿 Uzbek', 'uz'),
    markdown.callbackButton('🇷🇺 Russian', 'ru'),
]));

const teamKeyboards = Telegraf.Extra.markup(m => m.keyboard([
    m.callbackButton('✅ Add me', 'add'),
    m.callbackButton('❌ Remove me', 'remove'),
    m.callbackButton('👥 Team members', 'members'),
]));

export default (bot) => {
    /* Start Command */
    bot.start((context) => {
        const { from } = context;
        const { chat } = context.message;

        new Promise((resolve) => {
            if (chat.type === 'group') {
                Group.addGroup(chat).then(() => {
                    resolve();
                });
            } else if (!from.is_bot) {
                User.addUser(from).then(() => {
                    resolve();
                });
            }
        }).then(() => {
            context.telegram.sendMessage(
                context.message.chat.id,
                'Select Language',
                langKeyboards,
            );
        });
    });

    /* Change language command */
    bot.command('lang', (context) => {
        context.telegram.sendMessage(
            context.message.chat.id,
            'Select Language',
            langKeyboards,
        );
    });

    /* Team management */
    bot.command('team', (context) => {
        context.telegram.sendMessage(
            context.message.chat.id,
            'Form a team',
            teamKeyboards,
        );
    });
};
