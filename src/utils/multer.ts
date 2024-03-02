import multer from "multer";
import path from "path";
export const p: string = path.join(__dirname, "../../uploads");

declare global {
  namespace Express {
    interface Request {
      fileName: string;
    }
  }
}

const storage = multer.diskStorage({
  destination(req, file, callback) {
    return callback(null, p);
  },
  filename(req, file, callback) {
    const fileName = Date.now().toString() + "data.csv";
    req.fileName = fileName;
    return callback(null, fileName);
  },
});

export const upload = multer({ storage: storage });
