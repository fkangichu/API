const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    customerId:String,
    scoringModelId:{type: String, required: true},
    responses:[
        {
            characteristicId: {type:String, require:true},
            attributeId: {type:String, require:true}
        }
    ],
    result: Object
}, {
	strict: false,
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

module.exports = mongoose.model('Rating', ratingSchema)