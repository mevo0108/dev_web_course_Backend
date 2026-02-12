"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesControllers_1 = __importDefault(require("../Controllers/moviesControllers"));
const router = express_1.default.Router();
// GET all movies and POST new movie
router.get('/', moviesControllers_1.default.getAllMovies);
router.post('/', moviesControllers_1.default.createMovie);
// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', moviesControllers_1.default.getMovieById);
router.put('/:id', moviesControllers_1.default.updateMovie);
router.delete('/:id', moviesControllers_1.default.deleteMovie);
exports.default = router;
//# sourceMappingURL=moviesRoute.js.map