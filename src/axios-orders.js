import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://aljs-860f3.firebaseio.com/'
});

export default instance;
