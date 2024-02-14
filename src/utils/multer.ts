import multer from "multer";
import path from "path";
export const p: string = path.join(__dirname, "../controllers/user/uploads");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    return callback(null, p);
  },
  filename(req, file, callback) {
    return callback(null, "data.csv");
  },
});

export const upload = multer({ storage: storage });
