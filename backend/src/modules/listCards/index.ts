import { MongoCardRepository } from '../../repositories/implementations/MongoCardsRepository';
import { ListCardsController } from './ListCardsController';
import { ListCardsService } from './ListCardService';

const mongoCardRepository = new MongoCardRepository();
const listCardsService = new ListCardsService(mongoCardRepository);
const listCardsController = new ListCardsController(listCardsService);

export { listCardsController };
