require('dotenv').config();
const tmi = require('tmi.js');

const opts = {
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [
        'distopiapdc'
    ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();



const acceptedCommands = {
    redes(target, context, args, command) {
        client.say(target, `https://linktr.ee/distopiapdc`);
        console.log(`* Executed ${command} command`);
    },
    youtube(target, context, args, command) {
        client.say(target, `https://www.youtube.com/channel/UCduqNRUbhbzPbNmmK6ODrfQ`);
        console.log(`* Executed ${command} command`);
    },
    twitter(target, context, args, command) {
        client.say(target, `https://twitter.com/distopiapdc`);
        console.log(`* Executed ${command} command`);
    },
    discord(target, context, args, command) {
        client.say(target, `https://discord.gg/BrJ8K85NmF`);
        console.log(`* Executed ${command} command`);
    },
    cortes(target, context, args, command) {
        client.say(target, `MELHORES CLIPES DA LIVE EM https://www.youtube.com/channel/UCwrxru7te7vuttU546DG6OA`);
        console.log(`* Executed ${command} command`);
    },
    followage(target, context, args, command) {
        const request = require('request');
        request(`https://beta.decapi.me/twitch/followage/${target.substring(1)}/${context.username}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            client.say(target, `@${context.username} é abençoado por badabing há ${body}`);
        });
        console.log(`* Executed ${command} command`);
    },
    humor(target, context, args, command) {
        client.say(target, `maiconkusterhumorcontato@outlook.com`);
        console.log(`* Executed ${command} command`);
    },
    zaza(target, context, args, command) {
        client.say(target, `https://docs.google.com/document/d/10oqGc_pzhaVjQ7kG_Mlbz6MuA64gibVNtmklyQxdrtw/edit`);
        console.log(`* Executed ${command} command`);
    },
    badabing(target, context, args, command) {
        const texto = randomText();
        client.say(target, `badabing diz ${texto}`);
        console.log(`* Executed ${command} command ${texto}`);
    },
    cellbit(target, context, args, command) {
        client.say(target, `oi pleb, vire sub https://www.twitch.tv/subs/distopiapdc`);
        console.log(`* Executed ${command} command`);
    },
    comandos(target, context, args, command) {
        client.say(target, `!redes !youtube !twitter !discord !cortes !followage !zaza !humor !badabing !sonhos !cringe`);
        console.log(`* Executed ${command} command`);
    },
    sonhos(target, context, args, command) {
        client.say(target, `escute SONHOS TOMAM CONTA https://www.last.fm/pt/music/sonhos+tomam+conta/`);
        console.log(`* Executed ${command} command`);
    },
    cringe(target, context, args, command) {
        client.say(target, `PALAVRA EM QUARENTENA, SUBSTITUIDA POR "GEEK"`);
        console.log(`* Executed ${command} command`);
    },
    nota(target, context, args, command) {
        if(args.length < 4) {
            client.say(target, `Argumentos insuficientes -> !nota <Usuario> <MangaList || AnimeList> <Obra>`);
            return;
        }
        const response = malResponse(args);
        client.say(target, response);
        
        console.log(`* Executed ${command} command`);
    }
}



function onMessageHandler (target, context, message, self) {
    if (self) { return; }

    if(isCellbit(message)) {
        acceptedCommands['cellbit'](target, null, null, 'cellbit');
    }
    
    
    if(message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var command = args[0];
        console.log(args);
        const commandFunction = acceptedCommands[command];
        if(commandFunction) {
            commandFunction(target, context, args, command);
            return;
        }
        console.log(`* Unknown command`);
    }
}

function isCellbit(mensagem) {
    const teste = mensagem.split(" ");
    for(var i = 0; i < teste.length; i++) {
        if(teste[i] === 'cellbit') return true;
    }
    return false;
}
function randomText() {
    const textos =  ['ao que tudo indica...', 'sim', 'creio que não.', 'você está ansioso, concentre-se e pergunte novamente', 'agora não da to vendo o jogo do flamengo', 'só cordinha pra resolver isso', 'é melhor não te contar...', 'duvidoso', 'objetivamente, sim', 'não tenho certeza... talvez um sub refresque minha memória', 'pergunte novamente depois', 'não.', 'silêncio o MODERADOR Carlima está papando xota.'];
    const value = Math.floor(Math.random() * textos.length);
    return textos[value];
}
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}


type = {
    mangalist(body) {
        if(body.manga) {
            //Verifica se foi encontrado algum manga
            if(body.manga.lenght < 1) {
                result = `${args[1]} ainda não avaliou essa obra`;
                return result;               
            }
            result = `Nota de ${args[1]}: ${body.manga[0].score}`;
            return result;
        }
    },
    animelist(body) {
        if(body.anime) {
            //Verifica se foi encontrado algum anime
            if(body.anime.lenght < 1) {
                result = `${args[1]} ainda não avaliou essa obra`;
                return result;               
            }
            result = `Nota de ${args[1]}: ${body.anime[0].score}`;
            return result;
        }
    }
}

//jikanApi
function malResponse(args) {
    //Verifica se fora enviado mangalist ou animelist
    const tipo = type[args[2]];
    if(!tipo) return `Especifique <mangalist || animelist>`;

    var result;
    //request jikan com parametro
    const request = require('request');
    request(`https://api.jikan.moe/v3/user/${args[1]}/${args[2]}?q=${args[3]}`, { json: true }, (err, res, body) => {
        console.log(body);
        //Se conter erro irá retornar como status
        if(body.status){
            return erros[body.status] ? erros[body.status]() : `Erro desconhecido`;
        }
        //Caso retorne com sucesso
        return tipo(body);
    });
}



const errors = {
    200() {
        return 'OK - the request was successful.';
    },
    304() {
        return 'Not Modified - You have the latest data';
    },
    400() {
        return 'Bad Request - You’ve made an invalid request';
    },
    404() {
        return 'Not Found - Resource not found, i.e MyAnimeList responded with a 404';
    },
    405() {
        return 'Method Not Allowed - requested method is not supported for resource';
    },
    429() {
        return 'Too Many Requests - You are being rate limited or Jikan is being rate limited by MyAnimeList (either is specified in the error message)';
    },
    500() {
        return 'Internal Server Error - Something is not working on our end, please open a Github issue by clicking on the generated report_url';
    },
    503() {
        return 'Service Unavailable - Something is not working on MyAnimeList’s end. MyAnimeList is either down/unavailable or is refusing to connect';
    }
}