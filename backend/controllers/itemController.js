const Items = require("../models/itemModel");
const Users = require("../models/userModel");
const { request } = require("graphql-request");

const LEETCODE_ENDPOINT = "https://leetcode.com/graphql/";

const itemController = {
  getUserItems: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      const result = [];

      user.problems.forEach(({ problem, status, updatedAt }) =>
        result.push({
          problem,
          status,
          updatedAt,
        })
      );

      console.log(user.problems);

      res.json({ problems: result, success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
  createUserItem: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);

      const itemToSave = { ...req.body };
      itemToSave.updatedAt = new Date();

      const existingProblem = user.problems.findIndex(
        ({ problem }) => problem.title === itemToSave.problem.title
      );

      if (existingProblem !== -1) {
        if (user.problems[existingProblem].status !== itemToSave.status) {
          console.log("asd");
          user.problems[existingProblem] = itemToSave;
        }
      } else {
        user.problems.push(itemToSave);
      }

      user.save();

      return res.json({
        msg: "Successfully saved leetcode problem.",
        success: true,
        problems: user.problems,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
  deleteItem: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);

      user.problems = user.problems.filter(
        ({ problem }) => req.body.title !== problem.title
      );
      user.save();

      res.json({
        problems: user.problems,
        msg: "Deleted leetcode problem.",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
  getProblemInfo: async (req, res) => {
    try {
      const { titleSlug } = req.body;

      const problemInfo = await Items.findOne({ titleSlug }).select(
        "-_id -__v"
      );

      if (problemInfo) {
        return res.status(200).json({
          problemInfo,
          success: true,
          msg: "Successfully retrieved problem info.",
        });
      }

      const variables = {
        titleSlug,
      };

      const query = `query questionTitle($titleSlug: String!){
        question(titleSlug: $titleSlug){
            questionId
            title
            titleSlug
            difficulty
            topicTags {
                name
                slug
            }
        }
    }`;

      const response = await request(LEETCODE_ENDPOINT, query, variables);

      if (!response)
        return res.status(400).json({
          msg: `"No problem found matches ${titleSlug}`,
          success: false,
        });

      const newProblemInfo = {
        ...response.question,
        link: `https://leetcode.com/problems/${response.question.titleSlug}/`,
      };

      const newItem = new Items(newProblemInfo);
      newItem.save();

      return res.status(200).json({
        problemInfo: newProblemInfo,
        success: true,
        msg: "Successfully retrieved problem info.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
};
module.exports = itemController;
