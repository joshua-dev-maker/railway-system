const multer = require("multer");
const DataUri = require("datauri");
const path = require("path");
const cloudinary = require("../utils/cloudinary");

//multer config
// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext != ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported", false));
//       return;
//     }
//     cb(null, true);
//   },
// });

// const uploader = multer({
//   storage: multer.memoryStorage({}),
// });

// const uri = new DataUri();
// const dataUri = (file) => {
//   uri.format(path.extname(file.originalname).toString(), file.buffer);
// };

// module.exports = { uploader, dataUri };
