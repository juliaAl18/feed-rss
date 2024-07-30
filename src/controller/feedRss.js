const service = require('../service/feedRss');

const rssFeedNoticias = async (req, res) => {
    const noticias = await service.rssFeedNoticias();
    if (noticias.length == 0) {
        res.status(404).json({mensagem: 'Não foram encontrados os dados das noticias!'});
    } else {
        res.status(200).json(noticias);
    }
}

module.exports = {
    rssFeedNoticias
}