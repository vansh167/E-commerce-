const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Create folder if it doesn't exist
const uploadDir = path.join(__dirname, 'upload', 'image');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb+srv://kartikdhiman046_db_user:07070707070707@cluster0.skuh7x3.mongodb.net/", {
    // Remove deprecated options
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("✅ Express App is Running");
});

// ✅ Multer Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/image');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// ✅ Serve uploaded files statically
app.use('/image', express.static('upload/image'));

// ✅ Upload Route
app.post('/upload', upload.single('product'), (req, res) => {
  console.log('📥 File received:', req.file);
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('Upload successful');
});

// ✅ Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log(`✅ Server running on port ${port}`);
  } else {
    console.log("❌ Error: " + error);
  }
});
