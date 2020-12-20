const mongoose = require('mongoose')

const scoringSchema = new mongoose.Schema({
    id: String,
    institution_id: String,
    modelName:String,
    model:[{
            id:String,
            characteristic: String,
            description: String,
            tag:{type: String, required: true, default: 'UNDEFINED'},
            weight: {type:Number, required:true},
            attributes:[
                {
                    attribute_id: String,
                    attribute: String,
                    score: {type:Number, required:true},
                    attributeType: {type: String, default: 'VALUE'}, //can be CODE or VALUE
                    attributeCode: String,
                    attributeMinValue: Number,
                    attributeMaxValue: Number
                }
            ]
        }
    ],
    scale:[
        {
            score: Number,
            name: String,
            rates : [
                {
                    rateType: String,
                    rate: Number,
                    amount: Number,
                    currency: String
                }
            ]
        }
    ],
    pre_conditions:[
        {
            tag: String,
            tagValue: Object 
        },
    ],
    credit_bureaus:[
        {
            ref_id : {type: String, require: true}
        } 
    ]
}, {
	strict: false,
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

module.exports = mongoose.model('Scoring', scoringSchema)