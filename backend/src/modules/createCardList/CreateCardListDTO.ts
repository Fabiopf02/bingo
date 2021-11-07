export interface CreateCardListRequestDTO {
  ownerId: string;
  title: string;
  text?: string | null;
  qrCode: boolean;
  numberOfCards: number;
}
