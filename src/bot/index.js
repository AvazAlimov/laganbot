import Telegraf from 'telegraf';
import commands from './commands';
import messages from './messages';
import actions from './actions';

const bot = new Telegraf(process.env.BOT_TOKEN);

commands(bot);
messages(bot);
actions(bot);

bot.launch();
