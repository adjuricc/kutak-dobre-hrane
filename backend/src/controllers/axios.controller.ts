import axios from 'axios';
import express from 'express';

export class AxiosController{

    get_coordinates = async (req: express.Request, res: express.Response) => {
        try {
            let address = req.body.address;
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
            const response = await axios.get(url);
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                return { lat, lon };
            } else {
                throw new Error('No results found');
            }
        } 
        catch (error) {
            console.error('Error fetching coordinates:', error);
            throw error;
        }
    }
}