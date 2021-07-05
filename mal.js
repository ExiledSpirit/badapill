const axios = require('axios');

async function returnJson(search, teste) {
    const response = await axios.get(`https://api.jikan.moe/v3/user/${search.user}/${search.list}?q=${search.work}&order_by=title&sort=desc`)
        .then(res => {
            var response;
            if(search.list === 'animelist') {
                if(!res.data.anime[0]) return 'O usuario ainda não listou essa obra';
            }
            else {
                if(!res.data.manga[0]) return 'O usuario ainda não listou essa obra';
            }
            response = getAnimeManga(res.data);
            response.user = search.user;
            return toString(response);
        })
        .catch(err => {
            return err.message;
        });
    return response;
}

exports.nota = async function nota(user, list, work) {
    list = correctList(list);

    const search = {
        user: user,
        list: list,
        work: work
    };
    if(!verificaArgumentos(search)){
         console.log('Especifique <mangalist || animelist>');
    }
    return await returnJson(search);
}

function getAnimeManga(api) {
    var response;
    if(api.manga){
        response = {
            user: 'user',
            title: api.manga[0].title,
            score: api.manga[0].score
        };
    }
    if(api.anime) {
        response = {
            user: 'user',
            title: api.anime[0].title,
            score: api.anime[0].score
        };
    }

    return response;
}

function correctList(list) {
    if(list === 'm') return 'mangalist';
    if(list === 'a') return 'animelist';
    return list;
}

function verificaArgumentos(search) {
    const acceptedLists = ['mangalist', 'animelist'];
    if(acceptedLists.includes(search.list)) return true;
    return false;
}

function toString(response) {
    return stringResponse = `${response.user} avaliou ${response.title} com ${response.score}`;
}