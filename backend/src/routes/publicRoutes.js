import express from 'express';
import { contact, homeData, registerInterest } from '../controllers/publicController.js';
import Internship from '../models/Internship.js';
import Seminar from '../models/Seminar.js';
import { list, getOne } from '../controllers/crudController.js';

const router = express.Router();

router.get('/home', homeData);
router.get('/internships', list(Internship));
router.get('/internships/:id', getOne(Internship));
router.get('/seminars', list(Seminar));
router.post('/contact', contact);
router.post('/register-interest', registerInterest);

export default router;
