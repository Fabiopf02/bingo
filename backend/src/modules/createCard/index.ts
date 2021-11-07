import { MongoCardRepository } from '../../repositories/implementations/MongoCardsRepository';
import { CreateCardController } from './CreateCardController';
import { CreateCardService } from './CreateCardService';

const mongoCardRepository = new MongoCardRepository();
const createCardService = new CreateCardService(mongoCardRepository);
const createCardController = new CreateCardController(createCardService);

export { createCardController };
