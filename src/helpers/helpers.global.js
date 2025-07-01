const axios = require('axios');

const isEmptyObject = (obj)=>{
    try{

        if(typeof obj !== "object" ){
            return true;
        }

        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
              return false;
            }
          }
        
          return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const isEmpty = (value)=> value === null || value === undefined || value === NaN || value === "undefined" || value === "null" || value === "" || (()=>{ return typeof value == "object" ? isEmptyObject(value): false;})();

const request = async(url, params, method = "GET", data, headers = {})=>{
    try{

        headers["Content-Type"] = 'application/json';

        if(method == "POST"){
            
            const options ={
                method:"POST",
                headers,
                url,
                responseType: 'json',
                data
            };
            
            return await axios(options);
        }

        let options = {
            ...params
        };

        if(headers['Authorization'] || headers['x-cg-demo-api-key']){
            options.headers = headers;
        }
        
        const response =  await axios.get(url, options);

        return response;
    }catch(error){
        console.log(error)
        return error?.response?.data ? error?.response?.data  : {status:500, content:"Internal Error"};
    }
};

module.exports = {
    isEmpty,
    request
};