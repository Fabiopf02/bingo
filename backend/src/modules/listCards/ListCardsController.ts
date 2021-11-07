import { Request, Response } from 'express';
import { ListCardsService } from './ListCardService';

export class ListCardsController {
  constructor(private listCards: ListCardsService) {
    this.listCards = listCards;
  }

  async handle(request: Request, response: Response) {
    try {
      const listId = request.headers.listid;

      const cards = await this.listCards.execute(String(listId));

      return response.status(200).json(cards);
    } catch (err: any) {
      return response
        .status(400)
        .json({ error: err.message || 'Unexpected error!' });
    }
  }
}
