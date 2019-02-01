import { db, resetDb } from '../db/db.js';
import uuidv4 from 'uuid/v4';

export default {
  async loadSessions({ commit }) {
    let sessions = await db.sessions.toArray();
    sessions.forEach(s => commit('addSession', s));
  },
  async loadGoal({ commit }) {
    let weeklyGoal = (await db.weeklyGoal.toArray())[0];
    if (typeof weeklyGoal === 'object') {
      commit('setWeeklyGoal', weeklyGoal.duration);
    }
  },
  async setPracticeGoal({ commit }, goalDuration) {
    let existingPracticeGoal = await db.weeklyGoal.get(1);
    if (existingPracticeGoal != null) {
      await db.weeklyGoal.update(existingPracticeGoal._key, {
        duration: goalDuration
      });
    } else {
      await db.weeklyGoal.add({ duration: goalDuration });
    }
    commit('setWeeklyGoal', goalDuration);
  },
  async createPracticeSession({ commit }, session) {
    session.id = uuidv4();
    await db.sessions.add(session);
    commit('addSession', session);
  },
  async updateSessionRecordings({ commit }, { _key, audioRecordings }) {
    await db.sessions.update(_key, { audioRecordings });
    commit('updateSessionRecordings', { _key, audioRecordings });
  },
  async deletePracticeSession({ commit }, { session }) {
    await db.sessions.delete(session._key);
    commit('deleteSession', session.id);
  },
  async resetLocalDb({ commit }) {
    await resetDb();
    commit('clearSessions');
    commit('clearGoal');
  }
};
