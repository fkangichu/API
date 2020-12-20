const boom = require('boom')

const Tags = require('../model/attribute_tags')

//Get all Tags
exports.getTags = async(request, response) =>{
    try {
        const tags = await Tags.find()
        return tags

    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getTagById = async(request, response)=>{
    try {
        const id = request.params.id
        const tag = await Tags.findById(id)
        return tag

      } catch (error) {
        throw boom.boomify(error)
      }
}

exports.addTag = async(request, response)=>{
    try {
        const tagModel = new Tags(request.body)
        return tagModel.save()
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.addTags = async(request, response)=>{
  try {
     const tagsModel = Tags.insertMany(request.body)

     return tagsModel
  } catch (error) {
      throw boom.boomify(error)
  }
}

exports.updateTag = async (request, response) => {
    try {
      const id = request.params.id
      const tagModel = request.body
      const { ...updateData } = tagModel
      const update = await Tags.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (error) {
      throw boom.boomify(error)
    }
}

exports.deleteTag = async (request, response) => {
    try {
      const id = request.params.id
      const tag = await Tags.findByIdAndRemove(id)
      return tag
    } catch (error) {
      throw boom.boomify(error)
    }
}