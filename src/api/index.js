const express = require("express");
const router = express.Router();

//middleware
const upload = require("../middleware/upload");
const requireAuth = require("../middleware/authcheck");

//controller
const superadminController = require('../controllers/superadmin.controller');
const datauploadController = require('../controllers/dataupload.controller');
const studentController    = require('../controllers/student.controller');
const resultController     = require('../controllers/result.controller');
const singleresultController   = require('../controllers/singleresult.controller');
const resultstatisticsController = require('../controllers/resultstatistics.controller')
const failstatisticsController = require('../controllers/failstatistics.controller')
const allpassController = require('../controllers/allpass.controller')




router.post('/admin/super', superadminController.superAdmin);
router.post('/admin/super/login', superadminController.loginsuperAdmin);
// router.post("/upload", upload.single("file"), fileuploadController.fileSave);
// router.post("/show", fileuploadController.fileShow);
// router.post("/show/result",requireAuth, resultshowController.studentInfo);
router.post("/dataupload/group", datauploadController.dataUploads);
//router.post("/dataupload", datauploadController.dataUploadsSave);



router.post("/student", upload.single("file"), studentController.studentdataSave);
router.post("/student/upload", studentController.studentdataSaveInput);
router.post("/subject", upload.single("file"), resultController.resultSave);
router.post("/single/result", singleresultController.singleStudentResult)
router.post("/result/statistics", resultstatisticsController.resultStatistics)
router.post("/fail/statistics", failstatisticsController.failStatistics);
router.post("/all/pass", allpassController.allpassStatistics)


module.exports = router;