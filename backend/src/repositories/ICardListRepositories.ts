import { CardList } from '../entities/CardList';

export interface ICardListRepository {
  save(data: CardList): Promise<string | null>;
  findByUser(userId: string): Promise<CardList[]>;
  findById(id: string): Promise<CardList | null>;
}
