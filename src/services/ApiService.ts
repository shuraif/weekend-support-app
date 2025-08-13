import axios, { AxiosInstance } from 'axios'

class ApiService {


    axiosInstance = {} as AxiosInstance;
    baseUrl: string;
    constructor() {
        this.axiosInstance = axios.create();
        this.baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        if (!this.baseUrl) {
            console.warn("⚠️ VITE_API_BASE_URL is not defined in your environment!");
        }
        this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

        this.axiosInstance.interceptors.request.use((config) => {
            const userJson = sessionStorage.getItem('user');
            const user = userJson ? JSON.parse(userJson) : null;
            console.log('user',userJson);
      
            if (user?.userId) {
              config.headers['userId'] = user.userId.toString();
            }
            console.log('config',config);
            return config;
          });


        this.axiosInstance.interceptors.response.use((resp) => {
            return resp
        }, (error) => {
           return Promise.reject(error);
            
        });
    }

    async get(url: string,enableLogging = false) {
        let _confg = {};   
        try {
            const response = await this.axiosInstance.get(this.baseUrl + url, _confg);
            enableLogging && logApiDetails(this.baseUrl + url, 'GET', null, response.data);
            return response;
        } catch (error:any) {
            logApiDetails(this.baseUrl + url, 'GET', null, { error: error.response.data });
            throw error;
        }
    }

   async post(url:String, data:[], enableLogging = false) {
        let _confg = {}
        try{
            const response = await this.axiosInstance.post(this.baseUrl + url, data, _confg);
            enableLogging && logApiDetails(this.baseUrl + url, 'POST', data, response.data)
            return response;
        }catch(error:any){
            logApiDetails(this.baseUrl + url, 'POST', data, { error: error.response.data });
            throw error;
        }
    }

    async put(url:String, data:[], enableLogging = false) {
        let _confg = {}
        try{
            const response = await this.axiosInstance.put(this.baseUrl + url, data, _confg);
            enableLogging && logApiDetails(this.baseUrl + url, 'PUT', data, response.data)
            return response;
        }catch(error:any){
            logApiDetails(this.baseUrl + url, 'PUT', data, { error: error.response.data });
            throw error;
        }
    }
 

}

function logApiDetails(url : String,method: "GET"|"POST"|"PUT"|"PATCH"|"DELETE", request: {}|null, response:any) { 
    try {
        const logDetails = {
            url,
            method,
            request,
            response,
            timestamp: new Date().toISOString(),
          };

        console.log('logDetails',JSON.stringify(logDetails,null,2));
    } catch (error) {
        console.log('error while logging api details',error)
    }
   
}
export default new ApiService;