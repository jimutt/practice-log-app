import Vue from 'vue';
import Vuex from 'vuex';

import { practiceStates } from '../settings/constants';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    practiceState: practiceStates.INACTIVE,
    selectedAudioInputId: null,
    recentSessionTypes: [],
    sessions: [],
    weeklyGoal: null
  },
  mutations,
  actions
});
