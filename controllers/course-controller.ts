import { Request, Response } from 'express';
import { Course, CourseModel } from './../models/course';

class CourseController {
  public async applyChanges(request: Request, response: Response): Promise<void> {
    try {
      const {courses, deletedCourses}: {courses: Course[], deletedCourses: string[]} = request.body;
      
      courses.forEach(async (course: Course) => {
        let courseIsFounded = await CourseModel.findByIdAndUpdate(course._id, course);
        if (courseIsFounded === null) {
          await CourseModel.create(course);
        }
      });
      
      deletedCourses.forEach(async (deletedCourse: string) => {
        await CourseModel.findByIdAndDelete(deletedCourse);
      })
      
      response.sendStatus(200);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  public async read(request: Request, response: Response): Promise<void> {
    try {
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
}

export default new CourseController();
