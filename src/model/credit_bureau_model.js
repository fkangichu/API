const mongoose = require('mongoose')

const bureauResponse = new mongoose.Schema({
    ref_id: {type:String, required:true},
    customer_id: String,
    response: Object
}, {
	strict: false,
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

module.exports = mongoose.model('BureauResponse', bureauResponse)