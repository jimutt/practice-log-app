<template>
  <v-list class="elevation-1">
    <template v-if="Array.isArray(recordings) && recordings.length < 1">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>No recordings have been made</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
    <template v-for="(item, $index) in sortedRecordings">
      <v-list-tile :key="$index">
        <v-list-tile-action>
          <v-btn fab outline small color="secondary" class="mr-3" @click="playRecording(item)">
            <v-icon>play_arrow</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Recording {{recordings.length - $index}}</v-list-tile-title>
          <v-list-tile-sub-title>{{item.duration | prettyMs}}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple @click="$emit('delete', item)">
            <v-icon color="red lighten-2">delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </template>
    <playback-dialog v-model="showPlaybackDialog" :recording="activeRecording"></playback-dialog>
  </v-list>
</template>

<script>
import PlaybackDialog from './PlaybackDialog.vue';
import timeFilters from '../mixins/timeFilters';

export default {
  components: {
    PlaybackDialog
  },
  mixins: [timeFilters],
  props: {
    recordings: Array,
    required: true
  },
  data() {
    return {
      showPlaybackDialog: false,
      activeRecording: null
    };
  },
  computed: {
    sortedRecordings() {
      return this.recordings.sort((a, b) => b.endTime - a.endTime);
    }
  },
  methods: {
    playRecording(recording) {
      this.showPlaybackDialog = true;
      this.activeRecording = recording;
    }
  }
};
</script>
