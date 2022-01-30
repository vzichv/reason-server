// Dependencies
import express, { Router } from 'express';
import cookieParser from 'cookie-parser';

// Controllers
import AdminController from './../controllers/admin-controller';
import CourseController from './../controllers/course-controller';

// .env variables
const DEFAULT_SECRET_COOKIE: string = '1234567890';
const SECRET_COOKIE: string = process.env.SECRET_COOKIE ? process.env.SECRET_COOKIE : DEFAULT_SECRET_COOKIE;

const router: Router = Router();

// Global middlewares
router.use(cookieParser(SECRET_COOKIE), express.json());

// AdminController
router.post('/api/login', AdminController.login);
router.post('/api/logout', AdminController.logout);
router.get('/api/refresh', AdminController.refresh);

// CourseController
router.post('/api/courses', CourseController.create);
router.get('/api/courses', CourseController.read);
router.put('/api/courses', CourseController.update);
router.delete('/api/courses', CourseController.delete);

// ReviewController

// OfferController

// ApplicationController

export default router;
