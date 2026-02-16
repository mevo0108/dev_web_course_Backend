"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = __importDefault(require("../Controllers/moviesController"));
const router = express_1.default.Router();
// GET all movies and POST new movie
router.get('/', moviesController_1.default.getAllMovies);
router.post('/', moviesController_1.default.createMovie);
// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', moviesController_1.default.getMovieById);
router.put('/:id', moviesController_1.default.updateMovie);
router.delete('/:id', moviesController_1.default.deleteMovie);
exports.default = router;
//# sourceMappingURL=moviesRoute.js.map