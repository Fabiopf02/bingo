import mongoose, { Document, Model, Schema } from 'mongoose';

export type CardListAttributes = {
  ownerId: string;
  title: string;
  text: string;
  qrCode: boolean;
  numberOfCards: number;
};

export type CardListDocument = CardListAttributes & Document;

type CardListModel = Model<CardListDocument>;

const CardListSchema = new Schema<CardListAttributes>(
  {
    ownerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    qrCode: {
      type: Boolean,
      required: true,
    },
    numberOfCards: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<CardListDocument, CardListModel>(
  'CardList',
  CardListSchema,
);
