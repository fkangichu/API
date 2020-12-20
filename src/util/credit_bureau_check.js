const metropol_crb_ke = require('./credit_bureau/metropol_ke')

exports.getBureauData = async(ref_id, request)=>{

    //More Panel Beating required
    switch (ref_id) {
        case "METROPOL_CRB_KE":
                return await metropol_crb_ke.getMetropolKe(request)
            break;
        default:
            break;
    }
}