
import express from 'express';
import Order from '../models/order';
export class OrderController{

    add_an_order = async (req: express.Request, res: express.Response) => {
        try {
            let username = req.body.username;
            let restaurant_name = req.body.restaurant_name;
            let user_address = req.body.user_address;
            let ordered_meals = req.body.ordered_meals;

            let price = 0;

            for(let i = 0; i < ordered_meals.length; i++){
                price += parseInt(ordered_meals[i].price) * parseInt(ordered_meals[i].num);
            }

            let current = new Date();


            let year = current.getFullYear();
            let month = String(current.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            let day = String(current.getDate()).padStart(2, '0');
            let hours = String(current.getHours()).padStart(2, '0');
            let minutes = String(current.getMinutes()).padStart(2, '0');

            let date_string = `${year}-${month}-${day} ${hours}:${minutes}`;

            let order_id: number = 0;

            const orders = await Order.find();

            if (orders && orders.length > 0) {
                const lastOrderId = orders[orders.length - 1]?.order_id;
                if (lastOrderId !== undefined && lastOrderId !== null) {
                    order_id = lastOrderId + 1;
                }
            }

            const new_order = await Order.create({
                order_id: order_id,
                username: username,
                restaurant_name: restaurant_name,
                user_address: user_address,
                meals: ordered_meals,
                order_price: price,
                order_date: date_string,
                status: "pending",
                delivery_time: ""
            })

            if(!new_order){
                res.status(404).json({message: "Placing order unsuccessful. "});
            }
            res.json(true);
        } 
        catch (error) {
            console.error('Error', error);
            throw error;
        }
    }

    get_active_orders = async (req: express.Request, res: express.Response) => {
        try {
            let username = req.body.username;
           


            const orders = await Order.find({username: username, status: "approved"});

            if(!orders){
                res.status(404).json({message: "No active orders."});
            }
            res.json(orders);
        } 
        catch (error) {
            console.error('Error', error);
            throw error;
        }
    }

    get_pending_orders = async (req: express.Request, res: express.Response) => {
        try {
            let restaurant_name = req.body.restaurant_name;
           


            const orders = await Order.find({restaurant_name: restaurant_name, status: "pending"});

            if(!orders){
                res.status(404).json({message: "No pending orders."});
            }
            res.json(orders);
        } 
        catch (error) {
            console.error('Error', error);
            throw error;
        }
    }

    approve_order  = async (req: express.Request, res: express.Response) => {
        try {
            let order = req.body.order;
            let delivery_time = req.body.selected_option;

            // DODAJ ORDER ID
           
            const found = await Order.findOne({order_id: order.order_id, username: order.username, restaurant_name: order.restaurant_name, status: "pending"});

            if(!found){
                res.status(404).json({message: "Order not found."});
            }
            else{
                found.status = "approved";
                found.delivery_time = delivery_time;

                found.save();

                res.json(found);
            }
            
        } 
        catch (error) {
            console.error('Error', error);
            throw error;
        }
    }

    disapprove_order  = async (req: express.Request, res: express.Response) => {
        try {
            let order = req.body.order;

            // DODAJ ORDER ID
           
            const found = await Order.findOne({order_id: order.order_id, username: order.username, restaurant_name: order.restaurant_name, status: "pending"});

            if(!found){
                res.status(404).json({message: "Order not found."});
            }
            else{
                found.status = "disapproved";

                found.save();

                res.json(found);
            }
            
        } 
        catch (error) {
            console.error('Error', error);
            throw error;
        }
    }

    update_order = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let name = req.body.name;
            let surname = req.body.surname;
            let type = req.body.type;
            let old_username = req.body.old_username;


            console.log(username);
            console.log(old_username);
            console.log(type);

            const orders = await Order.find();

            if (!orders || orders.length === 0) {
                return res.status(404).json("No prior restaurants.");
            }
            else{
                // console.log(reservations);

                for(let i = 0; i < orders.length; i++){
                    if(orders[i].username == old_username){
                        if(orders[i].username != username){
                            orders[i].username = username;
                        }
                    }
                    
                    orders[i].save();
                }

            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}