const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config(); 

const scrapingNoticias = async () => {
    const filtroSangue = 'https://news.google.com/search?for=doa%C3%A7%C3%A3o+de+sangue&hl=pt-BR&gl=BR&ceid=BR%3Apt-419';

    const executarScraping = async (filtro, fonte) => {
        const url = filtro;
        let browser = null;

        const ENV =  process.env.ENV;

        if (ENV === 'local') {
            browser = await puppeteer.launch();
        } else {
            browser = await puppeteer.launch({
                timeout: 0,
                headless: true,
                executablePath: "/usr/bin/chromium",        
                args: ['--no-sandbox']
            });
        }

        const page = await browser.newPage();
        await page.goto(url, { timeout: 60000 });

        const dadosPesquisa = await page.evaluate(() => {
            
            const noticias = document.querySelectorAll('div.B6pJDd');
            const resultados = [];

            noticias.forEach((noticia, index) => {
                if (index < 15) { // Limita a 15 notícias
                    const tituloNoticia = noticia.querySelector('div.IL9Cne > a')?.innerText;
                    const urlNoticia = 'https://news.google.com' + noticia.querySelector('div.IL9Cne > a')?.getAttribute('href');
                    const urlImg = 'https://news.google.com' + document.querySelectorAll('div.m5k28')[0].querySelector('figure > img').getAttribute('src');

                    if (tituloNoticia && urlNoticia && urlImg) {
                        resultados.push({
                            texto: tituloNoticia,
                            url: urlNoticia,
                            urlImg: urlImg
                        });
                    }
                }
            });

            return resultados;
        });

        await browser.close();
        console.log('Scraping no Google News realizado com sucesso!');

        return dadosPesquisa.map(dado => ({
            texto: dado.texto,
            url: dado.url,
            urlImg: dado.urlImg,
            fonte: fonte
        }));
    }

    const dados = await executarScraping(filtroSangue, 'Noticias');

    const feedNoticias = dados;

    console.log('Salvando os dados do feed de notícias no arquivo JSON...');
    const dadosJson = JSON.stringify(feedNoticias, null, 2);
    fs.writeFile('noticias.json', dadosJson, (err) => {
        if (err) throw err;
        console.log('Dados salvos com sucesso em:', 'noticias.json');
    });

}

module.exports = {
    scrapingNoticias
};
