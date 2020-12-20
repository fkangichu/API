// Import our Controllers
const scoringController = require('../controllers/scoring_controller')
const ratingController = require('../controllers/customer_rating_controller')
const tagsController = require('../controllers/attribute_tags_controller')
const customerTagsController = require('../controllers/customer_attribute_tags_controller')
const customerController = require('../controllers/customer_controller')
const loanController = require('../controllers/loan_application_controller')

const routes = [
    {
        method:'GET',
        url:'/api/scoring-models',
        handler: scoringController.getScoringModels
    },
    {
      method: 'GET',
      url: '/api/scoring-models/:id',
      handler: scoringController.getScoringModelsById
    },
    {
      method: 'POST',
      url: '/api/scoring-models',
      handler: scoringController.addScoringModel,
      //schema: documentation.addScoringModel
    },
    {
      method: 'PUT',
      url: '/api/scoring-models/:id',
      handler: scoringController.updateScoringModel
    },

    //This endpoint will eventually call the result for rate-customer
    {
      method: 'POST',
      url:'/api/rating/score-customer',
      handler: customerTagsController.rateCustomer

    },
    {
      method: 'POST',
      url:'/api/rating/score-customer-universal',
      handler: customerTagsController.rateCustomerUniversal

    },
    //Depleted
    {
      method: 'POST',
      url:'/api/rating/rate-customer',
      handler: ratingController.getCustomerRating
    },
    ///Tags Routes
    {
      method: 'GET',
      url:'/api/tags',
      handler: tagsController.getTags
    },
    {
      method: 'GET',
      url:'/api/tag/:id',
      handler: tagsController.getTagById
    },
    {
      method: 'POST',
      url:'/api/tag',
      handler: tagsController.addTag
    },
    {
      method: 'POST',
      url:'/api/tags',
      handler: tagsController.addTags
    },
    {
      method: 'PUT',
      url:'/api/tag/:id',
      handler: tagsController.updateTag
    },
    {
      method: 'DELETE',
      url:'/api/tag/:id',
      handler: tagsController.deleteTag
    },
    {
      method: 'POST',
      url:'/api/customer',
      handler: customerController.createCustomer
    },
    {
      method: 'POST',
      url:'/api/customer/:id',
      handler: customerController.getCustomerById
    },
    {
      method: 'POST',
      url:'/api/customer/search',
      handler: customerController.searchCustomer
    },
    {
      method: 'PUT',
      url:'/api/customer',
      handler: customerController.updateCustomerDetails
    },
    {
      method: 'POST',
      url:'/api/loan/applications',
      handler: loanController.getLoanApplications
    },
    {
      method: 'POST',
      url:'/api/loan/application',
      handler: loanController.getLoanApplication
    },
    {
      method: 'POST',
      url:'/api/loan/request',
      handler: loanController.newLoanApplication
    }
]

module.exports = routes