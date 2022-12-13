import express from 'express';
import { finished } from 'stream';
import { database } from './config';

const router = express.Router();

router.get('/todo', async (req, res) => {
    res.render('index');
});

router.get('/loadTodolist', async (req, res) => {
    const todolist = await database.todolist.findMany();
    res.json(todolist);
})

router.get('/todo/:id', async (req, res) => {
    res.render('todo');
});

router.get('/loadTasks/:id', async (req, res) => {
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
    res.json(tasks);
});

router.post('/addTodo', async (req, res) => {
    const name = req.body.name;
    console.log(name);
    const createTodolist = await database.todolist.create({
        data: {
            name: name,
        }
    });
    res.json(createTodolist);
});

router.post('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const task = await database.taskdetails.create({
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
    res.json(task);
});

router.delete('/todo', async (req, res) => {
    const taskid = parseInt(req.body.id);

    await database.taskdetails.delete({
        where: {
            id: taskid
        },
        include: {
            taskrelations: true
        }
    });
    res.sendStatus(200);
});

router.patch('/todo', async (req, res) => {
    const taskid = parseInt(req.body.id);
    const checked = req.body.checked === "true" ? true : false;
    await database.taskdetails.update({
        where: {
            id: taskid
        },
        data: {
            finished: checked
        }
    });
    res.sendStatus(200);
});

export { router as todo }

