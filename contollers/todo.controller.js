const db = require("../models")
const Todo = db.todos

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send("Content cant be empty")
        return
    }

    const todo = new Todo({
        title: req.body.title
    })

    todo
        .save(todo)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Todo."
            })
        })
}

exports.findAll = (req, res) => {
    const title = req.query.title
    let condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {};
    Todo.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the Todo."
            })
        })

}

exports.findOne = (req, res) => {
    const id = req.params.id

    Todo.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: `Not found Todo with id=${id}`});
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({message: `Error retrieving Todo with id=${id}`});
        })
}
exports.update = (req, res) => {
    const id = req.params.id
    Todo.findById(id, (err, todo) => {
        if (err) {
            res.send(Error)
        }
        todo.isDone = !todo.isDone

        todo.save((err, data) => {
            if (data) {
                return res.send({message: `Todo was updated successfully now '${todo.title}': ${todo.isDone}`})
            }
            res.status(500).send({message: `Error retrieving Todo with id=${id}`})
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
                });
            } else {
                res.send({
                    message: "Todo was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Todo with id=${id}`
            });
        });
};

exports.deleteAll = (req, res) => {
    Todo.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} All todos were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all todos."
            });
        });
};

exports.findAllDone = (req, res) => {
    Todo.find({isDone: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


