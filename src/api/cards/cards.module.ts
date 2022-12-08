import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardService } from './card.service';

@Module({
  imports: [HttpModule],
  controllers: [CardsController],
  providers: [CardService],
})
export class CardsModule {}
