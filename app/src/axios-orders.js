import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-builder-9eb5f.firebaseio.com/'
});

export default instance;