import express from 'express';
import dotenv from 'dotenv';
import db from './database/configdb.js';
import userRoute from './routes/user.route.js';
import exampleRoute from './routes/example.route.js';
import noteRoute from './routes/note.routes.js'; // Importa a rota de notas

dotenv.config();
db.connect();

const app = express();

app.use(express.json());

app.use("/users", userRoute);
app.use("/secureExampleRoute", exampleRoute);
app.use("/notes", noteRoute); // Registra a rota de notas

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});