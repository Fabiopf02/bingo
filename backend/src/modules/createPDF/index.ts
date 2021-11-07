import { MongoCardListRepository } from '../../repositories/implementations/MongoCardListRepository';
import { MongoCardRepository } from '../../repositories/implementations/MongoCardsRepository';
import { CreatePDFController } from './CreatePDFController';
import { CreatePDFService } from './CreatePDFService';

const mongoCardListRepository = new MongoCardListRepository();
const mongoCardRepository = new MongoCardRepository();

const createPDFService = new CreatePDFService(
  mongoCardRepository,
  mongoCardListRepository,
);

const createPDFController = new CreatePDFController(createPDFService);

export { createPDFController };
