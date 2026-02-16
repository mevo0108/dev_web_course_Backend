import commentsModel from '../models/commentsModel';
import baseController from './baseController';

const commentsController = new baseController(commentsModel);

export default commentsController;