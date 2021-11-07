import { Card } from '../../entities/Card';
import CardSchema, { CardDocument } from '../../schemas/Card';
import { ICardsRepository } from '../ICardsRepositories';

export class MongoCardRepository implements ICardsRepository {
  async save(data: Card[]): Promise<Card[]> {
    const response = await CardSchema.insertMany(data);

    return response;
  }

  async findById(id: string): Promise<(Card & { _id: string }) | null> {
    const card = await CardSchema.findById(id);

    if (!card) {
      return null;
    }

    return {
      _id: card.id,
      code: card.code,
      numbers: card.numbers,
      cardListId: card.cardListId,
    };
  }

  async findByList(listId: string): Promise<CardDocument[]> {
    const cards = await CardSchema.find({ cardListId: listId });

    return cards;
  }
}
