import { CardList } from '../../entities/CardList';
import { ICardListRepository } from '../../repositories/ICardListRepositories';
import { CreateCardListRequestDTO } from './CreateCardListDTO';

export class CreateCardListService {
  constructor(private cardListRepository: ICardListRepository) {
    this.cardListRepository = cardListRepository;
  }

  async execute(data: CreateCardListRequestDTO) {
    const cardListCreate = CardList.create(data);

    const id = await this.cardListRepository.save(cardListCreate);

    return id;
  }
}
