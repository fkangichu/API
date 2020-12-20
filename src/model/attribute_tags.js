const mongoose = require('mongoose')

const tagsSchema = new mongoose.Schema({
    tag: {type:String, required:true, unique:true},
    tagDescription: String,
    tagCategory: String
}, {
	strict: true,
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

module.exports = mongoose.model('AttributeTags', tagsSchema)