import cron from 'node-cron';
import { exec } from 'child_process';

import { Giveaway } from '../models/Associations.js';

import GiveawayService from '../services/GiveawayService.js';

const giveawayService = new GiveawayService();

class Cron {
    backup() {
        cron.schedule('0 0 0 * * *', () => {
            console.log('Backing up database...', new Date());
            exec('sh backup.sh',
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
        });
    }

    handleScheduledGiveaways() {
        cron.schedule('*/5 * * * *', async () => {
            const res = await Giveaway.findAndCountAll();
            const scheduledGiveaways = res.rows.filter(giveaway => giveaway.type === 'scheduled');
            if(scheduledGiveaways.length > 0) {
                giveawayService.handleScheduledGiveaways(scheduledGiveaways);
            }
        });
    }
}

export default Cron;