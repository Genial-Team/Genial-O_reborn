// @ts-ignore
import '../setupGlobalLogger';

import express from 'express';
import initDatabase from './database/init';

const init = async () => {
    const app = express();
    const port = process.env.EXPRESS_PORT || 3000;

    app.use((req: any, res: any, next: () => void) => {
        if (!req.headers.key || req.headers.key !== process.env.EXPRESS_API_SECRET) {
            return res.status(401).send({message: "Invalid API key"});
        }
        next();
    });

    app.listen(port, () => {
        global.logger.info(`Server listening at http://localhost:${port}`);
    });

    return app;
}

// Lancement du service d'API
init()
    .catch(err => {
        global.logger.error(`❌ Erreur lors du lancement du service d'API: ${err.message}`);
    });

// Lancement du service de base de données
initDatabase()
    .catch(err => {
        global.logger.error(`❌ Erreur lors de la connexion à la base de données: ${err.message}`);
    });