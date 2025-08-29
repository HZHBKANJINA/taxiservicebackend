require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const http=require('http');
const {Server}=require('socket.io');

const app=express();
const server=http.createServer(app);
const PORT=process.env.PORT;
const MONGODB_URI=process.env.MONGODB_URI;

const io=new Server(server,{
    cors:{
        origin:'http://localhost:8080',
        methods:['GET','POST','PUT','DELETE']
    }
});

app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    req.io=io;
    next();
});

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true});
const connection=mongoose.connection;

connection.once('open',()=>{
    console.log('Konekcija uspostavljena');
});

io.on('connection', (socket) => {
    console.log('Socket.io korisnik spojen:', socket.id);
});


require('./models/address');
require('./models/driver');
require('./models/operator');
require('./models/passenger');
require('./models/ride');
require('./models/user');
require('./models/vehicle');

const addressesRouter=require('./routes/addresses');
const driversRouter=require('./routes/drivers');
const operatorsRouter=require('./routes/operators');
const passengersRouter=require('./routes/passengers');
const ridesRouter=require('./routes/rides');
const usersRouter=require('./routes/users');
const vehiclesRouter=require('./routes/vehicles');

app.use('/addresses',addressesRouter);
app.use('/drivers',driversRouter);
app.use('/operators',operatorsRouter);
app.use('/passengers',passengersRouter);
app.use('/rides',ridesRouter);
app.use('/users',usersRouter);
app.use('/vehicles',vehiclesRouter);

server.listen(PORT,()=>{
    console.log(`Server je pokrenut na portu ${PORT}`);
});