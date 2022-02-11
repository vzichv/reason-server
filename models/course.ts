import { Schema, model, ObjectId } from 'mongoose';

export interface Course {
  readonly _id: ObjectId;
  readonly name: string;
  readonly price?: number; 
  readonly subcategory?: string[];
}

const CourseSchema = new Schema<Course> ({
  name: { type: String, unique: false, required: true, minlength: 1, maxlength: 64 },
  price: { type: Number, unique: false, required: false, min: 0, max: 1000000 },
  subcategory: { type: [String], unique: false, required: false, minlength: 1, maxlength: 64 }
});

export const CourseModel = model('Course', CourseSchema);
