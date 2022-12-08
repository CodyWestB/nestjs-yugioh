import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DeckOverview } from './deckOverview.model';

@Injectable()
export class DeckService {
  _decks_dictionary = 'decks_dictionary.json';

  constructor(private http: HttpService) {}

  getAllDecks(): DeckOverview[] {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    const root = path.dirname(require.main.filename);
    const file = root + `/cards/${this._decks_dictionary}`;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    const decks: DeckOverview[] = fs.readFileSync(file, 'utf8', (err, data) => {
      if (err) {
        console.log(`err reading JSON: ${err}`);
        throw new ForbiddenException(`${this._decks_dictionary} not available`);
      }

      const decks = Object.assign(JSON.parse(data));
      return decks;
    });

    console.log(`after an await for decks: ${decks}`);
    return decks;
  }

  getAllCardsByDeckId(deckId: number): DeckOverview {
    const decks: DeckOverview[] = this.getAllDecks();
    const deck = decks.find((x) => x.deck_id === deckId);

    if (!deck) {
      console.log(`DeckId: ${deckId} not found.`);
      throw new NotFoundException(`Deck with DeckId ${deckId} not found`);
    }

    return deck;
  }
}

/**
var maindeckjs = '["46986414","33396948","70903634","7902349","8124921","44519536","5405694","30208479","70781052","6368038","28279543","91152256","87796900","32452818","41392891","67724379","13039848","15025844","90357090","40374923","69669405","80813021","53829412","95727991","40640057","72302403","76792184","55761792","25774450","91595718","87910978","24294108","27827272","64047146","36607978","20101223","93260132","5758500","40703222","93108433","83764719","24094653","44095762","81210420","98069388","59560625","18807109","34694160"]';
var extradeckjs = '["62873545","66889139"]';
var sidedeckjs = '["31560081","6400512","15401633","92377303","57617178","72892473","12580477","65169794","55144522","5318639","53129443","12607053","4206964"]';
var deckname = "Yu-Gi Duelist Kingdom Deck*";
var deckid = 291449;
 */
