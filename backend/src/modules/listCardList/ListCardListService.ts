import { ICardListRepository } from '../../repositories/ICardListRepositories';

export class ListCardListService {
  constructor(private cardListRepository: ICardListRepository) {
    this.cardListRepository = cardListRepository;
  }

  async execute(userId: string) {
    const cardList = await this.cardListRepository.findByUser(userId);

    return cardList;
  }
}
