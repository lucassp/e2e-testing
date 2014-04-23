var express = require('express'),
    app = express(),
    todos = [],
    server;

app.use(express.static(__dirname));
app.use(express.json());

app.get("/todos", function (req, res) {
    res.send(200, todos);
});

app.get("/todos/:id", function (req, res) {
    res.send(200, todos.filter(function (todo) {
        return todo.id == req.params.id;
    })[0]);
});

app.put("/todos/:id", function (req, res) {
    var index;

    todos.forEach(function (todo, i) {
        if (todo.id === parseInt(req.params.id, 10)) {
            index = i;
        }
    });

    if (index != undefined) {
        todos[index] = req.body;
    }

    res.send(200);
});

app.post("/todos", function (req, res) {
    todos.push(req.body);
    req.body.id = todos.indexOf(req.body);
    res.send(201, todos.indexOf(req.body).toString());
});

app.delete("/todos/:id", function (req, res) {
    var index;

    todos.forEach(function (todo, i) {
        if (todo.id === parseInt(req.params.id, 10)) {
            index = i;
        }
    });

    if (index != undefined) {
        todos.splice(index, 1);
    }

    res.send(200);
});

server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});