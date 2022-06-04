const credentials = require("./credentials/credentials.json");
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';

const rl = readline.createInterface({ input, output });
rl.question("From what language do you want to translate? ",  (inputLanguage) => {
    rl.question("To what language do you want to translate? ", (outputLanguage) => {
        rl.question("What do you want to translate? ", async (input) => {
            rl.close();
            let query = setQuery(inputLanguage, outputLanguage, input);
            let options = setOptions(query);
            let response = await getResponse(options);

            console.log("\n" + response['translations'][0]['translatedText']);
        });
    });
});

function setQuery(inputLanguage, outputLanguage, input) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source", inputLanguage);
    encodedParams.append("target", outputLanguage);
    encodedParams.append("q", input);

    return encodedParams;
}

function setOptions(query) {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        'X-RapidAPI-Key': credentials.apiKey
      },
      body: query
    };

    return options;
}
async function getResponse(options) {
    let response = await fetch(url, options);
    let responseJson = await response.json();
    let data = responseJson['data'];

    return data;
}

