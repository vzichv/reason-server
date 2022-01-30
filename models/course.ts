import { Schema, model, ObjectId } from 'mongoose';

export interface Course {
  readonly _id: ObjectId;
  readonly name: string;
  readonly subcategory?: Subcategory[];
}

interface Subcategory {
  readonly name: string;
  readonly subcategory?: string[];
}

const SubcategorySchema = new Schema<Subcategory> ({
  name: { type: String, unique: false, required: true, minlength: 1, maxlength: 64 },
  subcategory: { type: [String], unique: false, required: false, minlength: 1, maxlength: 64 }
});

const CourseSchema = new Schema<Course> ({
  name: { type: String, unique: false, required: true, minlength: 1, maxlength: 64 },
  subcategory: { type: [SubcategorySchema], unique: false, required: false }
});

export const CourseModel = model('Course', CourseSchema);
