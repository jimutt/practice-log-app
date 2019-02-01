<template>
  <v-container>
    <v-layout wrap>
      <h1 class="title mb-1 mt-1">Session details</h1>
      <v-flex xs12 class="text-xs-center">
        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <h1 class="headline mb-1 mt-4">{{ session.title }}</h1>

                <p class="display-3">{{ session.duration | prettyMs }}</p>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-layout row wrap>
          <h1 class="title mb-1 mt-4">Audio recordings</h1>
          <v-flex xs12>
            <recording-list :recordings="session.audioRecordings" @delete="deleteRecording"></recording-list>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import timeFilters from '../mixins/timeFilters.js';
import RecordingList from '../components/RecordingList.vue';

export default {
  components: {
    RecordingList
  },
  mixins: [timeFilters],
  data() {
    return {};
  },
  computed: {
    session() {
      return (
        this.$store.state.sessions.find(
          s => s.id === this.$route.params.id
        ) || { audioRecordings: [], duration: 0 }
      );
    }
  },
  methods: {
    deleteRecording(recording) {
      this.$store.dispatch('updateSessionRecordings', {
        _key: this.session._key,
        audioRecordings: this.session.audioRecordings.filter(
          x => !Object.is(x, recording)
        )
      });
    }
  }
};
</script>
