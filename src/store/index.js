const axios = require('axios');

export default {
    async getData({page}){
        return await axios.get(`https://picsum.photos/v2/list?page=${page-1}&limit=12`);
    }
}
