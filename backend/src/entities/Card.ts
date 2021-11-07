export class Card {
  code: number;

  numbers: number[][];

  cardListId: string;

  constructor(data: Card) {
    this.code = data.code;
    this.numbers = data.numbers;
    this.cardListId = data.cardListId;
  }

  static create(data: Card): Card {
    const card = new Card(data);

    return card;
  }
}
