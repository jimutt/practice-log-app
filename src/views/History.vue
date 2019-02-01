<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" ref="progresscontainer">
        <v-progress-circular
          :rotate="-90"
          :size="progressWidth"
          :width="18"
          :value="progressValue"
          color="primary"
        >
          <div class="mb-2">
            <span class="grey--text">This week:</span>
          </div>
          <div>
            <span class="headline">
              <strong>{{ practiceDuration | prettyMs}}</strong>
            </span>
          </div>
          <div v-if="weeklyGoal == null">
            <v-btn class="mt-3" depressed color="primary" @click="setGoal = true">set a weekly goal</v-btn>
          </div>
          <div v-else>
            <div>
              <span class="grey--text darken-1--text">Goal: {{weeklyGoal | prettyMs}}</span>
            </div>
            <div>
              <a @click="setGoal = true">Update goal</a>
            </div>
          </div>
        </v-progress-circular>
      </v-flex>
      <v-flex xs12 class="mt-4">
        <h1 class="headline mb-2 text-xs-center">Sessions</h1>

        <v-card
          v-for="session in orderedSessions"
          :key="session.id"
          class="mb-2"
          :to="`/session/${session.id}`"
        >
          <v-card-text>
            <div class="mb-2">
              <span>{{ formatSessionDate(session.endTime) }}</span>
            </div>

            <span>
              <div class="mb-1">
                <span class="title">{{session.title}}</span>
                <v-btn
                  icon
                  ripple
                  @click.prevent="$store.dispatch('deletePracticeSession', session)"
                  class="session-delete-button"
                >
                  <v-icon color="red lighten-2">delete</v-icon>
                </v-btn>
              </div>
              <div>
                <span>{{ session.duration | prettyMs }}</span>
              </div>
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <set-goal-dialog v-model="setGoal"></set-goal-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import timeFilters from '../mixins/timeFilters.js';
import { startOfWeek } from 'date-fns';
import { setTimeout } from 'timers';
import SetGoalDialog from '../components/SetGoalDialog.vue';

export default {
  components: {
    SetGoalDialog
  },
  mixins: [timeFilters],
  computed: {
    ...mapState({
      sessions: 'sessions',
      weeklyGoal: 'weeklyGoal'
    }),
    orderedSessions() {
      return this.sessions.sort((a, b) => b.endTime - a.endTime);
    },
    practiceDuration() {
      let sessions = this.orderedSessions;
      if (!sessions || sessions.length < 1) return 0;
      return sessions.reduce((acc, session) => {
        if (session.endTime >= startOfWeek(new Date())) {
          return acc + session.duration;
        } else {
          return acc;
        }
      }, 0);
    },
    progressValue() {
      if (!this.progressEnabled || this.weeklyGoal == null) {
        return 0;
      }
      return this.practiceDuration / this.weeklyGoal;
    }
  },
  data() {
    return {
      progressWidth: 200,
      progressEnabled: false,
      setGoal: false
    };
  },
  methods: {
    formatSessionDate(sessionDate) {
      let options = { day: 'numeric', year: 'numeric', month: 'long' };
      return sessionDate.toLocaleDateString('en-US', options);
    }
  },
  mounted() {
    this.progressWidth = Math.min(
      350,
      0.9 * this.$refs.progresscontainer.offsetWidth
    );
    setTimeout(() => {
      this.progressEnabled = true;
    }, 500);
  }
};
</script>

<style scoped>
.session-delete-button {
  float: right;
  top: -10px;
}
</style>
