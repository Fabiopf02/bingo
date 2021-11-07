import { ICardsRepository } from '../../repositories/ICardsRepositories';

export class ListCardsService {
  constructor(private cardsRepository: ICardsRepository) {
    this.cardsRepository = cardsRepository;
  }

  async execute(cardListId: string) {
    const cards = await this.cardsRepository.findByList(cardListId);

    return cards;
  }
}
