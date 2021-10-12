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
        executedCommand(command);
    },
    youtube(target, context, args, command) {
        client.say(target, `https://www.youtube.com/channel/UCduqNRUbhbzPbNmmK6ODrfQ`);
        executedCommand(command);
    },
    twitter(target, context, args, command) {
        client.say(target, `https://twitter.com/distopiapdc`);
        executedCommand(command);
    },
    discord(target, context, args, command) {
        client.say(target, `https://discord.gg/hTy3xD9dWn`);
        executedCommand(command);
    },
    cortes(target, context, args, command) {
        client.say(target, `MELHORES CLIPES DA LIVE EM https://www.youtube.com/channel/UCwrxru7te7vuttU546DG6OA`);
        executedCommand(command);
    },
    followage(target, context, args, command) {
        const request = require('request');
        request(`https://beta.decapi.me/twitch/followage/${target.substring(1)}/${context.username}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            client.say(target, `@${context.username} é abençoado por badabing há ${body}`);
        });
        executedCommand(command);
    },
    humor(target, context, args, command) {
        client.say(target, `maiconkusterhumorcontato@outlook.com`);
        executedCommand(command);
    },
    zaza(target, context, args, command) {
        client.say(target, `https://docs.google.com/document/d/10oqGc_pzhaVjQ7kG_Mlbz6MuA64gibVNtmklyQxdrtw/edit`);
        executedCommand(command);
    },
    badabing(target, context, args, command) {
        const texto = randomText();
        client.say(target, `badabing diz ${texto}`);
        executedCommand(command);
    },
    cellbit(target, context, args, command) {
        client.say(target, `oi pleb, vire sub https://www.twitch.tv/subs/distopiapdc`);
        executedCommand(command);
    },
    comandos(target, context, args, command) {
        client.say(target, `!redes !youtube !twitter !discord !cortes !followage !zaza !humor !badabing !sonhos !cringe !nota !minecraft !pix !emblemas`);
        executedCommand(command);
    },
    sonhos(target, context, args, command) {
        client.say(target, `escute SONHOS TOMAM CONTA https://www.last.fm/pt/music/sonhos+tomam+conta/`);
        executedCommand(command);
    },
    cringe(target, context, args, command) {
        client.say(target, `PALAVRA EM QUARENTENA, SUBSTITUIDA POR "GEEK"`);
        executedCommand(command);
    },
    async nota(target, context, args, command) {
        if(args.length < 4) {
            return client.say(target, `Argumentos insuficientes -> !nota <Usuario> <m || a> <Obra>`);
        }
        for(i = 4; i < args.length; i++) args[3] += ` ${args[i]}`;
        let nota = require("./mal");
        let response = await nota.nota(args[1], args[2], args[3]);
        client.say(target, `${response}`);
        executedCommand(command);
    },
    minecraft(target, context, args, command) {
        client.say(target, `TABELAS DE SUB`);
        client.say(target, `-=> https://imgur.com/a/CCdmgM3`);
        executedCommand(command);
    },
    pix(target, context, args, command) {
      client.say(target, `DA DINHEIRO`);
      client.say(target, `-=> https://livepix.gg/distopiapdc`)
      executedCommand(command);
    },
    emblemas(target, context, args, command) {
      client.say(target, `EMBLEMAS`);
      client.say(target, `-=> https://imgur.com/a/aArXBea`)
      executedCommand(command);
    },
    emblema(target, context, args, command) {
      client.say(target, `EMBLEMAS`);
      client.say(target, `-=> https://imgur.com/a/aArXBea`)
      executedCommand(command);
    },
    trolge(target, context, args, command) {
      client.say(target, `⣀⣠⣤⣤⣤⣤⢤⣤⣄⣀⣀⣀⣀⡀⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄ ⠄⠉⠹⣾⣿⣛⣿⣿⣞⣿⣛⣺⣻⢾⣾⣿⣿⣿⣶⣶⣶⣄⡀⠄⠄⠄ ⠄⠄⠠⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣿⣿⣿⣿⣿⣿⣆⠄⠄ ⠄⠄⠘⠛⠛⠛⠛⠋⠿⣷⣿⣿⡿⣿⢿⠟⠟⠟⠻⠻⣿⣿⣿⣿⡀⠄ ⠄⢀⠄⠄⠄⠄⠄⠄⠄⠄⢛⣿⣁⠄⠄⠒⠂⠄⠄⣀⣰⣿⣿⣿⣿⡀ ⠄⠉⠛⠺⢶⣷⡶⠃⠄⠄⠨⣿⣿⡇⠄⡺⣾⣾⣾⣿⣿⣿⣿⣽⣿⣿ ⠄⠄⠄⠄⠄⠛⠁⠄⠄⠄⢀⣿⣿⣧⡀⠄⠹⣿⣿⣿⣿⣿⡿⣿⣻⣿ ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠉⠛⠟⠇⢀⢰⣿⣿⣿⣏⠉⢿⣽⢿⡏ ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠠⠤⣤⣴⣾⣿⣿⣾⣿⣿⣦⠄⢹⡿⠄ ⠄⠄⠄⠄⠄⠄⠄⠄⠒⣳⣶⣤⣤⣄⣀⣀⡈⣀⢁⢁⢁⣈⣄⢐⠃⠄ ⠄⠄⠄⠄⠄⠄⠄⠄⠄⣰⣿⣛⣻⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡯⠄⠄ ⠄⠄⠄⠄⠄⠄⠄⠄⠄⣬⣽⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠄⠄ ⠄⠄⠄⠄⠄⠄⠄⠄⠄⢘⣿⣿⣻⣛⣿⡿⣟⣻⣿⣿⣿⣿⡟⠄⠄⠄ ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠛⢛⢿⣿⣿⣿⣿⣿⣿⣷⡿⠁⠄⠄⠄ ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠉⠉⠉⠉⠈⠄⠄⠄⠄⠄⠄`);
      executedCommand(command);
    }
}


function onMessageHandler (target, context, message, self) {
    if (self) { return; }

    if(includesMessage(message, 'cellbit')) {
        acceptedCommands['cellbit'](target, null, null, 'cellbit');
    }
    if(includesMessage(message, 'pix')) {
        acceptedCommands['pix'](target, null, null, 'pix');
    }
    if(includesMessage(message, 'trolge')) {
        acceptedCommands['trolge'](target, null, null, 'trolge');
    }
    
    
    if(message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var command = args[0];
        console.log(args);
        const commandFunction = acceptedCommands[command.toLowerCase()];
        if(commandFunction) {
            commandFunction(target, context, args, command);
            return;
        }
        console.log(`* Unknown command`);
    }
}

function includesMessage(mensagem, comparar) {
    if (mensagem.includes(comparar)) return true;
    const teste = mensagem.split(" ");
    for(var i = 0; i < teste.length; i++) {
        if(teste[i] === comparar) return true;
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

function executedCommand(command) {
    console.log(`* Executed ${command} command`);
}