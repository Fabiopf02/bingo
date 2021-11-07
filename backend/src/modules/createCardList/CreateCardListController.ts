import { Request, Response } from 'express';
import { CreateCardListRequestDTO } from './CreateCardListDTO';
import { CreateCardListService } from './CreateCardListService';

export class CreateCardListController {
  constructor(private createCardList: CreateCardListService) {
    this.createCardList = createCardList;
  }

  async handle(request: Request, response: Response) {
    try {
      const { title, text, qrCode, numberOfCards } =
        request.body as CreateCardListRequestDTO;
      const ownerId = request.headers.userid;

      const id = await this.createCardList.execute({
        title,
        text,
        qrCode,
        numberOfCards,
        ownerId,
      });

      return response.status(201).json({ _id: id });
    } catch (err: any) {
      return response
        .status(400)
        .json({ error: err.message || 'Unexpected error!' });
    }
  }
}
