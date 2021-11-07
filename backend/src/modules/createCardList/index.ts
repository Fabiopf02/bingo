import { MongoCardListRepository } from '../../repositories/implementations/MongoCardListRepository';
import { CreateCardListController } from './CreateCardListController';
import { CreateCardListService } from './CreateCardListService';

const mongoCardListRepository = new MongoCardListRepository();
const createCardListService = new CreateCardListService(
  mongoCardListRepository,
);
const createCardListController = new CreateCardListController(
  createCardListService,
);

export { createCardListController };
