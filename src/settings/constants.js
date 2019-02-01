export let practiceStates = {
  INACTIVE: 0,
  ACTIVE: 2
};

export let constantsMixin = {
  data() {
    return {
      constants: {
        practiceStates
      }
    };
  }
};
