const Datastore = require('nedb-promises');
let db = new Datastore('./activities.db');

const activities = require('./activities.json');
// We let NeDB create _id property for us.

async function initActivities(){
    let temp = await db.remove({});
    console.log(`After remove: ${JSON.stringify(temp)}`);
    temp = await db.insert(activities);
    console.log(`After insert: ${JSON.stringify(temp)}`);
}

initActivities();