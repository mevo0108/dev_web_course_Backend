"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Base controller with common logic for all controllers
// Generic error handling, logging, etc. can be implemented here
class BaseController {
    constructor(model) {
        this.model = model;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query) {
                    const filterData = yield this.model.find(req.query);
                    return res.json(filterData);
                }
                const data = yield this.model.find();
                res.json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).json("error retrieving data");
            }
        });
    }
    ;
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }
            try {
                const data = yield this.model.findById(id);
                if (!data) {
                    return res.status(404).json({ message: "Data not found" });
                }
                res.json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: "error retrieving data" });
            }
        });
    }
    ;
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieData = req.body; // Assuming body-parser middleware is used
            console.log('Received movie data:', movieData);
            try {
                const newMovie = yield this.model.create(movieData);
                res.status(201).json(newMovie);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: "error creating data" });
            }
        });
    }
    ;
    del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const deletedData = yield this.model.findByIdAndDelete(id);
                res.json({ message: `Data ${deletedData === null || deletedData === void 0 ? void 0 : deletedData.title} deleted successfully` });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: "error deleting data" });
            }
        });
    }
    ;
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const updatedData = req.body;
            try {
                // Implementation for updating the movie goes here
                const data = yield this.model.findByIdAndUpdate(id, updatedData, {
                    new: true,
                });
                res.json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: "error updating data" });
            }
        });
    }
    ;
}
exports.default = BaseController;
//# sourceMappingURL=baseController.js.map