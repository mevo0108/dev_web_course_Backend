"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = __importDefault(require("../Controllers/moviesController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// GET all movies and POST new movie
router.get('/', moviesController_1.default.getAll.bind(moviesController_1.default));
router.post('/', authMiddleware_1.default, moviesController_1.default.create.bind(moviesController_1.default)); //just to a connected user, so we will add auth middleware
// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', moviesController_1.default.getById.bind(moviesController_1.default));
router.put('/:id', authMiddleware_1.default, moviesController_1.default.update.bind(moviesController_1.default)); //just to the owner of the movie, so we will add auth middleware
router.delete('/:id', authMiddleware_1.default, moviesController_1.default.del.bind(moviesController_1.default)); //just to the owner of the movie, so we will add auth middleware
exports.default = router;
//# sourceMappingURL=moviesRoute.js.map