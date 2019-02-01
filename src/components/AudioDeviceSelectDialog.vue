<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-form ref="form">
        <v-card-title class="headline grey lighten-2" primary-title>Audio device</v-card-title>

        <v-card-text>
          <v-select
            :items="devicesSelectList"
            item-text="label"
            item-value="deviceId"
            label="Choose an input device"
            solo
            v-model="selectedDevice"
            :rules="[d => !!d || 'Select a device']"
            required
          ></v-select>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="showDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click.prevent="submit" type="submit">Record</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import dialogMixin from '../mixins/dialogMixin';
export default {
  mixins: [dialogMixin],
  props: {
    devices: Array
  },
  data() {
    return {
      selectedDevice: null
    };
  },
  computed: {
    devicesSelectList() {
      if (!Array.isArray(this.devices) || this.devices.length < 1) return [];
      return this.devices;
    }
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      this.showDialog = false;
      this.$emit('record', this.selectedDevice);
    }
  }
};
</script>
