require("dotenv").config()
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");


// Below isthe Telegram token receive from @BotFather
const apiKey = process.env.API_KEY
const token = process.env.TELEGRAM_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on("message", (message)=>{
    let id = message.from.id;
    bot.sendMessage(id, "HELLO FROM SEHGYBOT")

  })

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show available commands');  
});

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show available commands');
  });

bot.onText(/\/meaning/, async (msg) => {
  const chatId = msg.chat.id;
  
    try {
      // Make an external API request using axios
      const response = await axios.get('https://dictionaryapi.com/api/v3/references/thesaurus/json/doom?key='+apiKey);
  
      // Process the API response data
      const wordData = response.data[0]
  
      // Send the weather data back to the user
      bot.sendMessage(chatId, `Here's the meaning of "${wordData.meta.id.toUpperCase()}":\n
FL: ${wordData.fl} \n
${wordData.shortdef.map((def, i)=> `(${i + 1}) ` + def + "\n").join("")}\n
EXAMPLES: ${wordData.def[0].sseq.map((def, i)=> `(${i + 1}) ` + def[0][1].dt[1][1][0].t.replace("{it}", "**").replace("{/it}", "**") + "\n").join("")}
SYNONYMS: ${wordData.meta.syns.flat(1).join(", ")}\n
ANTONYMS: ${wordData.meta.ants.flat(1).join(", ")}
      `);
   
      console.log(apiKey, token)
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error fetching weather data:', error.message);
      bot.sendMessage(chatId, 'Sorry, there was an error fetching weather data. Please try again later.');
    }
  });
  
  
  

// http.createServer((req, res)=>{
//       axios.get('https://dictionaryapi.com/api/v3/references/thesaurus/json/good%looking?key=bba0e17d-cbc6-4d21-8b14-180d0eab2243')
//         .then((response) => {
//           console.log(response.data); // The API response data
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//   }).listen(5050)