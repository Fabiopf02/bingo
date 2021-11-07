import { Card } from '../entities/Card';
import { CardDocument } from '../schemas/Card';

export interface ICardsRepository {
  save(data: Card[]): Promise<Card[]>;
  findById(id: string): Promise<(Card & { _id: string }) | null>;
  findByList(listId: string): Promise<CardDocument[]>;
}
