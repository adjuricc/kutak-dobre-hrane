import express from 'express';
import Reservation from '../models/reservation';

export class ReservationController{

    add_reservation = async (req: express.Request, res: express.Response) => {
        try{
            let tables = req.body.tables;
            let username = req.body.username;
            let guest_name = req.body.guest_name;
            let guest_surname = req.body.guest_surname;
            let restaurant_name = req.body.restaurant_name;
            let guests_number = req.body.guests_number;
            let additional_info = req.body.additional_info;
            let date = new Date(req.body.date);
            let dt_of_reservation = new Date(req.body.dt_of_reservation);
            let reserved_table = req.body.reserved_table;


            // let date_string = date.toLocaleDateString();
            // let time_string = date.toLocaleTimeString();

            let date_year = date.getFullYear();
            let date_month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
            let date_day = String(date.getDate()).padStart(2, '0');
            let date_hours = String(date.getHours()).padStart(2, '0');
            let date_minutes = String(date.getMinutes()).padStart(2, '0');

            let date_string = `${date_year}-${date_day}-${date_month}`;
            let time_string = `${date_hours}:${date_minutes}`;

            let year = dt_of_reservation.getFullYear();
            let month = String(dt_of_reservation.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
            let day = String(dt_of_reservation.getDate()).padStart(2, '0');
            let hours = String(dt_of_reservation.getHours()).padStart(2, '0');
            let minutes = String(dt_of_reservation.getMinutes()).padStart(2, '0');
        
            let dt_of_reservation_str = `${year}-${day}-${month} ${hours}:${minutes}`;

            console.log(restaurant_name);
            console.log(date_string);
            console.log(time_string);
            
            // posle koliko vremena moze da se zakazuje??
            const reservations = await Reservation.find({restaurant_name: restaurant_name, date: date_string, time: time_string});

            // treba da pristupim svim stolovima restorana da bih proverila dostupnost
            
            // let found = false;
            // let index = -1;
            // for(let i = 0; i < tables.length; i++){
            //     for(let j = 0; j < reservations.length; j++){
            //         if(i == reservations[j].reserved_table){
            //             found = true;
            //             break;
            //         }
            //     }
            //     if(!found){
            //         if(tables[i].num_of_guests - guests_number == 0 || tables[i].num_of_guests - guests_number == 1){
            //             index = i;
            //             break;
            //         } 
            //     }
                
            //     found = false;
            // }

            
            const new_reservation = await Reservation.create({
                username: username,
                guest_name: guest_name,
                guest_surname: guest_surname,
                restaurant_name: restaurant_name,
                guests_number: guests_number,
                additional_info: additional_info,
                date: date_string,
                time: time_string,
                dt_of_reservation: dt_of_reservation_str,
                reserved_table: -1,
                status: "pending",
                comment: ""
            });

            res.json(new_reservation);
           
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_done_reservations= async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;

            const statuses = ["came", "notcame", "cancelled"];

            const reservations = await Reservation.find({username: username, status: { $in: statuses }});


            if(!reservations){
                res.status(404).json("No prior reservations. ");
            }

            res.json(reservations);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    add_a_review = async (req: express.Request, res: express.Response) => {
        try{
            let new_rating = req.body.rating;
            let new_review = req.body.review;
            let reservation = req.body.reservation;

            const found = await Reservation.findOne({username: reservation.username, restaurant_name: reservation.restaurant_name, dt_of_reservation: reservation.dt_of_reservation, status: "came"});

            if(!found){
                res.status(404).json("No prior reservations. ");
            }
            else{
                found.rating = new_rating;
                found.review = new_review;

                const updatedReservation = await found.save();
            
                res.json(updatedReservation);
            }
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_current_reservations = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let status = req.body.status;

            

            const reservations = await Reservation.find({username: username, status: status });

            if(!reservations){
                res.status(404).json("No prior reservations. ");
            }

            res.json(reservations);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_active_reservations = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let status = req.body.status;

     

            const reservations = await Reservation.find({responsible_waiter: username, status: status });

            if(!reservations){
                res.status(404).json("No prior reservations. ");
            }

            res.json(reservations);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_current_reservations_by_restaurant = async (req: express.Request, res: express.Response) => {
        try{
            let reservation = req.body.reservation;
            let status = req.body.status;

            // sve rezervacije koje jos traju, +3 sata

            const statuses = ["came", "approved"];
            // console.log("what");

            const reservations = await Reservation.find({restaurant_name: reservation.restaurant_name, status: { $in: statuses } });

            // console.log(reservations);
            let current_reservations = [];

            // let reservation_date = new Date(`${reservation.date}T${reservation.time}`);
            let date_arr1 = reservation.date?.split('-');
            if(date_arr1){
                let date_string_1 = date_arr1[0]+"-"+date_arr1[2]+"-"+date_arr1[1];
                let reservation_date = new Date(`${date_string_1}T${reservation.time}`);
            
                // console.log(reservation_date);

                if(!reservations){
                    res.status(404).json("No prior reservations. ");
                }
                else{
                    for(let i = 0; i < reservations.length; i++){
                        let date_arr = reservations[i].date?.split('-');
                        if(date_arr){
                            let date_string = date_arr[0]+"-"+date_arr[2]+"-"+date_arr[1];
                        
                        
                            let tmp_date = new Date(`${date_string}T${reservations[i].time}`);
                            // console.log(reservation_date);
                            let tmp_date_plus_3_hours = new Date(tmp_date.getTime() + 3 * 60 * 60 * 1000);
                            let tmp_date_minus_3_hours = new Date(tmp_date.getTime() - 3 * 60 * 60 * 1000);
                            // console.log(tmp_date_plus_3_hours);
                            // console.log(tmp_date_minus_3_hours);

                            if (reservation_date >= tmp_date_minus_3_hours && reservation_date <= tmp_date_plus_3_hours) {
                                current_reservations.push(reservations[i]);
                            }
                            // console.log(current_reservations);
                        }
                    }
                    res.json(current_reservations);
            }
        }
           
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    cancel_reservation = async (req: express.Request, res: express.Response) => {
        try{
            let reservation = req.body.reservation;

            const found = await Reservation.findOne({username: reservation.username, restaurant_name: reservation.restaurant_name, date: reservation.date, time: reservation.time });

            console.log(found);

            if(!found){
                res.status(404).json("No prior reservations. ");
            }
            else{
                let current_time = new Date();

                const dateTimeString = `${reservation.date}T${reservation.time}`;
                const date_obj: Date = new Date(dateTimeString);

                const time_obj: Date = new Date(reservation.time);
                const time_hour = time_obj.getHours();
                const time_minutes = time_obj.getMinutes();

              

                const diffInMs = date_obj.getTime() - current_time.getTime();
                const diffInMinutes = diffInMs / (1000 * 60);


                if (diffInMinutes >= 45) {
                    found.status = "cancelled";
                    found.save();
                    res.json(found);
                } else {
                    res.status(400).json({message: "Cannot cancel reservation less than 45 minutes before the scheduled time."});
                }
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_unprocessed_reservations_by_restaurant = async (req: express.Request, res: express.Response) => {
        try{
            let restaurant_name = req.body.restaurant_name;

            const reservations = await Reservation.find({restaurant_name: restaurant_name, status: "pending" });

            if(!reservations){
                res.status(404).json("No prior reservations. ");
            }
            else
                res.json(reservations);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    approve_reservation = async (req: express.Request, res: express.Response) => {
        try{
            let reservation = req.body.reservation;
            let selected_table = req.body.selected_table;
            let index = req.body.index;
            let responsible_waiter = req.body.waiter_username;

            const found = await Reservation.findOne({username: reservation.username, restaurant_name: reservation.restaurant_name, date: reservation.date, time: reservation.time });

            console.log(index);

            if(!found){
                res.status(404).json("No prior reservations. ");
            }
            else{
                found.status = "approved";
                found.reserved_table = index;
                found.responsible_waiter = responsible_waiter;
                found.save();
                res.json(found);
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    disapprove_reservation = async (req: express.Request, res: express.Response) => {
        try{
            let reservation = req.body.reservation;
            let disapprovement_reason = req.body.disapprovement_reason;

            const found = await Reservation.findOne({username: reservation.username, restaurant_name: reservation.restaurant_name, date: reservation.date, time: reservation.time });

            if(!found){
                res.status(404).json("No prior reservations. ");
            }
            else{
                found.status = "disapproved";
                found.disapprovement_reason = disapprovement_reason;
                found.save();
                res.json(found);
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    didnt_come  = async (req: express.Request, res: express.Response) => {
        try{
            let reservation = req.body.reservation;

            console.log("??");

            const found = await Reservation.findOne({username: reservation.username, restaurant_name: reservation.restaurant_name, date: reservation.date, time: reservation.time });

            console.log(found);
            if(!found){
                res.status(404).json("No prior reservations. ");
            }
            else{
                let curr_date = new Date();

                const formattedCurrDate = `${curr_date.getFullYear()}-${('0' + curr_date.getDate()).slice(-2)}-${('0' + (curr_date.getMonth() + 1)).slice(-2)} ${('0' + curr_date.getHours()).slice(-2)}:${('0' + curr_date.getMinutes()).slice(-2)}`;
            
                let current_date = new Date(formattedCurrDate);

                const dateTimeString = `${reservation.date}T${reservation.time}`;
                const date_obj: Date = new Date(dateTimeString);

                const diffInMs = current_date.getTime() - date_obj.getTime();

           
                const diffInMinutes = diffInMs / (1000 * 60);

                if (current_date.getFullYear() === date_obj.getFullYear() &&
                current_date.getMonth() === date_obj.getMonth() &&
                current_date.getDate() === date_obj.getDate()){

                    if(current_date >= date_obj && diffInMinutes > 30){
                        found.status = "notcame";
                        found.save();
                        res.json(found);
                    }
                    else {
                        res.status(404).json({ message: "30 minutes haven't passed." });
                    }
                }
                else{
                    res.status(404).json({ message: "Invalid date" });
                }
                
                
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    came  = async (req: express.Request, res: express.Response) => {
        try{
            let reservation = req.body.reservation;

            const found = await Reservation.findOne({username: reservation.username, restaurant_name: reservation.restaurant_name, date: reservation.date, time: reservation.time });

            if(!found){
                res.status(404).json("No prior reservations. ");
            }
            else{
                let curr_date = new Date();

                const formattedCurrDate = `${curr_date.getFullYear()}-${('0' + curr_date.getDate()).slice(-2)}-${('0' + (curr_date.getMonth() + 1)).slice(-2)} ${('0' + curr_date.getHours()).slice(-2)}:${('0' + curr_date.getMinutes()).slice(-2)}`;
            
                let current_date = new Date(formattedCurrDate);


                const dateTimeString = `${reservation.date}T${reservation.time}`;
                const date_obj: Date = new Date(dateTimeString);

                const diffInMs = current_date.getTime() - date_obj.getTime();

           
                const diffInMinutes = diffInMs / (1000 * 60);
                console.log(diffInMinutes);

                if (current_date.getFullYear() === date_obj.getFullYear() &&
                current_date.getMonth() === date_obj.getMonth() &&
                current_date.getDate() === date_obj.getDate()){

                    if(current_date < date_obj && diffInMinutes > 30){
                        res.status(404).json({ message: "30 minutes have passed." });
                    }
                    else{
                        console.log("came");
                        found.status = "came";
                        found.save();
                        res.json(found);}
                }
                else{
                    res.status(404).json({ message: "Invalid date" });
                }
                
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    number_of_guests_per_day = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;

            const reservations = await Reservation.find({responsible_waiter: username });

            let weekdays = [0, 0, 0, 0, 0, 0, 0];

            if (!reservations || reservations.length === 0) {
                return res.status(404).json("No prior reservations.");
            }
            else{
                
                reservations.forEach((reservation) => {
                    if (reservation.date) { 
                        // console.log(reservation.date);
                        const [year, day, month] = reservation.date.split('-');
                        const date_obj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

                        // console.log(date_obj);
                
                        let day_of_week = date_obj.getDay();
                        // console.log(day_of_week);
                        weekdays[day_of_week]++;
                        // console.log(weekdays);
                    }
                });
                res.json(weekdays);
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    avg_num_of_guests_per_day_last24m = async (req: express.Request, res: express.Response) => {
        try{
            let restaurant_name = req.body.restaurant_name;

            console.log("uslo");

            const reservations = await Reservation.find({restaurant_name: restaurant_name });

            let weekdays = [0, 0, 0, 0, 0, 0, 0];

            if (!reservations || reservations.length === 0) {
                return res.status(404).json("No prior reservations.");
            }
            else{

                let curr_date = new Date();
                for(let i = 0; i < reservations.length; i++){
                    if(reservations[i].status == "approved"){
                        
                        const dt_arr = reservations[i].dt_of_reservation?.split(' ');
                        if(dt_arr !== undefined){
                            const date_str = dt_arr[0];
                            const time_str = dt_arr[1];

                            const date_arr = date_str.split('-');
                            const time_arr = time_str.split(':');
                            const year = parseInt(date_arr[0]);
                            const month = parseInt(date_arr[2]) - 1; 
                            const day = parseInt(date_arr[1]);
                            const hours = parseInt(time_arr[0]);
                            const minutes = parseInt(time_arr[1]);

                            const reservation_date = new Date(year, month, day, hours, minutes);


                            const timeDifference = curr_date.getTime() - reservation_date.getTime();
                            const monthsDifference = timeDifference / (1000 * 60 * 60 * 24 * 30);

                            if (monthsDifference <= 24) {
                                let day_of_week = reservation_date.getDay();
                                weekdays[day_of_week]++;
                            }

                        }


                    }
                    
                }

                for(let i = 0; i < weekdays.length; i++){
                    weekdays[i] = weekdays[i] / (4*24);
                }

                res.json(weekdays);
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    guests_distribution = async (req: express.Request, res: express.Response) => {
        try{
            let waiters = req.body.waiters;

            console.log(waiters);

            const reservations = await Reservation.find();

            

            let num_waiters: number[] = [];
            let distr_waiter: number[] = [];

            if (!reservations || reservations.length === 0) {
                return res.status(404).json("No prior reservations.");
            }
            else{
                // console.log(reservations);

                for(let i = 0; i < waiters.length; i++){
                    distr_waiter.push(0);
                }

                for(let i = 0; i < reservations.length; i++){
                    if(reservations[i].responsible_waiter){
                        for(let j = 0; j < waiters.length; j++){
                            console.log(reservations[i].responsible_waiter);
                            console.log(waiters[j]);
                            if(reservations[i].responsible_waiter == waiters[j].username){
                                distr_waiter[j]++;
                                break;
                            }
                        }
                    }
                }

                console.log(distr_waiter);

                // for(let i = 0; i < distr_waiter.length; i++){
                //     distr_waiter[i] = distr_waiter[i] / distr_waiter.length;
                // }


                res.json(distr_waiter);
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    update_reservation = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let name = req.body.name;
            let surname = req.body.surname;
            let type = req.body.type;
            let old_username = req.body.old_username;

            const reservations = await Reservation.find();

            if (!reservations || reservations.length === 0) {
                return res.status(404).json("No prior reservations.");
            }
            else{
                // console.log(reservations);

                for(let i = 0; i < reservations.length; i++){
                    if(reservations[i].username == username || reservations[i].username == old_username){
                        if(type == "konobar" && reservations[i].responsible_waiter != username){
                            reservations[i].responsible_waiter = username
                        }
                        if(type == "gost" && reservations[i].username != username){
                            reservations[i].username = username;
                        }
                        if(reservations[i].guest_name != name){
                            reservations[i].guest_name = name;
                        }
                        if(reservations[i].guest_surname != surname){
                            reservations[i].guest_surname = surname;
                        }
                        
                        reservations[i].save();
                    }
                }

            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    num_of_reservations_last24h = async (req: express.Request, res: express.Response) => {
        try{

            const reservations = await Reservation.find();

            let cnt = 0;

            if(!reservations || reservations.length == 0){
                return res.status(404).json("No reservations.");
            }
            else{
                let curr_date = new Date();
                for(let i = 0; i < reservations.length; i++){
                    if(reservations[i].status == "approved"){
                        
                        const dt_arr = reservations[i].dt_of_reservation?.split(' ');
                        if(dt_arr !== undefined){
                            const date_str = dt_arr[0];
                            const time_str = dt_arr[1];

                            const date_arr = date_str.split('-');
                            const time_arr = time_str.split(':');
                            const year = parseInt(date_arr[0]);
                            const month = parseInt(date_arr[2]) - 1; 
                            const day = parseInt(date_arr[1]);
                            const hours = parseInt(time_arr[0]);
                            const minutes = parseInt(time_arr[1]);

                            const reservation_date = new Date(year, month, day, hours, minutes);


                            const timeDifference = curr_date.getTime() - reservation_date.getTime();
                            const hoursDifference = timeDifference / (1000 * 60 * 60);
                            console.log(hoursDifference);

                            if (hoursDifference <= 24) {
                                cnt++;
                            }

                        }


                    }
                    
                }
                res.json(cnt);
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    num_of_reservations_last7d = async (req: express.Request, res: express.Response) => {
        try{

            const reservations = await Reservation.find();

            let cnt = 0;

            if(!reservations || reservations.length == 0){
                return res.status(404).json("No reservations.");
            }
            else{
                let curr_date = new Date();
                for(let i = 0; i < reservations.length; i++){
                    if(reservations[i].status == "approved"){
                        
                        const dt_arr = reservations[i].dt_of_reservation?.split(' ');
                        if(dt_arr !== undefined){
                            const date_str = dt_arr[0];
                            const time_str = dt_arr[1];

                            const date_arr = date_str.split('-');
                            const time_arr = time_str.split(':');
                            const year = parseInt(date_arr[0]);
                            const month = parseInt(date_arr[2]) - 1; 
                            const day = parseInt(date_arr[1]);
                            const hours = parseInt(time_arr[0]);
                            const minutes = parseInt(time_arr[1]);

                            const reservation_date = new Date(year, month, day, hours, minutes);


                            const timeDifference = curr_date.getTime() - reservation_date.getTime();
                            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

                            if (daysDifference <= 7) {
                                cnt++;
                            }

                        }


                    }
                    
                }
                res.json(cnt);
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    num_of_reservations_last1m = async (req: express.Request, res: express.Response) => {
        try{

            const reservations = await Reservation.find();

            let cnt = 0;

            if(!reservations || reservations.length == 0){
                return res.status(404).json("No reservations.");
            }
            else{
                let curr_date = new Date();
                for(let i = 0; i < reservations.length; i++){
                    if(reservations[i].status == "approved"){
                        
                        const dt_arr = reservations[i].dt_of_reservation?.split(' ');
                        if(dt_arr !== undefined){
                            const date_str = dt_arr[0];
                            const time_str = dt_arr[1];

                            const date_arr = date_str.split('-');
                            const time_arr = time_str.split(':');
                            const year = parseInt(date_arr[0]);
                            const month = parseInt(date_arr[2]) - 1; 
                            const day = parseInt(date_arr[1]);
                            const hours = parseInt(time_arr[0]);
                            const minutes = parseInt(time_arr[1]);

                            const reservation_date = new Date(year, month, day, hours, minutes);


                            const timeDifference = curr_date.getTime() - reservation_date.getTime();
                            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

                            if (daysDifference <= 30) {
                                cnt++;
                            }

                        }


                    }
                    
                }
                res.json(cnt);
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}