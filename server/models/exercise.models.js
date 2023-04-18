const mongoose = require('mongoose');
const ExerciseSchema = new mongoose.Schema(
    {
        exerciseName: {
            type: String,
            required: [true, "An Exercise name is required"]
        }

    },
    {timestamps: true},
);

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;