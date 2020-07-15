import express from 'express';
import FileHelper from '@helpers/FileHelper';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app
  .listen(3333, () => {
    console.log('App started on port 3333, please wait for file processing');
  })
  .on('listening', () => {
    // Preload file at start
    FileHelper.reloadFile();
    console.log('File was processed, you can use now');
  });
