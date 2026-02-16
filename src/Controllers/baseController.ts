import { Request, Response } from 'express';

// Base controller with common logic for all controllers
// Generic error handling, logging, etc. can be implemented here


const getAll = async (req: Request, res: Response, model: any) => {
    try {

        if (req.query) {
            const filterData = await model.find(req.query);
            return res.json(filterData);
        }
        const data = await model.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json("error retrieving data");
    }
};

const getById = async (req: Request, res: Response, model: any) => {
    const id = req.params.id;
    try {
        const data = await model.findById(id);
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json("error retrieving data");
    }
};

const create = async (req: Request, res: Response, model: any) => {
    const movieData = req.body; // Assuming body-parser middleware is used
    console.log('Received movie data:', movieData);
    try {
        const newMovie = await model.create(movieData);
        res.status(201).json(newMovie);
    } catch (err) {
        console.error(err);
        res.status(500).json("error creating data");
    }
};

const del = async (req: Request, res: Response, model: any) => {
    const id = req.params.id;

    try {
        const deletedData = await model.findByIdAndDelete(id);
        res.json({ message: `Data ${deletedData?.title} deleted successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json("error deleting data");
    }
};

const update = async (req: Request, res: Response, model: any) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        // Implementation for updating the movie goes here
        const data = await model.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json("error updating data");
    }
};

export default {
    getAll,
    getById,
    create,
    del,
    update
};