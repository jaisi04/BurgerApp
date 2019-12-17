import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-bbuilder-37679.firebaseio.com/'
});

export default instance;