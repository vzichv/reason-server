import { Schema, model, ObjectId } from 'mongoose';

export interface Offer {
  readonly _id: ObjectId;
  readonly header: string;
  readonly description: string;
  readonly button: string;
  readonly link: string;
}

const OfferSchema = new Schema<Offer> ({
  header: { type: String, unique: false, required: true, minlength: 1, maxlength: 14 },
  description: { type: String, unique: false, required: true, minlength: 1, maxlength: 128 },
  button: { type: String, unique: false, required: true, minlength: 1, maxlength: 20 },
  link: { type: String, unique: false, required: true, minlength: 1, maxlength: 512 }
});

export const OfferModel = model('Offer', OfferSchema);
