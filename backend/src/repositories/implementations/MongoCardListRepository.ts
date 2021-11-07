import { CardList } from '../../entities/CardList';
import CardSchema from '../../schemas/CardList';
import { ICardListRepository } from '../ICardListRepositories';

export class MongoCardListRepository implements ICardListRepository {
  async save(data: CardList): Promise<string | null> {
    const response = await CardSchema.create(data);

    if (!response) {
      return null;
    }

    return response._id;
  }

  async findByUser(userId: string): Promise<CardList[]> {
    const response = await CardSchema.find({ ownerId: userId });

    return response;
  }

  async findById(id: string): Promise<CardList | null> {
    const response = await CardSchema.findById(id);

    if (!response) {
      return null;
    }

    return {
      ownerId: response.ownerId,
      title: response.title,
      text: response.text,
      numberOfCards: response.numberOfCards,
      qrCode: response.qrCode,
    };
  }
}
