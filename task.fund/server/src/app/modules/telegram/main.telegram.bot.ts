import { Bot, InlineKeyboard, type Context } from 'grammy';
import { BOT_COMMANDS } from './bot.commands';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramBot {
  private readonly bot: Bot;
  private readonly appUrl: string;

  constructor() {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.APP_URL) {
      throw new Error('TELEGRAM_BOT_TOKEN and APP_URL must be set in env');
    }
    this.appUrl = process.env.APP_URL;
    this.bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
    this.initializeBot();
  }

  getBotApi() {
    return this.bot.api;
  }

  private initializeBot(): void {
    this.bot.command(BOT_COMMANDS.START, (ctx) => this.commandStart(ctx));
    this.bot.start();
  }

  private async commandStart(context: Context): Promise<void> {
    if (!context?.from?.id) return;

    const keyboard = new InlineKeyboard().webApp('Open the App', this.appUrl);

    await context.reply('Hello!', {
      reply_markup: keyboard,
      parse_mode: 'HTML',
    });
  }
}
