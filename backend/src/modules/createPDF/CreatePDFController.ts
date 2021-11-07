import { Request, Response } from 'express';
import { readFileSync, rmSync } from 'fs';
import { CreatePDFService } from './CreatePDFService';

export class CreatePDFController {
  constructor(private createPDF: CreatePDFService) {
    this.createPDF = createPDF;
  }

  async handle(request: Request, response: Response) {
    try {
      const userId = request.headers.userid;
      const listId = request.headers.listid;

      const filePath = await this.createPDF.execute(userId, listId);

      response.contentType('application/pdf');
      const file = readFileSync(filePath);
      rmSync(filePath);
      return response.send(file);
      // return response.download(filePath);
    } catch (err: any) {
      return response
        .status(400)
        .json({ error: err.message || 'Unexpected error!' });
    }
  }
}
