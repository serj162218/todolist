import express from 'express';
import path from 'path';
import { PrismaClient } from '@prisma/client'

const app = express();

//view engine
app.set('view engine', 'ejs');

//bodyEncoder, use from POST
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

const database = new PrismaClient();

//route
app.get('/', async (req, res) => {
    res.redirect('/todo');
});


app.get('/todo', async (req, res) => {
    const todolist = await database.todolist.findMany();
    res.render('index', { data: todolist });
});

app.get('/todo/:id', async (req, res) => {
    const tasks = await database.todolist.findUnique(
        {
            where: { id: parseInt(req.params.id) },
            include: {
                taskrelations:
                {
                    include: { taskdetails: true }
                }
            }
        }
    );

    res.render('todo', { data: tasks?.taskrelations });
});

app.post('/todo/:id', async (req, res) => {
    const id = req.params.id;
    await database.taskdetails.create({
        data: {
            name: req.body.name,
            finished: false,
            taskrelations: {
                create: [
                    { todolist: { connect: { id: parseInt(id) } }, },
                ]
            }
        }
    });
    res.redirect(`/todo/${id}`);
});

//listening
app.listen(3000, () => {
    console.log("listening port on 3000.");
})