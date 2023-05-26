const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    balance: { type: Number, required: true, default: 0 },
    transactionRecords: [
      {
        type: { type: String, required: true },
        date: { type: Date, default: new Date() },
        amount: { type: Number },
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const TransactionModel = mongoose.model("transaction", transactionSchema);

module.exports = { TransactionModel };

/*
Transactions Page: Login should take the customer to the transactions 
page to see all of its transaction records along with Deposit and 
Withdraw buttons. Clicking on either of the buttons should open up a 
popup showing available balance along with a numeric input field to 
enter the amount for deposit/withdrawal. Withdrawal will deduct & 
deposit will add to the balance amount. If the withdrawal amount 
entered is greater than the balance amount then show a message, 
"Insufficient Funds".  
*/
