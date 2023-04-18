const mongoose = require('mongoose');
const RelationshipSchema = new mongoose.Schema(
    {
        workoutId: {
            type: String,
            required: [true, "Workout Required"]
        },

        exerciseId: {
            type: String,
            required: [true, "Exercise Required"]
        },

        weight: {
            type: Number,
            required: [true, "Weight is required"]
        },

        reps: {
            type: Number,
            required: [true, "Reps is required"]
        },

        restTime: {
            type: Number,
            required: [true, "Rest Time is required"]
        }

    },
    {timestamps: true},
);

const Relationship = mongoose.model("Relationship", RelationshipSchema);

module.exports = Relationship;