const express = require('express');
import { Request, Response } from 'express';
import cors from 'cors';
import {saveEvent,meetingData,getDashboard,getIvr} from './database/database'

const app = express();
app.use(cors())

app.use(express.json());



const userData = [
    {id: 1,
        title: 'gahsssahj@jasdhjv.com',
        start: new Date(2024,7,12,8,30),
        end: new Date(2024,7,12,9,30)
    },{
        id: 2,
        title: 'sdfhuisdf@gmail.com',
        start: new Date(2024,7,13,9,0),
        end: new Date(2024,7,13,10,0)
    },
    {
        id: 3,
        title: 'asdsad.@gmail.com',
        start: new Date(2024,7,14,10,30),
        end: new Date(2024,7,14,11,30)
    }
   

]
app.get('/dashboard', (req : Request , res: Response) => {

    getDashboard().then((data)=>{
        if(data){
            res.json({
                data: data.rows
            })
        }else{
            res.status(404).json({
                message: 'No events found'
            })
        }
    }).catch((err)=>{

        res.status(401).json({
            "message": "error",
            error: err
        })
    })

    

})
app.get('/ivres', (req : Request , res: Response) => {

    getIvr().then((data)=>{
        if(data){
            res.json({
                data: data.rows
            })
        }else{
            res.status(404).json({
                message: 'No events found'
            })
        }
    }).catch((err)=>{

        res.status(401).json({
            "message": "error",
            error: err
        })
    })

    

})

app.get('/getAllData',(req:Request,res: Response) => {
    meetingData().then((resfrom)=>{
        if(resfrom){
            res.json({
                data: resfrom
            })
        }else{
            res.status(404).json({
                message: 'No events found'
            })
        }
    }).catch((err)=>{
        res.status(401).json({
            "message": "error",
            error: err
        })
    });
    
    

})



app.post('/add',(req:Request, res: Response)=>{
    const newEvent = req.body;
    console.log("line 60 " , newEvent)
    userData.push(newEvent);
    console.log(userData)
    console.log( typeof  saveEvent)
    saveEvent(newEvent).then((resFromEvent)=>{
        
        if (resFromEvent){
            console.log('Event saved successfully')
            res.json({
                message: 'New Event added successfully',
                data: newEvent
            })
        }else{
            console.log('Error saving event')
            res.status(400).json({
                message: 'Error saving event',
            })
        }

        
        
    }).catch((err)=>{
        res.status(401).json({
            "message": "error",
            error: err
        })
    })
    
})



app.listen(3001,()=>{
    console.log('Server is running on port 3001');
})