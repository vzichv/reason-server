import { Request, Response } from 'express';
import { Review, ReviewModel } from './../models/review';

class ReviewController {
  public async applyChanges(request: Request, response: Response): Promise<void> {
    try {
      const {reviews, deletedReviews}: {reviews: Review[], deletedReviews: string[]} = request.body;

      reviews.forEach(async (review: Review) => {
        let reviewIsFounded = await ReviewModel.findByIdAndUpdate(review._id, review);
        if (reviewIsFounded === null) {
          await ReviewModel.create(review);
        }
      });

      deletedReviews.forEach(async (deletedReview: string) => {
        await ReviewModel.findByIdAndDelete(deletedReview);
      })
      
      response.sendStatus(200);
    } catch (error: any) {
      response.status(500).json(error.message);
    }
  }

  public async read(request: Request, response: Response): Promise<void> {
    try {
      await ReviewModel.find(request.query).lean().exec(
        (error: any, data: Review[]): void => {
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

export default new ReviewController();
