import express from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/admin';

export class AdminController{
    login = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;
            let password = req.body.password;

    

            const admin = await Admin.findOne({'username': username});

            if(!admin){
                res.status(404).json(null);
            }
            else{
                if(typeof admin.password == 'string'){
                    const match = await bcrypt.compare(password, admin.password);
                    if(match){
                        res.json(admin);
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

    add_requests = async (req: express.Request, res: express.Response) => {
        try{
            let name = req.body.name;
            let surname = req.body.surname;
            let username = req.body.username;
            let admin_username = req.body.admin_username;

            const admin = await Admin.findOne({'username': admin_username});

            if (!admin) {
                throw new Error(`Admin with username ${admin_username} not found.`);
            }

            if (!admin.requests) {
                admin.requests = [];
            }

            admin?.requests.push({
                name: name,
                surname: surname,
                username: username
            });

            await admin.save();
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    get_all_requests = async (req: express.Request, res: express.Response) => {
        try{

            const admin = await Admin.findOne({'username': 'anja'});

            if (!admin) {
                throw new Error(`Admin not found.`);
            }

            res.json(admin.requests);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    remove_request = async (req: express.Request, res: express.Response) => {
        try{
            let username = req.body.username;

            const admin = await Admin.findOne({'username': 'anja'});

            if (!admin) {
                throw new Error(`Admin not found.`);
            }

            if (!admin.requests) {
                admin.requests = [];
            }

            let ind = -1;
            for(let i = 0; i < admin.requests.length; i++){
                if(admin.requests[i].username == username){
                    ind = i;
                    break;
                }
            }

            if(ind != -1){
                admin.requests.splice(ind, 1);
            }

            await admin.save();
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


}