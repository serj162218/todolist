import express from 'express';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { TaskDetails } from './models/TaskDetails';
import { TaskRelations } from './models/TaskRelations';
const app = express();

//view engine
app.set('view engine', 'ejs');

//bodyEncoder, use from POST
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const sequelize = new Sequelize('mysql://root:@127.0.0.1:3306/todolist');
sequelize.addModels([path.resolve(__dirname, `./models/`)])

app.use(express.static(path.join(__dirname, 'public')));

//route
app.get('/todo', async (req, res) => {
    const results = await TaskDetails.findAll();
    res.render('index', { data: results });
    console.log(results);
    
});

app.get('/todo/:id', async(req, res) => {
    const results = await TaskDetails.findByPk(req.params.id);
    res.render('index', { data: results });
    console.log(results);
});

app.post('/todo', async (req, res) => {
    console.table(req.body);
    const task: TaskDetails = await TaskDetails.create({ ...req.body, finished:false, type:0 });
    task.save();
    res.sendStatus(200);
});

//listening
app.listen(3000, () => {
    console.log("listening port on 3000.");
})