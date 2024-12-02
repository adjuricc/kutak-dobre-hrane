import express from 'express';
import Restaurant from '../models/restaurant';

export class RestaurantController{

    number_of_restaurants = async (req: express.Request, res: express.Response) => {
        try{

            const restaurants = await Restaurant.find();

            res.json(restaurants.length);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_all_restaurants = async (req: express.Request, res: express.Response) => {
        try{

            const restaurants = await Restaurant.find();

            if (!restaurants) {
                res.status(404).json({ message: 'No available restaurants.' });
            }

            res.json(restaurants);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    search = async (req: express.Request, res: express.Response) => {
        try{
            let name = req.body.name;
            let address = req.body.address;
            let type = req.body.type;

            const query: any = {};

            if (name) {
                query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search for name
            }

            if (address) {
                query.address = { $regex: new RegExp(address, 'i') }; // Case-insensitive search for address
            }

            if (type) {
                query.type = { $regex: new RegExp(type, 'i') }; // Case-insensitive search for type
            }

            const rest = await Restaurant.find(query);

            if (rest.length === 0) {
                return res.status(404).json({ message: 'Restaurant not found.' });
            }

            res.json(rest);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_restaurant = async (req: express.Request, res: express.Response) => {
        try{
            let name_par = req.params.name;
            console.log(name_par);
            const restaurant = await Restaurant.findOne({name: name_par});

            if (!restaurant) {
                res.status(404).json({ message: 'Restaurant not found.' });
            }
            else{
                res.json(restaurant);
            }
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    update_ratings = async (req: express.Request, res: express.Response) => {
        try{
            let reservation = req.body.reservation;

            const found = await Restaurant.findOne({name: reservation.restaurant_name});

            if(!found){
                res.status(404).json("No prior reservations. ");
            }
            else{

                // console.log(found.avg_rating);
                // console.log(found.ratings.length);
                
               
                if(found.avg_rating)
                   found.avg_rating = ((found.avg_rating * found.ratings.length + parseInt(reservation.rating)) / (found.ratings.length + 1));

                found.ratings.push({
                    username: reservation.username,
                    rating: reservation.rating,
                    review: reservation.review
                });

                const updated = await found.save();
            
                res.json(updated);
            }
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    add_a_waiter = async (req: express.Request, res: express.Response) => {
        try{
            let waiter = req.body.waiter;
            let selected_restaurant = req.body.selected_restaurant;

            // console.log(selected_restaurant);

            const found = await Restaurant.findOne({name: selected_restaurant.name});

            if(!found){
                res.status(404).json("No prior reservations. ");
            }
            else{
                found.waiters.push({
                    name: waiter.name,
                    surname: waiter.surname,
                    username: waiter.username
                });

                const updated = await found.save();
            
                res.json(updated);
            }
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    add_restaurant = async (req: express.Request, res: express.Response) => {
        try{
            console.log("uslo");
            let name = req.body.name;
            let type = req.body.type;
            let address = req.body.address;
            let description = req.body.description;
            let phone = req.body.contact_person;
            let org = req.body.org;
            let menu = req.body.menu;
            let start = req.body.start;
            let end = req.body.end;

            console.log(org);

            let tables = [];

            for(let i = 0; i < org.length; i++){
                if(org[i].type == "table"){
                    tables.push({
                        num_of_guests: org[i].num
                    });
                }
            }

            console.log(tables);

            const new_restaurant = await Restaurant.create({
                name: name,
                address: address,
                phone: phone,
                type: type,
                avg_rating: 0,
                ratings: [],
                waiters: [],
                tables: tables,
                working_hours: {
                    start: start,
                    end: end
                }, 
                menu: menu,
                description: description,
                restaurant_organization: org
            });
            
            if(!new_restaurant){
                res.status(404).json({message: "Unsuccessful. "});
            }
            else
                res.json(new_restaurant);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_restaurant_waiter = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;

            const restaurants = await Restaurant.find();

            if (!restaurants) {
                res.status(404).json({ message: 'No restaurants.' });
            }
            else{

                for(let i = 0; i < restaurants.length; i++){
                    let waiters = restaurants[i].waiters;
                    for(let j = 0; j < waiters.length; j++){
                        if(username == waiters[j].username){
                            res.json(restaurants[i]);
                        }
                    }
                }

                
            }
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_all_waiters = async (req: express.Request, res: express.Response) => {
        try{
            let name = req.body.name;

            const restaurant = await Restaurant.findOne({name: name});

            if (!restaurant) {
                res.status(404).json({ message: 'No restaurants.' });
            }
            else{
                res.json(restaurant.waiters);
            }
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    update_restaurant = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let name = req.body.name;
            let surname = req.body.surname;
            let type = req.body.type;
            let old_username = req.body.old_username;


            console.log(username);
            console.log(old_username);
            console.log(type);

            const restaurants = await Restaurant.find();

            if (!restaurants || restaurants.length === 0) {
                return res.status(404).json("No prior restaurants.");
            }
            else{
                // console.log(reservations);

                for(let i = 0; i < restaurants.length; i++){
                    if(type == "gost"){
                        for(let j = 0; j < restaurants[i].ratings.length; j++){
                            if(restaurants[i].ratings[j].username == old_username){
                                if(restaurants[i].ratings[j].username != username){
                                    restaurants[i].ratings[j].username = username;
                                }
                            }
                            
                            
                        }
                    }
                    else{
                        for(let j = 0; j < restaurants[i].waiters.length; j++){
                            if(restaurants[i].waiters[j].username == old_username){
                                if(restaurants[i].waiters[j].username != username){
                                    restaurants[i].waiters[j].username = username;
                                }
                                if(restaurants[i].waiters[j].name != name){
                                    restaurants[i].waiters[j].name = name;
                                }
                                if(restaurants[i].waiters[j].surname != surname){
                                    restaurants[i].waiters[j].surname = surname;
                                }
                            }
                            
                        }
                    }
                    restaurants[i].save();
                }

            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


}