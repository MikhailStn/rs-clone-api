const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
  destination(req: any, file: any, cb: any) {
    cb(null, "uploads/");
  },
  filename(req: any, file: any, cb: any) {
    const date = moment().format("DDMMYYYY-HHmmss_SSS");
    const fileName1 = `${date}-${file.originalname}`;
    cb(null, fileName1);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
  storage,
  fileFilter,
  limits,
});
