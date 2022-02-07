import { Request, Response } from 'express';
import { Course, CourseModel } from './../models/course';

class CourseController {
  public async create(request: Request, response: Response): Promise<void> {
    try {
      await CourseModel.create(request.body);
      response.sendStatus(200);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  public async read(request: Request, response: Response): Promise<void> {
    try {
      response.set('Access-Control-Allow-Origin', `http://localhost:3000`);
      await CourseModel.find(request.query).lean().exec(
        (error: any, data: Course[]): void => {
          if (error) {
            response.status(500).json(error);
          }
          response.status(200).json(data);
        }
      );
    } catch (error) {
      response.status(500).json(error);
    }
  }

  public async update(request: Request, response: Response): Promise<void> {
    try {
      const updatedCourses: Course[] = request.body.update;
      updatedCourses.map( async (course) => await CourseModel.updateOne({ _id: course._id }, course));
      response.sendStatus(200);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  public async delete(request: Request, response: Response): Promise<void> {
    try {
      await CourseModel.deleteOne(request.body);
      response.sendStatus(200);
    } catch (error) {
      response.status(500).json(error);
    }
  }
}

export default new CourseController();
