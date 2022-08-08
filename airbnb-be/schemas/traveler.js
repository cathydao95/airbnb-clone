export default {
  name: "traveler",
  title: "Traveler",
  // want host and traveler to share a refernece so that is why type is reference
  type: "reference",
  to: [{ type: "person" }],
};
