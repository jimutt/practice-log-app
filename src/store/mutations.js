export default {
  setAudioInputId(state, deviceId) {
    state.selectedAudioInputId = deviceId;
  },
  addSession(state, practice) {
    state.sessions.push(practice);
  },
  updateSessionRecordings(state, { _key, audioRecordings }) {
    let session = state.sessions.find(s => s._key === _key);
    session.audioRecordings = audioRecordings;
  },
  deleteSession(state, sessionId) {
    let index = state.sessions.findIndex(s => s.id === sessionId);
    if (index > -1) {
      state.sessions.splice(index, 1);
    }
  },
  clearSessions(state) {
    state.sessions = [];
  },
  clearGoal(state) {
    state.weeklyGoal = null;
  },
  setWeeklyGoal(state, goalDuration) {
    state.weeklyGoal = goalDuration;
  }
};
