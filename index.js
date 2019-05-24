require('dotenv').config();
const express = require('express')
const app = express()

const request_promise = require('request-promise')
const $ = require('cheerio')
const url = 'https://www.wordunscrambler.net'

app.get('/', (req, res) => {
  res.send('<h1>Welcome to <b><i>unscramble crawler</i></b></h1>')
})

app.get('/wordget', async (req, res) => {
  console.log('QUERY PARAMS: ', req.query)
  unscramble(req.query.word).then(function(res_){
    const response = $('.words > a', res_);
    const unscrambled = [];
    for (let i = 0; i < response.length; i++) {
      if (response[i].children[0].data.length > 2) {
        unscrambled.push(response[i].children[0].data)
      }
    }
    res.json({
      data: unscrambled,
      word: req.query.word
  });
  }).catch(err => {
    console.log(err)
  })
    
})
app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));


async function unscramble(word) {
const unscrambled = [];
if (word && word !== undefined) {
    // console.log(word)
    return request_promise(url + `?word=${word}`)
  }
  // return unscrambled;
}
