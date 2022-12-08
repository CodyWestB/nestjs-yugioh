import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { MonsterCard, SpellCard, TrapCard } from './card.model';

type Card = MonsterCard | TrapCard | SpellCard;

@Injectable()
export class CardService {
  _yugioh_deck = 'decks_dictionary.json';

  constructor(private http: HttpService) {}

  async getAllCards(): Promise<Card[]> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    const root = path.dirname(require.main.filename);
    const file = root + `/cards/${this._yugioh_deck}`;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    console.log('before readFile');
    // const allCards = await fs.readFile(file, 'utf8', (err, data) => {
    const allCards = await fs.readFileSync(file, 'utf8', (err, data) => {
      if (err) {
        console.log(`err reading JSON: ${err}`);
        throw new ForbiddenException(`${this._yugioh_deck} not available`);
      }

      const cards: Card[] = JSON.parse(data);

      console.log(`cards from ALL: ${cards}`);

      return cards;
    });
    console.log('after readFile');

    // console.log(`allCards: ${allCards}`);
    return allCards;
  }

  async getCardById(cardId: number): Promise<Card> {
    const cards: Card[] = await this.getAllCards();

    // .then((res) => {
    // const cards: Card[] = res;
    console.log(`cards: ${cards}`);

    if (!cards) throw new NotFoundException('No cards found.');

    const card = cards.find((x) => x.id === cardId);
    return card;
    // });
  }

  async createCardById(cardId: number): Promise<any> {
    const request = this.http
      .get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?tcgplayer_data&id=${cardId}&cache_check`,
      )
      .pipe(map((res) => res.data.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const cardInfoPromise = await lastValueFrom(request);
    const cardInfo = cardInfoPromise[0];
    const cardType = cardInfo.type;

    let card = undefined;

    if (cardType.indexOf('Monster') !== -1) {
      card = new MonsterCard(cardInfo);
    } else if (cardType.indexOf('Spell') !== -1) {
      card = new SpellCard(cardInfo);
    } else if (cardType.indexOf('Trap') !== -1) {
      card = new TrapCard(cardInfo);
    } else {
      throw new BadRequestException('Card not found');
    }

    this.saveCardInfo(card);
    return card;
  }

  async saveCardInfo(newCard: any): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    const root = path.dirname(require.main.filename);
    const file = root + `/cards/${this._yugioh_deck}`;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(`err reading JSON: ${err}`);
        throw new ForbiddenException(`${this._yugioh_deck} not available`);
      }

      const cards: Card[] = JSON.parse(data);

      const hasAlreadySavedCard = cards.find((x) => x.id === newCard.id);
      if (!hasAlreadySavedCard) {
        console.log(`Cody, new card named \'${newCard.name}\' will be saved.`);
        cards.push(newCard);
        const json = JSON.stringify(cards);
        fs.writeFile(file, json, 'utf8', (err) => {
          if (err) {
            console.log(`err writing to JSON: ${err}`);
            throw new ForbiddenException(`${this._yugioh_deck} not available`);
          }
        });
      } else {
        console.log(
          `Cody, new card named \'${newCard.name}\' will NOT be saved.`,
        );
      }
    });
  }
}
