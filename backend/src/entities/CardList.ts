export class CardList {
  ownerId: string;

  title: string;

  text?: string | null;

  qrCode: boolean;

  numberOfCards: number;

  constructor(data: CardList) {
    this.title = data.title;
    this.text = data.text;
    this.qrCode = data.qrCode;
    this.numberOfCards = data.numberOfCards;
    this.ownerId = data.ownerId;
  }

  static create(data: CardList): CardList {
    const cardList = new CardList(data);

    return cardList;
  }
}
