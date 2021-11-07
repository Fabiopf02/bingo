import { MongoCardListRepository } from '../../repositories/implementations/MongoCardListRepository';
import { ListCardListController } from './ListCardListController';
import { ListCardListService } from './ListCardListService';

const mongoCardListRepository = new MongoCardListRepository();
const listCardListService = new ListCardListService(mongoCardListRepository);
const listCardListController = new ListCardListController(listCardListService);

export { listCardListController };
