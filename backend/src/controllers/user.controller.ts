import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import User from '../models/user';

const defaultPhotoPath = "C:\\Users\\anjci\\OneDrive\\Desktop\\pia projekat\\frontend\\src\\assets\\profile-photo.jpg";

export class UserController{
    login = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let password = req.body.password;

    

            const user = await User.findOne({'username': username});

            if(!user){
                res.status(404).json(null);
            }
            else{
                if(typeof user.password == 'string'){
                    const match = await bcrypt.compare(password, user.password);
                    if(match){
                        if(user.active == 1)
                            res.json(user);
                        else
                        res.status(404).json(null);
                    }
                    else{
                        res.status(404).json(null);
                    }
                }
                
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
        
    }

    getProfilePicture = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.params.username;

            const user = await User.findOne({'username': username});

            if(!user){
                res.status(404).json({message: "User not found. "});
            }
            else{
                res.json({photo: user.photo});
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    registerGuest = async (req: express.Request, res: express.Response) => {
        try{

            let photo: Buffer;

            if (!(req as any).files || Object.keys((req as any).files).length === 0) {
                // return res.status(400).send('No files were uploaded.');
                photo = fs.readFileSync(defaultPhotoPath);
            }
            else{
                const file = (req as any).files.file;
                photo = file.data;
            }

            const username = req.body.username;
            const password = req.body.password;
            const hashed_password = await bcrypt.hash(password, 10);
            const answer = req.body.answer;
            const name = req.body.name;
            const surname = req.body.surname;
            const gender = req.body.gender;
            const address = req.body.address;
            const phone = req.body.phone;
            const email = req.body.email;
            const type = req.body.type;
            const credit_number = req.body.credit_number;
            const active = req.body.active;

            const denied_username = await User.findOne({username: username, accepted: 0});
            const denied_email = await User.findOne({email: email, accepted: 0});

            if(denied_username || denied_email){
                res.status(404).json({message: "Chosen username/ email has been disapproved in the past."});
            }
            else{
                const new_user = await User.create({
                    username: username,
                    password: hashed_password,
                    answer: answer,
                    name: name,
                    surname: surname,
                    gender: gender,
                    address: address,
                    phone: phone,
                    email: email,
                    photo: photo,
                    type: type,
                    credit_number: credit_number,
                    active: active,
                    accepted: -1
                });
    
    
                res.status(201).json(true);
            }
            

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    activate_user = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;

            const user = await User.findOne({'username': username});

            if(!user){
                res.status(404).json({message: "User not found. "});
            }
            else{
                user.active = 1;
                user.accepted = 1;
                await user.save()
                res.json(user);
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    reset_password_with_old = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let old_password = req.body.old_password;
            let new_password = req.body.new_password;

            const user = await User.findOne({'username': username});

            if(!user){
                res.status(404).json({message: "User not found. "});
            }
            else{

                if(typeof user.password == 'string'){
                    const match = await bcrypt.compare(old_password, user.password);
                    if(match){
                        const hashed_password = await bcrypt.hash(new_password, 10);

                        user.password = hashed_password;
                        await user.save()
                        res.json(user);
                    }
                    else{
                        res.status(404).json({message: "Invalid old password. Try again. "});
                    }
                }
                
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    check_security_answer= async(req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let answer = req.body.answer;

            const user = await User.findOne({'username': username});

            if(!user){
                res.status(404).json({message: "User not found."});
            }
            else{
                if(user.answer != answer){
                    res.status(404).json({message: "Answer doesn't match. "});
                }
                else{
                    res.status(201).json(true);
                }
            }

            
        }
        catch(err){
            console.error(err);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    change_password = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let new_password = req.body.new_password;

            const user = await User.findOne({'username': username});

            if(!user){
                res.status(404).json({message: "User not found. "});
            }
            else{

                const hashed_password = await bcrypt.hash(new_password, 10);

                user.password = hashed_password;
                await user.save()
                res.json(user);
                
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    update_user = async (req: express.Request, res: express.Response) => {
        try{

            let photo: Buffer | null = null;

            if ((req as any).files && Object.keys((req as any).files).length !== 0) {
                const file = (req as any).files.file;
                photo = file.data;
            }

            

            const old_username = req.body.old_username;
            const username = req.body.username;
            const password = req.body.password;
            const answer = req.body.answer;
            const name = req.body.name;
            const surname = req.body.surname;
            const address = req.body.address;
            const phone = req.body.phone;
            const email = req.body.email;
            const credit_number = req.body.credit_number;

            const user = await User.findOne({'username': old_username});
            
            if(!user){
                res.status(404).json({message: "User not found. "});
            }
            else{
                if(username)
                    user.username = username;
                if(password){
                    const hashed_password = await bcrypt.hash(password, 10);
                    user.password = hashed_password;
                }
                if(answer)
                    user.answer = answer;
                if(name)
                    user.name = name;
                if(surname)
                    user.surname = surname;
                if(address)
                    user.address = address;
                if(phone)
                    user.phone = phone;
                if(email)
                    user.email = email;
                if(photo)
                    user.photo = photo;
                if(credit_number)
                    user.credit_number = credit_number;
                
                await user.save()
                res.json(user);
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    number_of_registered_guests = async (req: express.Request, res: express.Response) => {
        try{
            const guests = await User.find({type: 'gost', active: 1}).exec();

            res.json(guests.length);
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_all_guests = async (req: express.Request, res: express.Response) => {
        try{
            const guests = await User.find({type: 'gost'}).exec();

            if(!guests){
                res.status(404).json({message: "No guests found in the system. "});
            }
            else
                res.json(guests);
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_all_waiters = async (req: express.Request, res: express.Response) => {
        try{
            const waiters = await User.find({type: 'konobar'}).exec();

            if(waiters.length == 0){
                res.status(404).json({message: "No waiters found in the system. "});
            }
            else
                res.json(waiters);
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    update_accepted = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.user.username;

            const user = await User.findOne({'username': username});

            if(!user){
                res.status(404).json({message: "User not found. "});
            }
            else{
                user.accepted = 0;
                await user.save()
                res.json(user);
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_user = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;

            // console.log(username);
            const user = await User.findOne({'username': username});

            if(!user){
                res.status(404).json({message: "User not found. "});
            }
            else{
                res.json(user);
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}