const boom = require('boom')
const LoanApplication = require('../model/loan_application_model')

exports.getLoanApplications = async(request, response)=>{
    try {

        const loanApplications = await LoanApplication.find({
            customer_id: request.customer_id
        })
    
        return loanApplications
        
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getLoanApplication = async(request, response)=>{
    try {

        const loanApplication = await LoanApplication.find({
            _id:request.id,
            customer_id: request.customer_id
        })
    
        return loanApplication
        
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.newLoanApplication = async(request, response) =>{
    try {
        const loanApplication = new LoanApplication(request.body)
        
        return loanApplication.save()
        
        //CALL FINASTRA CLOUD AT THIS POINT

    } catch (error) {
        throw boom.boomify(error)
    }
}