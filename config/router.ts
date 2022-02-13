// Dependencies
import express, { Router } from 'express';
import cookieParser from 'cookie-parser';

// Controllers
import AdminController from './../controllers/admin-controller';
import CourseController from './../controllers/course-controller';
import ReviewController from './../controllers/review-controller';

// .env variables
const DEFAULT_SECRET_COOKIE: string = '1234567890';
const SECRET_COOKIE: string = process.env.SECRET_COOKIE ? process.env.SECRET_COOKIE : DEFAULT_SECRET_COOKIE;

const router: Router = Router();

// Global middlewares
router.use(cookieParser(SECRET_COOKIE), express.json());
router.use((request, response, next) => {
  response.set('Access-Control-Allow-Origin', `http://localhost:3000`);
  response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.set('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  next();
});

// AdminController
router.post('/api/login', AdminController.login);
router.post('/api/logout', AdminController.logout);
router.get('/api/refresh', AdminController.refresh);

// CourseController
router.post('/api/courses', CourseController.applyChanges);
router.get('/api/courses', CourseController.read);

// ReviewController
router.post('/api/reviews', ReviewController.applyChanges);
router.get('/api/reviews', ReviewController.read);

// OfferController

// ApplicationController

export default router;
