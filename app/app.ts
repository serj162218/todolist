import express from 'express';
import path from 'path';
import { todo } from './todo';

const app = express();


//view engine
app.set('view engine', 'ejs');

//bodyEncoder, use from POST
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', todo);

//route
app.get('/', async (req, res) => {
    res.redirect('/todo');
});


//listening
app.listen(3000, () => {
    console.log("listening port on 3000.");
})