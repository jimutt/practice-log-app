import Dexie from 'dexie';

let db;

let initDb = function() {
  db = new Dexie('practicenow');
  db.version(1).stores({
    sessions: '++_key, &id, title, endTime, duration, audioRecordings',
    weeklyGoal: '++_key, duration'
  });
};

let resetDb = async function() {
  db.sessions.clear();
  db.weeklyGoal.clear();
};

export { db, initDb, resetDb };
