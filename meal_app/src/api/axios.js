import axios from 'axios';
// exporting the base url from mealDb api
export default axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/'
})