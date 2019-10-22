"use strict"
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const TelegramBot = require('node-telegram-bot-api');
let Message = '';

const app = express();
const port = process.env.PORT;
const token = process.env.token;
const url = "https://telegram----bot.herokuapp.com/";

app.use(bodyparser.json());
app.use(morgan('combined'));
app.use(compression());
app.use(helmet());


const bot = new TelegramBot(token);
// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${token}`);
// We are receiving updates at the route below!
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`Our site is hosted on ${port}! If you donot know to open just go to browser and type (localhost:${port})`)
});

bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, 'I am alive!' + msg.chat.id + ` \n\n ${msg.message_id}`);
  console.log("\n" + JSON.stringify(msg));
  if (msg.text.toLowerCase === 'delete') {
    Message = ""
  } else if (msg.text) {
    Message = msg.text;
  }
});

app.get('/message', (req, res) => {
  res.send(Message);
});