import mongoose, { Document, Model, Schema } from 'mongoose';

export type CardAttributes = {
  code: number;
  numbers: number[][];
  cardListId: string;
};

export type CardDocument = Document & CardAttributes;

type CardModel = Model<CardDocument>;

const CardSchema = new Schema<CardAttributes>(
  {
    cardListId: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
      trim: true,
    },
    numbers: {
      type: [[Number]],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<CardDocument, CardModel>('Card', CardSchema);
