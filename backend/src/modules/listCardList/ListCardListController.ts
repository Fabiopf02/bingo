import { Request, Response } from 'express';
import { ListCardListService } from './ListCardListService';

export class ListCardListController {
  constructor(private listCardList: ListCardListService) {
    this.listCardList = listCardList;
  }

  async handle(request: Request, response: Response) {
    try {
      const userId = request.headers.userid;

      const cardList = await this.listCardList.execute(userId);

      return response.status(200).json(cardList);
    } catch (err: any) {
      return response
        .status(400)
        .json({ error: err.message || 'Unexpected error!' });
    }
  }
}
