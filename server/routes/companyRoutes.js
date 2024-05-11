const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");



router.post('/newCompany',authMiddleware.authorize("ceo"),companyController.createCompany);

// Route for editing an existing company
router.put('/updateCompany/:id',authMiddleware.authorize("ceo") ,companyController.updateCompany);
router.get('/getAllCompanies',authMiddleware.authorize("ceo") ,companyController.getAllCompanies);
router.get('/getCompany/:id',authMiddleware.authorize("ceo"||"manager") ,companyController.getOneCompany);
module.exports = router;