import { Card } from '../../entities/Card';
import { ICardsRepository } from '../../repositories/ICardsRepositories';
import { MongoCardListRepository } from '../../repositories/implementations/MongoCardListRepository';
import { generateCardNumbers } from '../../utils/numbers';

const cardListRepository = new MongoCardListRepository();

export class CreateCardService {
  constructor(private cardsRepository: ICardsRepository) {
    this.cardsRepository = cardsRepository;
  }

  private generateCards(n: number, cardListId: string): Card[] {
    const cards: Card[] = [];
    for (let i = 1; i <= n; i += 1) {
      const cardNumbers = generateCardNumbers();
      const card = Card.create({
        cardListId,
        code: i,
        numbers: cardNumbers,
      });
      cards.push(card);
    }

    return cards;
  }

  async execute(cardListId: string, userId: string) {
    const cardListExists = await cardListRepository.findById(cardListId);

    if (!cardListExists) {
      throw new Error('Card List does not exist');
    }

    if (cardListExists.ownerId !== userId) {
      throw new Error('Operation not permitted!');
    }

    const cards = this.generateCards(cardListExists.numberOfCards, cardListId);

    const response = await this.cardsRepository.save(cards);

    return response;
  }
}
