"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsController_1 = __importDefault(require("../Controllers/commentsController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// GET all comments and POST new comment
router.get('/', commentsController_1.default.getAll.bind(commentsController_1.default));
router.post('/', authMiddleware_1.default, commentsController_1.default.create.bind(commentsController_1.default)); //just to a connected user, so we will add auth middleware
// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', commentsController_1.default.getById.bind(commentsController_1.default));
router.put('/:id', authMiddleware_1.default, commentsController_1.default.update.bind(commentsController_1.default)); //just to a connected user and comment creator, so we will add auth middleware
router.delete('/:id', authMiddleware_1.default, commentsController_1.default.del.bind(commentsController_1.default)); //just to a connected user and comment creator, so we will add auth middleware
exports.default = router;
//# sourceMappingURL=CommentsRoute.js.map