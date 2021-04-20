// TODO: event handler
var data2 = {
  id: "b",
  type: "Counter",
  props: {
    nums: "1",
  },
  children: null,
};

var data1 = {
  title: "活动页",
  name: "Activity",
  components: [
    {
      id: "a",
      type: "div",
      props: {
        toWhat: "world",
      },
      children: ["Hello"],
    },
    {
      id: "b",
      type: "Counter",
      props: {
        nums: "1",
      },
      children: ["a"],
    },
  ],
};
/**
 *
 */
module.exports = {
  data1,
  data2,
};
