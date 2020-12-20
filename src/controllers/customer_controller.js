const boom = require('boom')
const Customer = require('../model/customer_model')

exports.createCustomer = async(request, response)=>{
    try {
        const customer = new Customer(request.body)
        return customer.save()
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getCustomerById = async(request, response)=>{
    try {
        const id = request.id
        const customer_details = await Customer.findById(id)
        return customer_details
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.searchCustomer = async(request, response)=>{
    try {
        const params = request.search_params
        const customer_details = await Customer.find(params)
        return customer_details
    } catch (error) {
        throw boom.boomify(error)
    } 
}

exports.updateCustomerDetails = async(request, response)=>{
    try {
      const id = request.body.id
      const customer_details = request.body
      const { ...updateData } = customer_details
      const update = await Customer.findByIdAndUpdate(id, updateData, { new: false })
      return update
    } catch (error) {
      throw boom.boomify(error)
    }
}