import { MonsterCardRace, SpellCardType, TrapCardType } from '../../enums';

export interface ICard<T> {
  id: number;
  name: string;
  race: string;
  archetype: string;
  type: T;
  description: string;
  image: CardImage;
}

export class CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
}

/*
Monster Cards

id - ID or Passcode of the card.
name - Name of the card.
type* - The type of card you are viewing (Normal Monster, Effect Monster, Synchro Monster, etc).
desc - Card description/effect.
atk - The ATK value of the card.
def - The DEF value of the card.
level - The Level/RANK of the card.
race - The card race which is officially called type (Spellcaster, Warrior, Insect, etc).
attribute - The attribute of the card.
*/
export class MonsterCard implements ICard<MonsterCardRace> {
  id: number;
  name: string;
  race: string;
  archetype: string;
  type: MonsterCardRace;
  description: string;
  image: CardImage;
  attribute: string;
  atk: number;
  def: number;
  level?: number;

  constructor(card: any) {
    this.id = card.id;
    this.name = card.name;
    this.race = card.race;
    this.archetype = card.archetype;
    this.type = card.type;
    this.description = card.desc;
    this.image = card.card_images[0];
    this.attribute = card.attribute;
    this.atk = card.atk;
    this.def = card.def;
    this.level = card.level;
  }
}

/*
Spell Cards

id - ID or Passcode of the card.
name - Name of the card.
type* - The type of card you are viewing (Spell Card or Trap Card).
desc - Card description/effect.
race - The card race which is officially called type for Spell/Trap Cards (Field, Equip, Counter, etc).
*/
export class SpellCard implements ICard<SpellCardType> {
  id: number;
  name: string;
  race: string;
  archetype: string;
  type: SpellCardType;
  description: string;
  image: CardImage;

  constructor(card: any) {
    this.id = card.id;
    this.name = card.name;
    this.race = card.race;
    this.archetype = card.archetype;
    this.type = card.type;
    this.description = card.desc;
    this.image = card.card_images[0];
  }
}

/*
Trap Cards

id - ID or Passcode of the card.
name - Name of the card.
type* - The type of card you are viewing (Spell Card or Trap Card).
desc - Card description/effect.
race - The card race which is officially called type for Spell/Trap Cards (Field, Equip, Counter, etc).
*/
export class TrapCard implements ICard<TrapCardType> {
  id: number;
  name: string;
  race: string;
  archetype: string;
  type: TrapCardType;
  description: string;
  image: CardImage;

  constructor(card: any) {
    this.id = card.id;
    this.name = card.name;
    this.race = card.race;
    this.type = card.type;
    this.description = card.desc;
    this.image = card.card_images[0];
  }
}

// export type Card = MonsterCard | SpellCard | TrapCard;
