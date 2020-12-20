const mongoose = require('mongoose')

const customerTagsSchema = new mongoose.Schema({
    customerId: String,
    scoringModelId:{type: String, required: true},
    ratingDate: {type: Date, default: Date.now()},
    tags:[
        {
            tag: {type: String, required: true},
            tagValue: Object
        }
    ],
    result: Object
}, {
	strict: false,
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

module.exports = mongoose.model('CustomerAttributeTags', customerTagsSchema)