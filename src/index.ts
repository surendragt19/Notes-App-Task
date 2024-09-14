import express from 'express';
import bodyParser from 'body-parser';
import noteRoutes from './routes/noteRoutes';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', noteRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
