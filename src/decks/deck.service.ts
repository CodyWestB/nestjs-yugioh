import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DeckOverview } from './deck.model';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ICard, MonsterCard, SpellCard, TrapCard } from './card.model';
// import { fs } from 'fs';

@Injectable()
export class DeckService {
  _decks: DeckOverview[] = [
    { id: 1, name: 'Yu-Gi Duelist Kingdom Deck' },
    { id: 2, name: 'Kaiba Duelist Kingdom Deck' },
  ];

  constructor(private http: HttpService) {}

  getAllDecks(): DeckOverview[] {
    return this._decks;
  }

  getAllCardsByDeckId(deckId: number): any[] {
    return [];
  }

  async getCardById(cardId: number): Promise<any> {
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
      card = new MonsterCard(
        cardInfo.id,
        cardInfo.name,
        cardInfo.race,
        cardInfo.archetype,
        cardInfo.type,
        cardInfo.desc,
        cardInfo.card_images[0],
        cardInfo.attribute,
        cardInfo.atk,
        cardInfo.def,
        cardInfo.level,
      );
    } else if (cardType.indexOf('Spell') !== -1) {
      card = new SpellCard(
        cardInfo.id,
        cardInfo.name,
        cardInfo.race,
        cardInfo.archetype,
        cardInfo.type,
        cardInfo.desc,
        cardInfo.card_images[0],
      );
    } else if (cardType.indexOf('Trap') !== -1) {
      card = new TrapCard(
        cardInfo.id,
        cardInfo.name,
        cardInfo.race,
        cardInfo.type,
        cardInfo.desc,
        cardInfo.card_images[0],
      );
    } else {
      throw new BadRequestException('Card not found');
    }

    this.saveCardInfo(card);
    return card;
  }

  // async saveCardInfo(card) {
  //   // const card = await this.getCardById(cardId);
  //   // const json = JSON.stringify(card);

  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   const fs = require('fs');
  //   fs.readFile(
  //     '../../decks/yugioh_deck.json',
  //     'utf8',
  //     function readFileCallback(err, data) {
  //       if (err) {
  //         // throw new ForbiddenException('File not available.');
  //         console.log(`err: ${err}`);
  //       } else {
  //         const obj = JSON.parse(data);
  //         obj.table.push(card);
  //         const json = JSON.stringify(obj);
  //         fs.writeFile('../../decks/yugioh_deck.json', json, 'utf8');
  //       }
  //     },
  //   );
  //   // fs.writeFile('testing.json', json, 'utf8');
  // }

  async saveCardInfo(card: any) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    const root = path.dirname(require.main.filename);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jsonfile = require('jsonfile');
    const file = root + '/decks/yugioh_deck.json';
    jsonfile.readFile(file, function (err, obj) {
      if (err) console.error(err);
      console.dir(obj);
    });
    // fs.writeFile('testing.json', json, 'utf8');
  }
}

/**
var maindeckjs = '["46986414","33396948","70903634","7902349","8124921","44519536","5405694","30208479","70781052","6368038","28279543","91152256","87796900","32452818","41392891","67724379","13039848","15025844","90357090","40374923","69669405","80813021","53829412","95727991","40640057","72302403","76792184","55761792","25774450","91595718","87910978","24294108","27827272","64047146","36607978","20101223","93260132","5758500","40703222","93108433","83764719","24094653","44095762","81210420","98069388","59560625","18807109","34694160"]';
var extradeckjs = '["62873545","66889139"]';
var sidedeckjs = '["31560081","6400512","15401633","92377303","57617178","72892473","12580477","65169794","55144522","5318639","53129443","12607053","4206964"]';
var deckname = "Yu-Gi Duelist Kingdom Deck*";
var deckid = 291449;
 */
