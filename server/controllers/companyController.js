const Company = require('../models/Company');

class companyController {
  // Create a new company
  static async createCompany(req, res) {
    const { companyName, email } = req.body;

    try {
      const company = await Company.create({ companyName, email });
      res.status(201).json(company);
    } catch (error) {
      console.error(`Error occurred while creating company: ${error.message}`);
      res.status(500).json({ error: 'An error occurred while creating company' });
    }
  }

  // Edit an existing company
  static async updateCompany(req, res) {
    const { id } = req.params;
    const { companyName, email } = req.body;

    try {
      const updatedCompany = await Company.findByIdAndUpdate(
        id,
        { companyName, email },
        { new: true }
      );

      if (!updatedCompany) {
        return res.status(404).json({ error: 'Company not found' });
      }

      res.status(200).json(updatedCompany);
    } catch (error) {
      console.error(`Error occurred while editing company: ${error.message}`);
      res.status(500).json({ error: 'An error occurred while editing company' });
    }
  }

  static async getAllCompanies(req, res) {
    try {
      const companies = await Company.find();
      res.status(200).json(companies);
    } catch (error) {
      console.error(`Error occurred while getting all companies: ${error.message}`);
      res.status(500).json({ error: 'An error occurred while getting all companies' });
    }
  }

  static async getOneCompany(req, res) {
    const { id } = req.params;

    try {
      const company = await Company.findById(id);
      
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }

      res.status(200).json(company);
    } catch (error) {
      console.error(`Error occurred while getting company by ID: ${error.message}`);
      res.status(500).json({ error: 'An error occurred while getting company by ID' });
    }
  }

 
}

module.exports = companyController;
