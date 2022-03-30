// Require
require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const { Deepgram } = require('@deepgram/sdk')


// Configure
app.use(express.static('public'))
const deepgram = new Deepgram(process.env.DG_KEY)

// Logic
async function getTranscript() {
    function random(number) {
        return Math.floor(Math.random() * (number + 1));
    }

    const randomNumber = random(6)
    const response = await fetch('https://gist.githubusercontent.com/BekahHW/394d81b484f264b0c8b23c0e177f8588/raw/df7bba8dde4f96487dd843977a07991aba4ca511/quotes.json')

    const data = await response.json()
    const audioUrl = data[randomNumber].quote;
    const author = data[randomNumber].author

    const quoteTranscription = await deepgram.transcription.preRecorded({ url: audioUrl }, { punctuate: true, language: 'en-US' }, )
        .then((transcription) =>
            (transcription.results.channels[0].alternatives[0]))

    return {
        author: author,
        transcription: quoteTranscription
    }

}

app.get('/transcribe', (req, res) => {
    getTranscript().then((transcriptObj) =>
            res.send(transcriptObj))
        .catch((err) => {
            console.log(err);
        })

})

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})