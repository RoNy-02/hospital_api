import express from 'express';
import swaggerUi from 'swagger-ui-express';
import connection from './db.js';
import swaggerDocument from './swagger.js';

const app = express();

app.use(express.json());
//doc swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res)=>{
    res.send('Bienvenido a la API de Hospital')
});

app.get('/medicamentos', (req, res) => {
    connection.query('SELECT * FROM medicamentos', (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({
                error: 'Error al consultar los medicamentos'
            });
        }
        res.json(results);
    });
});


app.get('/doctores', (req, res) => {
    connection.query('SELECT * FROM doctores', (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({
                error: 'Error al consultar los medicamentos'
            });
        }

        res.json(results);
    });
});
//ver por id

app.get('/medicamentos/:id', (req, res) =>{
    const idMedicamento = Number(req.params.id);
    if (!Number.isInteger(idMedicamento) || idMedicamento < 1) {
        return res.status(400).json({
            error: 'El ID del Medicamento debe ser un entero positivo'
        });
    }
    connection.query('SELECT * FROM medicamentos WHERE id_medicamento = ?', [idMedicamento], (err, result) =>{
        if(err){
            console.error('Error al actualizar al doctor:', err);
            return res.status(500).json({
                error: 'Error al visualizar el medicamento'
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'No se encontr[o el doctor'
            });
        }
        res.json({result
        });
    })
})

app.get('/doctores/:id', (req, res) =>{
    const idDoctor = Number(req.params.id);
    if (!Number.isInteger(idDoctor) || idDoctor < 1) {
        return res.status(400).json({
            error: 'El ID del Doctor debe ser un entero positivo'
        });
    }
    connection.query('SELECT * FROM doctores WHERE id_doctor = ?', [idDoctor], (err, result) =>{
        if(err){
            console.error('Error al actualizar al doctor:', err);
            return res.status(500).json({
                error: 'Error al visualozar al doctor'
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'No se encontr[o el doctor'
            });
        }
        res.json({result
        });
    })
})

app.post('/medicamentos', (req, res)=>{
    connection.query('INSERT INTO medicamentos set ?',[req.body],(err, rows)=>{
        if(err){
            console.error('Error al insertar', err);
            return res.status(500).json({
                error: 'Error al crear el medicamento'
            });
        }
        res.status(201).json({
            message: 'Medicamento registrado',
            id_medicamento: rows.insertId
        });
    })
});

app.post('/doctores', (req, res)=>{
    connection.query('INSERT INTO doctores set ?',[req.body],(err, rows)=>{
        if(err){
            console.error('Error al insertar', err);
            return res.status(500).json({
                error: 'Error al insertar al doctor'
            });
        }
        res.status(201).json({
            message: 'Doctor registrado',
            id_doctor: rows.insertId
        });
    })
});

app.delete('/medicamentos/:id', (req, res) =>{
    const idMedicamento = Number(req.params.id);
    if (!Number.isInteger(idMedicamento) || idMedicamento < 1) {
        return res.status(400).json({
            error: 'El ID del medicamento debe ser un entero positivo'
        });
    }
    connection.query('DELETE FROM medicamentos WHERE id_medicamento = ?', [idMedicamento], (err, result) =>{
        if(err){
            console.error('Error al eliminar el medicamento:', err);
            return res.status(500).json({
                error: 'Error al eliminar el medicamento'
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'No se encontró el medicamento'
            });
        }
        res.json({
            message: 'Medicamento eliminado',
            id_medicamento: idMedicamento
        });
    })
})

app.delete('/doctores/:id', (req, res) =>{
    const idDoctor = Number(req.params.id);
    if (!Number.isInteger(idDoctor) || idDoctor < 1) {
        return res.status(400).json({
            error: 'El ID del Doctor debe ser un entero positivo'
        });
    }

    connection.query('DELETE FROM doctores WHERE id_doctor = ?', [idDoctor], (err, result) =>{
        if(err){
            console.error('Error al eliminar al doctor:', err);
            return res.status(500).json({
                error: 'Error al eliminar al doctor'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'No se encontr[o el doctor'
            });
        }

        res.json({
            message: 'Doctor eliminado',
            id_doctor: idDoctor
        });
    })
})

//Actualizar
app.put('/medicamentos/:id', (req, res) =>{
    const idMedicamento = Number(req.params.id);
    if (!Number.isInteger(idMedicamento) || idMedicamento < 1) {
        return res.status(400).json({
            error: 'El ID del medicamento debe ser un entero positivo'
        });
    }
    connection.query('UPDATE medicamentos SET ? WHERE id_medicamento = ?', [req.body, idMedicamento], (err, result) =>{
        if(err){
            console.error('Error al actualizar el medicamento:', err);
            return res.status(500).json({
                error: 'Error al actualizar el medicamento'
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'No se encontró el medicamento'
            });
        }
        res.json({
            message: 'Medicamento modificado',
            id_medicamento: idMedicamento
        });
    })
})

app.put('/doctores/:id', (req, res) =>{
    const idDoctor = Number(req.params.id);
    if (!Number.isInteger(idDoctor) || idDoctor < 1) {
        return res.status(400).json({
            error: 'El ID del Doctor debe ser un entero positivo'
        });
    }
    connection.query('UPDATE doctores SET ? WHERE id_doctor = ?', [req.body,idDoctor], (err, result) =>{
        if(err){
            console.error('Error al actualizar al doctor:', err);
            return res.status(500).json({
                error: 'Error al actualizar al doctor'
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'No se encontr[o el doctor'
            });
        }
        res.json({
            message: 'Doctor actualizado',
            id_doctor: idDoctor
        });
    })
})




app.listen (process.env.PORT || 3000, ()=> {
    console.log('servidor activo en puerto 3000')
});
