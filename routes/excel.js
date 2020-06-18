const express = require("express");
const router = express.Router();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var excelController = require("../controllers/excelController");



router.post("/posts", upload.single("xlsxFile"), excelController.insertExcelFile);

module.exports = router;