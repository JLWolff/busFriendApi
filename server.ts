import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, ()=>{
    console.log(`app is running on port ${process.env.PORT}`)
    console.log("chupirips")
});