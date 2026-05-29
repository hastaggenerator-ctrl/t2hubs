import express from 'express';
import multer from 'multer';
import path from 'path';
import { createCertificate, downloadCertificate, emailCertificate, verifyCertificate } from '../controllers/certificateController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(process.cwd(), 'uploads', 'certificates'));
	},
	filename: (req, file, cb) => {
		const name = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
		cb(null, name);
	}
});

const upload = multer({ storage });

router.get('/verify/:certificateId', verifyCertificate);
router.get('/download/:certificateId', downloadCertificate);
router.post('/', protect, authorize('admin'), upload.single('pdf'), createCertificate);
router.post('/send-email', protect, authorize('admin'), emailCertificate);

export default router;

