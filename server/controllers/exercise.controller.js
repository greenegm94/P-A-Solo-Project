const Exercise = require ("../models/exercise.models");

module.exports = {
    createExercise: (req, res) => {
        Exercise.create(req.body)
        .then((newExercise) => {
            return res.json(newExercise);
        })
        .catch((err) => console.log(err));
    },

    getExercises: (req, res) => {
        Exercise.find({})
        .then((allExercises) => {
            res.json(allExercises);
        })
        .catch((err) => console.log(err))
    },

};
