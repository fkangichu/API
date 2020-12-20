const boom = require('boom')


const responseGenerator = require('../util/generate_rating_response')
const ratingController = require('../controllers/customer_rating_controller')
const crb_util = require('../util/credit_bureau_check')

const RatingTags = require('../model/customer_attribute_tags')
const Scoring = require('../model/scoring')

exports.rateCustomer = async(request, response) =>{
    try {
        return await getRatingResult(request.body)
    } catch (error) {
        throw boom.boomify(error)
    }
}


exports.rateCustomerUniversal= async(request, response) =>{
    try {
        const scoringModels = await Scoring.find() ///Where condition for pre_conditions
        const results = []
    
        /*scoringModels.forEach(scoringModel => {
            try {
                request.body.scoringModelId = scoringModel._id;

                const result =  await getRatingResult(request).then(y => {
                    console.log(y)
                })

                results.push(result)

            } catch (error) {
                console.log(error)
            }
        });*/
        await Promise.all(scoringModels.map(async (scoringModel)=>{
            request.body.scoringModelId = scoringModel._id.toString();

            var req = JSON.parse(JSON.stringify(request.body))

            const result =  await getRatingResult(req)

            if(result.rates.length > 0)
                results.push(result);
        })
        );
    
        return results
        
    } catch (error) {
        throw boom.boomify(error)
    }
}

const getRatingResult = async(request) => {
    return new Promise(async(resolve, reject) => {
        try {
            //request = request.body

            //console.log(request.scoringModelId)

            const scoringModel = await Scoring.findById(request.scoringModelId)
            
            if(scoringModel){
                if(scoringModel.credit_bureaus.length > 0){

                    await Promise.all(scoringModel.credit_bureaus.map(async (credit_bureau)=>{
                        const updated_tag = await crb_util.getBureauData(credit_bureau.ref_id, request)
                        
                        if(updated_tag){
                            updated_tag.forEach(tag => {

                                request.tags.push(tag)
                            });
                        }
                    })
                    );
                }
            }

            const tagModel = new RatingTags(request)
            tagModel.save()
    
            const id = tagModel._id.toString()
            //console.log(request.scoringModelId)
            const ratingResponses = await responseGenerator.generateResponse(request)
    
            const ratingResult = await ratingController.getCustomerRating({body: ratingResponses})
    
            tagModel.result = ratingResult
    
            await RatingTags.findByIdAndUpdate(id, tagModel, { new: true })
    
            resolve(ratingResult)
    
        } catch (error) {
            reject(error)
        }

    });
}