import connectdb from './src/db/db.js';
import dotenv from 'dotenv';
dotenv.config();
import {app} from './app.js';

const PORT = process.env.PORT || 8000;


connectdb()
.then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`⚙️Server running on port ${PORT}`);
    })
})
.catch((err)=>{
    console.log('Error connecting to the database', err);
    process.exit(1);  // Exit the process with an error code of 1
})