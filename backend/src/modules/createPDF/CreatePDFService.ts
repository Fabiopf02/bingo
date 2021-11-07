import { ICardListRepository } from '../../repositories/ICardListRepositories';
import { ICardsRepository } from '../../repositories/ICardsRepositories';
import { draw } from '../../utils/pdf';

export class CreatePDFService {
  constructor(
    private cardsRepository: ICardsRepository,
    private cardListRepository: ICardListRepository,
  ) {
    this.cardsRepository = cardsRepository;
    this.cardListRepository = cardListRepository;
  }

  async execute(userId: string, listId: string) {
    const cardList = await this.cardListRepository.findById(listId);

    if (!cardList || cardList?.ownerId !== userId) {
      throw new Error('Operation not permitted');
    }

    const cards = await this.cardsRepository.findByList(listId);

    const filePath = await draw(cards, cardList.qrCode, cardList.title);

    function wait(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    await wait(1000);

    return filePath;
  }
}
