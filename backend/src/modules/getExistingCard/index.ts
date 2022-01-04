import { MongoCardRepository } from '../../repositories/implementations/MongoCardsRepository';
import { GetExistingCardController } from './GetExistingCardController';
import { GetExistingCardService } from './GetExistingCardService';

const mongoCardRepository = new MongoCardRepository();
const getExistingCardService = new GetExistingCardService(mongoCardRepository);
const getExistingCardController = new GetExistingCardController(
  getExistingCardService,
);

export { getExistingCardController };
