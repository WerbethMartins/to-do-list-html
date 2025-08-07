var express = require('express');
var router = express.Router();

// A lista de tarefas agora é uma variável global do módulo
let tasks = [
    { id: 1, titulo: 'Estudar Node.js', concluida: false },
    { id: 2, titulo: 'Fazer o CSS', concluida: false },
];

// Rota GET para retornar todas as tarefas
router.get('/tarefas', function(req, res, next) {
    res.json(tasks);
});

// Rota POST para adicionar uma nova tarefa
router.post('/tarefas', function(req, res, next) {
    // Validação de titulo
    if(!req.body.titulo || req.body.titulo.trim() === '') {
        return res.status(400).json({ error: 'Título é obrigatório' });
    }
    
     const newTask = {
        id: Date.now(),
        titulo: req.body.titulo,
        concluida: false // Uma nova tarefa sempre começa como não concluída
    };

    // Adiciona a nova tarefa à lista
    tasks.push(newTask);
    
    console.log('Nova tarefa recebida:', newTask);
    
    res.status(201).json(newTask);
});

module.exports = router;