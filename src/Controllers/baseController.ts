/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

// Base controller with common logic for all controllers
// Generic error handling, logging, etc. can be implemented here

class BaseController {

    model: any;

    constructor(model: any) {
        this.model = model;
    }

    async getAll(req: Request, res: Response) {



        try {

            if (req.query) {
                const filterData = await this.model.find(req.query);
                return res.json(filterData);
            }
            const data = await this.model.find();
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json("error retrieving data");
        }
    };

    async getById(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const data = await this.model.findById(id);
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json("error retrieving data");
        }
    };

    async create(req: Request, res: Response) {
        const movieData = req.body; // Assuming body-parser middleware is used
        console.log('Received movie data:', movieData);
        try {
            const newMovie = await this.model.create(movieData);
            res.status(201).json(newMovie);
        } catch (err) {
            console.error(err);
            res.status(500).json("error creating data");
        }
    };

    async del(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const deletedData = await this.model.findByIdAndDelete(id);
            res.json({ message: `Data ${deletedData?.title} deleted successfully` });
        } catch (err) {
            console.error(err);
            res.status(500).json("error deleting data");
        }
    };

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const updatedData = req.body;

        try {
            // Implementation for updating the movie goes here
            const data = await this.model.findByIdAndUpdate(id, updatedData, {
                new: true,
            });
            res.json(data);

        } catch (err) {
            console.error(err);
            res.status(500).json("error updating data");
        }
    };
}

export default BaseController;