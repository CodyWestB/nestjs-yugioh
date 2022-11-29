import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DeckService } from './deck.service';
import { DecksController } from './decks.controller';

@Module({
  imports: [HttpModule],
  controllers: [DecksController],
  providers: [DeckService],
})
export class DeckModule {}
