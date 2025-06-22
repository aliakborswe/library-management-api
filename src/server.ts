import {Server} from 'http';
import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';


let server: Server;
const port = process.env.PORT || 3000;

async function main(){
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ltyf59a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Connected to MongoDB');
        server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
}
main();