export default {
  set set(refs) {
    refs.forEach(ref => {
      const name = Object.keys(ref);
      const link = Object.values(ref);
      if (name.length>1) {
          throw new Error('Wrong format!!!')
      }
      this[name[0]] = link[0];
    });
  },
};
