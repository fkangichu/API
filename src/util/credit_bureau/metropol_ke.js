const config = require('config');
var jp = require('jsonpath');
const fs = require('fs'); // for dummy data reading
const BureauResponse = require('../../model/credit_bureau_model')


const ref_id = 'METROPOL_CRB_KE'
var crb_configs = {}

exports.getMetropolKe = async(request) =>{

    var response = []
    crb_configs = config.get('crb').find(crb => crb.ref_id == ref_id)

    if(crb_configs){

        const met_response = await getMetropolData()

        await new BureauResponse({
            ref_id:ref_id,
            customer_id: '',
            response: met_response
        }).save()

        crb_configs.data_map.forEach(data_map => {

            var tag_value = jp.query(met_response, data_map.JSONPath)[0];
            
            response.push({
                tag: data_map.tag,
                tagValue: tag_value
            })
        });
    }

    return response
}

const getMetropolData = async()=>{
    return new Promise(async (resolve, reject)=>{

        fs.readFile('./dummy_data/metropol_response.json', (err, data) => {
            if (err) throw err;
            let crb_data = JSON.parse(data);
            resolve(crb_data)
        });
    });
}

