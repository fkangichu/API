const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const loanApplication = new mongoose.Schema({
    customer_id: {type: Schema.Types.ObjectId,ref: 'Customer', required: true, immutable: true},
    institution_id: {type: String, required: true, immutable: true},
    currency:   {type: String, required: true, immutable: true},
    loan_amount:    {type: Number, required: true, immutable: true},
    loan_balance: Number,
    loan_status: String,
    interest_rate: {type: Number, default: 0.0},
    repayment_amount: Number,
    repayment_period: String,
    last_payment_date: Date,
    next_payment_date: Date,
    account_number: String

}, {
	strict: false,
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

module.exports = mongoose.model('LoanApplication', loanApplication)