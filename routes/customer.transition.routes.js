const express = require("express");
const { TransactionModel } = require("../models/customer.transaction.model");
const { Authentication } = require("../middelware/authentication");
const { AdminAuthentication } = require("../middelware/adminauth");

const TransactionRoutes = express.Router();

TransactionRoutes.get("/", Authentication, async (req, res) => {
  try {
    const transactions = await TransactionModel.findOne({
      userId: req.body.userId,
    });
    res.status(200).send(transactions);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

TransactionRoutes.post("/:type", Authentication, async (req, res) => {
  const userId = req.body.userId;
  const type = req.params.type;
  const amount = +req.body.amount;
  try {
    const trans = await TransactionModel.find({ userId });

    if (trans.length < 1) {
      const t = await TransactionModel.create({
        balance: amount,
        transactionRecords: [
          {
            type: "deposite",
            date: new Date(),
            amount: amount,
          },
        ],
        userId: userId,
      });
      res.status(201).send(t);
    } else if (type == "withdraw") {
      const t = await TransactionModel.findOneAndUpdate(
        { _id: trans[0]._id },
        {
          balance: +trans[0].balance - amount,
          transactionRecords: [
            ...trans[0].transactionRecords,
            { type: "withdraw", date: new Date(), amount: amount },
          ],

          userId: userId,
        }
      );
      res.status(201).send(t);
    } else if (type == "deposite") {
      const t = await TransactionModel.findOneAndUpdate(
        { _id: trans[0]._id },
        {
          balance: +trans[0].balance + amount,
          transactionRecords: [
            ...trans[0].transactionRecords,
            { type: "deposite", date: new Date(), amount: amount },
          ],

          userId: userId,
        }
      );
      res.status(201).send(t);
    } else {
      res.status(200).send("type mismatch");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

TransactionRoutes.get(
  "/transaction/:id",
  AdminAuthentication,
  async (req, res) => {
    let id = req.params.id;

    try {
      const transaction = await TransactionModel.findOne({
        userId: id,
      });
      res.status(200).send(transaction);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

module.exports = { TransactionRoutes };
