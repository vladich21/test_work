<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TelegramBot } from './main.telegram.bot';

@Module({
  providers: [TelegramBot],
  exports: [TelegramBot]
})
export class TelegramBotModule { }
=======
import { Module } from '@nestjs/common';
import { TelegramBot } from './main.telegram.bot';

@Module({
  providers: [TelegramBot],
  exports: [TelegramBot]
})
export class TelegramBotModule { }
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
