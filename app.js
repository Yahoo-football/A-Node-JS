import express from 'express';
import router from './routes/product.route.js'
const app = express();
app.use(express.json());
app.use('/product',router)


export default app
