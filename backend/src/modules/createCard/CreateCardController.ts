import { Request, Response } from 'express';
import { CreateCardService } from './CreateCardService';

export class CreateCardController {
  constructor(private createCards: CreateCardService) {
    this.createCards = createCards;
  }

  async handle(request: Request, response: Response) {
    try {
      const listId = request.headers.listid;
      const userId = request.headers.userid;

      const cards = await this.createCards.execute(listId, userId);

      return response.status(201).json(cards);
    } catch (err: any) {
      return response
        .status(400)
        .json({ error: err.message || 'Unexpected error!' });
    }
  }
}
