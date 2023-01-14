import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Code Generator'
    })
})

app.post('/', async (req, res) => {
    try{
        const prompt = req.body.prompt;

        const response = await openai.Completion.create(
            model="text-davinci-003",
            prompt=`${prompot}`,
            temperature=0.7,
            max_tokens=64,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
          );

        res.status(200).send({
            bot: res.addTrailers.choices[0].text
        })

    }catch(error){
        console.log(err);
        res.status(500).send({err})
    }
})

app.listen(5000, ()=>{
    console.log("Server is running on Port http://localhost:5000")
})