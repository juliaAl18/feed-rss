const rssFeedNoticias = async () => {
    try {
        const feedNoticias = require('../../noticias.json');
        return feedNoticias;
    } catch {
        return [];
    }
}

module.exports = {
    rssFeedNoticias
}