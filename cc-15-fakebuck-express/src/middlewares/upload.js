const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //Storage got an error if not will return null
    //pass value to ((null))
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const split = file.originalname.split(".");
    cb(
      null,
      "" +
        Date.now() +
        Math.round(Math.random() * 1000000) +
        "." +
        split[split.length - 1]
    );
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
