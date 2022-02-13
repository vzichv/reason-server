import { Schema, model, ObjectId } from 'mongoose';

export interface Review {
  readonly _id: ObjectId;
  readonly name: string;
  readonly text: string;
}

const ReviewSchema = new Schema<Review> ({
  name: { type: String, unique: false, required: true, minlength: 1, maxlength: 64 },
  text: { type: String, unique: false, required: true, minlength: 1, maxlength: 512 }
});

export const ReviewModel = model('Review', ReviewSchema);
