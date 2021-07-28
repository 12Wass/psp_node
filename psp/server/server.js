import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// PSP Endpoint listening for POST request on /process_payment
app.post('/process_payment', (req, res) => {

  console.log('PSP received a payment request: ', req.body);
  
  setTimeout(() => {
    // Waiting 10 seconds before send a response
    // Do card verification and other things must be handle by PSP here
    console.log('PSP has finished verifications');
    res.status(200).json({ success: true });

  }, 10 * 1000);

  
});

const serverPort = 9000;
// Start server
const server = app.listen(serverPort);

export default app;
