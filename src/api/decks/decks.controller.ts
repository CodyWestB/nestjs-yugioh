import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DeckService } from './deck.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly deckService: DeckService) {}

  @Get()
  getAllDecks() {
    return this.deckService.getAllDecks();
  }

  @Get(':deckId')
  getAllCardsByDeckId(@Param('deckId', ParseIntPipe) deckId: number) {
    return this.deckService.getAllCardsByDeckId(deckId);
    // return this.deckService.getCardById(deckId);
  }
}
