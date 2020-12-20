const config = require('config');

const fastify = require('fastify')({
    logger: true
})


const mongoose = require('mongoose')

mongoose.connect(config.get('mongodb'))
 .then(() => console.log('MongoDB connected...'))
 .catch(err => console.log(err))
 
// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

const routes = require('./routes')

/*fastify.get('/',async(request, reply)=>{
    return {hello:'hello world'}
})*/
routes.forEach((route, index) => {
    fastify.route(route)
})


const start = async()=>{
    try{
        await fastify.listen(4040)
        fastify.swagger()
        fastify.log.info('server listening on ${fastify.server.address().port}')

    }catch(err){
        fastify.log.error(err)
        process.exit(1)
    }
}

start()