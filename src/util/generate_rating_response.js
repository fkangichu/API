const Scoring = require('../model/scoring')

exports.generateResponse = async(request)=>{

    var result = {
        customerId:request.customerId,
        scoringModelId:request.scoringModelId,
        responses:[
        ]
    }
    const scoringModelId = request.scoringModelId

    const scoringModel = await Scoring.findById(scoringModelId)

    request.tags.forEach(tag => {
        //now loop the questions

        scoringModel.model.forEach(characteristic => {
            if(tag.tag.toString() == characteristic.tag){
                //Now loop the reponses
                characteristic.attributes.forEach(charResponse => {
                    //Code is a one to one match
                    if(charResponse.attributeType == 'CODE'){
                        if(charResponse.attributeCode.toString() == tag.tagValue.toString()){
                            result.responses.push({
                                characteristicId: characteristic._id.toString(),
                                attributeId: charResponse._id.toString()
                            })
                        }
                    }
                    else{
                        if(parseFloat(tag.tagValue) >= parseFloat(charResponse.attributeMinValue) && parseFloat(tag.tagValue) <= parseFloat(charResponse.attributeMaxValue)){
                            result.responses.push({
                                characteristicId: characteristic._id.toString(),
                                attributeId: charResponse._id.toString()
                            }) 
                        }
                    }
                });
            }
        });
    });

    return result
}