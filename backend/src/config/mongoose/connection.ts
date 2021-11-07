import mongoose from 'mongoose';

const dbName = process.env.MONGODB_DB;
const dbPass = process.env.MONGODB_PASS;
const dbUser = process.env.MONGODB_USER;

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.ecwwm.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri);
