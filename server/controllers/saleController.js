require('dotenv').config();
const Sale = require('../models/Sale');
const ObjectId = require('mongodb').ObjectId;
const jwt = require("jsonwebtoken");
const Customer= require("../models/Customer")
const mongoose= require("mongoose");



exports.updateOrderStatus = async (req, res) => {
    try {
        const _id = req.params;
        const { orderStatus } = req.body;
        
        const updatedOrder = await Sale.findById(_id);

        if (!updatedOrder) {
            return res.status(404).json({ message: 'SALE not found' });
        }

        updatedOrder.orderStatus = orderStatus;
        await updatedOrder.save();

        res.status(200).json({ message: 'Order status updated successfully', orderStatus: orderStatus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};







//payment status

exports.updatePaymentStatus = async (req, res) => {
  try {
      const _id = req.params;
      const { paymentStatus } = req.body;
      
      const updatedPayment = await Sale.findById(_id);

      if (!updatedPayment) {
          return res.status(404).json({ message: 'SALE not found' });
      }
      if (updatedPayment.paymentStatus=="completed"){
        return res.status(404).json({ message: 'payment already completed. you can not update it' });
      }


      updatedPayment.paymentStatus = paymentStatus;
      await updatedPayment.save();

      res.status(200).json({ message: 'payment status updated successfully', paymentStatus });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},
exports.addSales =   async (req, res) =>  {
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

exports.addSales =   async (req, res) => {
    try {
      const token = req.header("Authorization").split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.jwtWebTokenKey);
      const employeeId = decodedToken.employeeId;
      const companyId = decodedToken.companyId
    //   console.log(req.file)
     console.log(req.file.buffer)
      const photoBase64=  req.file.buffer.toString('base64');
      console.log(photoBase64)

  
      const {
        
        saleName,
        price,
        quantity,
        serialNumber,
        amountPaid,
        category,
        orderStatus,
        orderedAt,
        deliveredAt,
        receiptPhoto,
        paymentStatus,
        customerId,
        description
      } = req.body;
      
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: "customer not exists" });
      }
      
      console.log(customer);
      const customerName = customer.customerName
      console.log(customerName);
      const sale = new Sale({
        companyId,
        employeeId,
        saleName,
        price,
        quantity,
        serialNumber: serialNumber?? "",
        amountPaid,
        category,
        orderStatus: orderStatus??  "planning",
        orderedAt,
        deliveredAt,
        receiptPhoto:photoBase64,
        paymentStatus: paymentStatus??  "pending",
        customerId,
        customerName:customerName,
        description
        
      });

      await sale.save();
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }