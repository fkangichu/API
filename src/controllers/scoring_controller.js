const boom = require('boom')

const Scoring = require('../model/scoring')


//Get all scoring models
exports.getScoringModels = async(request, response) =>{
    try {
        const scoringModels = await Scoring.find()
        return scoringModels

    } catch (error) {
        throw boom.boomify(error)
    }
}

//get a single scoring model
exports.getScoringModelsById = async(request, response)=>{
    try {
        const id = request.params.id
        const scoringModel = await Scoring.findById(id)
        return scoringModel

      } catch (error) {
        throw boom.boomify(error)
      }
}

// Add a new Scoring Model
exports.addScoringModel = async(request, response)=>{
    try {
        const scoringModel = new Scoring(request.body)
        return scoringModel.save()
    } catch (error) {
        throw boom.boomify(error)
    }
}


// Update an existing Scoring Model
exports.updateScoringModel = async (request, response) => {
    try {
      const id = request.params.id
      const scoringModel = request.body
      const { ...updateData } = scoringModel
      const update = await Scoring.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (error) {
      throw boom.boomify(error)
    }
}