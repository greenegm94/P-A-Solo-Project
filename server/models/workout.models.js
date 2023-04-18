const mongoose = require('mongoose');
const WorkoutSchema = new mongoose.Schema(
    {

        workoutName: {
            type: String,
            required: [true, "Workout Name is required"]
        },

        createdUserId: {
            type: String,
            required: [true, 'No User ID found']
        }


    },
    {timestamps: true},
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

// module.exports =
//     mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
