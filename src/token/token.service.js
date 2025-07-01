const statusHandler = require("../helpers/helpers.statusHandler")
const {
 request
} = require("../helpers/helpers.global");

const getUrlBlockchain = (blockchain) =>{
    try{

        switch (blockchain) {
            case "BNB":
                return process.env.API_URL_COINGECKO_BNB;
            case "ETH":
                return process.env.API_URL_COINGECKO_ETH;
            case "BASE":
                return process.env.API_URL_COINGECKO_BASE;
            case "ARB":
                return process.env.API_URL_COINGECKO_ARB;
        }

        throw(statusHandler.newResponse(400, "Invalid blockchain"))

    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const getPriceTokenByContract = async({contract, blockchain})=>{
    try{

        const url = getUrlBlockchain(blockchain);

        let headers = {};
        headers['x-cg-demo-api-key'] = process.env.API_KEY_COINGECKO;

        const response = await request(url,{
            params:{
                contract_addresses:contract,
                vs_currencies: 'usd',
                include_market_cap:true
            }    
        }, "GET", null, headers);

        if(response){

            return statusHandler.newResponse(200, {
                price:response.data[contract].usd,
                cm:response.data[contract].usd_market_cap
            });
            
        }

    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};



module.exports = {
    getPriceTokenByContract
};