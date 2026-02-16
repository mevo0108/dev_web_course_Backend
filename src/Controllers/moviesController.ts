import movieModel from '../models/moviesModel';
import baseController from './baseController';

const moviesController = new baseController(movieModel);

export default moviesController;