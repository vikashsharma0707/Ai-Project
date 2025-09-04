import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const uploadDir = path.join(root, 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '_').slice(0, 40);
    cb(null, `${Date.now()}_${base}${ext}`);
  }
});

// function fileFilter(_req, file, cb) {
//   if (!/image\/(png|jpe?g|webp)/.test(file.mimetype)) return cb(new Error('Only image files allowed'));
//   cb(null, true);
// }

function fileFilter(_req, file, cb) {
  const allowed = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/WEBP",
    "image/avif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
    "application/zip",
    "application/x-zip-compressed",
    "text/plain"
  ];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("File type not allowed"));
  }
  cb(null, true);
}


export const upload = multer({ storage, fileFilter, limits: { fileSize: 3 * 1024 * 1024 } });
