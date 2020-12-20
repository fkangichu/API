const boom = require('boom')

const Rating = require('../model/customer_rating')
const Scoring = require('../model/scoring')


//Score customer / entity

exports.getCustomerRating = async(request, response)=>{
    try {
        
        const ratingAttributes = new Rating(request.body)
        ratingAttributes.save()

        var weightedScores = new Array()
        var finalScore = null
        var finalScoreName = 'Undefined'
        var finalRate = null
        var institutionId = null

        if(ratingAttributes.scoringModelId){
            const scoringModel = await Scoring.findById(ratingAttributes.scoringModelId)

            if(scoringModel == null){
                throw new Error('Invalid Model ID')            
            }
            institutionId = scoringModel.institution_id

            ratingAttributes.responses.forEach(element => {
                var weight = 0
                var score = 0
                //Get the question / characteristic assoc. with current response
                /*const characteristic = scoringModel.model.find(function(item, i){
                    if(item._id.toString() === element.characteristicId){
                      index = i;
                      return i;
                    }
                });*/
                var index = scoringModel.model.findIndex(item => item._id.toString()==element.characteristicId);
                const characteristic = scoringModel.model[index]
                //if valid characteristic
                if(characteristic != undefined){

                    weight = parseFloat(characteristic.weight.toString())
                    //Get the response assoc. with current response
                    /*const response = characteristic.attributes.find(function(item, i){
                        if(item._id.toString() === element.attributeId){
                          index = i;
                          return i;
                        }
                    });*/

                    index = characteristic.attributes.findIndex(item => item._id.toString()==element.attributeId);
                    const response = characteristic.attributes[index]

                    if(response != undefined){
                        score = parseFloat(response.score.toString())
                    }
                }

                weightedScores.push(weight*score)
            });

            finalScore = weightedScores.reduce(function(a, b) { return a + b; }, 0);
            //Score uses upper Limit values
            const scale = scoringModel.scale
            if(scale != undefined){
                scale.sort(function (a, b) {
                    return a.score - b.score;
                });
                
                /*const finalScale = scale.forEach((item, index) =>{
                    if(parseFloat(finalScore.toString()) <= parseFloat(item.score.toString())){
                        return item
                    }
                });*/
                var finalScale = null

                for(var i= 0; i < scale.length; i++){
                    if(parseFloat(finalScore.toString()) <= parseFloat(scale[i].score.toString())){
                        finalScale = scale[i]
                        break
                    }
                }
                if(finalScale){
                    finalScoreName = finalScale.name
                    finalRate = finalScale.rates
                }

            }
        }
        const ratingResult = {finalScore: finalScore, finalScoreName: finalScoreName, rates: finalRate, institution_id:institutionId }
        
        //Update Generated Result
        ratingAttributes.result = ratingResult

        const id = ratingAttributes._id.toString()

        await Rating.findByIdAndUpdate(id, ratingAttributes, { new: true })
        
        return ratingResult

    } catch (error) {
        throw boom.boomify(error)
    }
}