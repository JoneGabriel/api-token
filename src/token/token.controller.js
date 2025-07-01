const router = require("express").Router();
const statusHandler = require("../helpers/helpers.statusHandler");
const {
    getPriceTokenByContract
} = require("./token.service");

router.get("/token/price/:contract/:blockchain", async({params}, res)=>{
    try{

        const response = await getPriceTokenByContract(params);

        return res.status(response.status).send(response);
    }catch(error){  

        return statusHandler.responseError(error, res);
    }
});


module.exports = router;
