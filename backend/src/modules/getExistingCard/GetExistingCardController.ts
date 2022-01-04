import { Request, Response } from 'express';
import { GetExistingCardService } from './GetExistingCardService';

export class GetExistingCardController {
  constructor(private getCards: GetExistingCardService) {
    this.getCards = getCards;
  }

  async handle(request: Request, response: Response) {
    try {
      const listId = request.headers.listid;

      const cards = await this.getCards.execute(String(listId));

      return response.status(200).json({ cardsExists: cards });
    } catch (err: any) {
      return response
        .status(400)
        .json({ error: err.message || 'Unexpected error!' });
    }
  }
}
