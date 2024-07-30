const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const scheduleService = require('./src/service/schedules/webScraping');
const routesAll = require('./src/routes/index/mainRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routesAll);

const PORT = 3000;
console.log('Executando scraping inicial...');
scheduleService.scrapingNoticias();       

// Serviço agendado que roda todo dia as meia noite (00:00)
cron.schedule(`0 0 * * *`, () => {
    console.log('Executando scraping...');
    scheduleService.scrapingNoticias();   
});

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`)
});