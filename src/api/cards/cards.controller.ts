import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardService) {}

  @Get(':cardId')
  async getCardById(@Param('cardId', ParseIntPipe) cardId: number) {
    return await this.cardService.getCardById(cardId);
  }

  @Post(':cardId')
  createCardById(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.cardService.createCardById(cardId);
  }
}
