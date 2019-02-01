<template>
  <v-dialog v-model="showDialog" content-class="set-goal-dialog" max-width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Set weekly practice goal</v-card-title>
      <v-card-text>
        <p class="mb-5">How many hours of practice are you aiming for every week?</p>
        <v-layout row wrap justify-center>
          <v-flex xs10>
            <v-slider color="secondary" v-model="hours" :max="60" thumb-label="always"></v-slider>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-layout row justify-end>
          <v-btn flat color="grey" @click="showDialog = false">Cancel</v-btn>
          <v-btn depressed color="primary" @click="saveGoal">Save</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import dialogMixin from '../mixins/dialogMixin';

export default {
  mixins: [dialogMixin],
  data() {
    return {
      hours: 1
    };
  },
  methods: {
    saveGoal() {
      this.$store.dispatch('setPracticeGoal', this.hours * 3600000);
      this.showDialog = false;
    }
  }
};
</script>
