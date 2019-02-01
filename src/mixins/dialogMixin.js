export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
