<template>
  <v-layout wrap>
    <h1 class="title mb-1">{{ sessionTitle }}</h1>
    <v-flex xs12 class="text-xs-center">
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <p class="display-3">{{ duration | minuteSecondsClock }}</p>
            </v-flex>
            <v-flex xs6>
              <v-btn
                v-if="state != 'paused'"
                col
                outline
                color="secondary"
                class="ml-0 mr-1"
                style="width: 100%"
                @click="pause"
              >Pause</v-btn>
              <v-btn
                v-else
                col
                outline
                color="secondary"
                class="ml-0 mr-1"
                style="width: 100%"
                @click="resume"
              >Resume</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn
                col
                outline
                color="primary"
                class="mr-0 ml-1"
                style="width: 100%"
                @click="finishPractice"
              >End practice</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <audio-recorder v-model="audioRecordings"></audio-recorder>
    <!-- TODO: Pass session id to recorder -->
  </v-layout>
</template>
<script>
import AudioRecorder from './AudioRecorder.vue';
import { mcall } from 'q';
import { setInterval } from 'timers';
import timeFilters from '../mixins/timeFilters.js';

export default {
  components: {
    AudioRecorder
  },
  props: {
    sessionTitle: {
      type: String,
      required: true
    }
  },
  mixins: [timeFilters],
  data() {
    return {
      state: 'active' /* active, paused, finished */,
      duration: 0,
      audioRecordings: []
    };
  },
  created() {
    this.startSession();
  },
  methods: {
    startSession() {
      let lastTimestamp = Date.now();
      setInterval(() => {
        if (this.state === 'paused' || lastTimestamp == null) {
          lastTimestamp = Date.now();
          if (this.state === 'paused') return;
        }
        this.duration += Date.now() - lastTimestamp;
        lastTimestamp = Date.now();
      }, 100);
    },
    pause() {
      this.state = 'paused';
    },
    resume() {
      this.state = 'active';
    },
    async finishPractice() {
      await this.$store.dispatch('createPracticeSession', {
        title: this.sessionTitle,
        endTime: new Date(),
        duration: this.duration,
        audioRecordings: this.audioRecordings
      });
      this.duration = 0;
      this.state = 'finished';
      this.$emit('done');
      this.$router.push('/history');
    }
  }
};
</script>
