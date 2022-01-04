import { ICardsRepository } from '../../repositories/ICardsRepositories';

export class GetExistingCardService {
  constructor(private cardsRepository: ICardsRepository) {
    this.cardsRepository = cardsRepository;
  }

  async execute(cardListId: string) {
    const cardsExists = await this.cardsRepository.findByList(cardListId);

    if (cardsExists.length) {
      return true;
    }

    return false;
  }
}
