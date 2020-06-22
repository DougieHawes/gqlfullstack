const {} = require("apollo-server-express");

const me = () => "Dougie Hawes";

module.exports = {
  Query: {
    me,
  },
};
