const Workout = require('../models/workout.models');
const Relationship = require('../models/relationship.models');

module.exports = {
    createWorkout: (req, res) => {
        Workout.create({
            workoutName: req.body.name,
            createdUserId: req.body.id
        })
        .then((newWorkout) => {
            req.body.exercises.map((exercise) => {
                Relationship.create({
                    workoutId: newWorkout._id,
                    exerciseId: exercise.exerciseId,
                    weight: exercise.weight,
                    reps: exercise.reps,
                    restTime: exercise.restTime
                })
                .catch((err) => console.log(err));
            })
            return res.json(newWorkout);
        })
        .catch((err) => console.log(err));
    },

    getWorkouts: (req, res) => {
        Workout.find({createdUserId: req.params.id})
        .then((allWorkouts) => {
            res.json(allWorkouts);
        })
        .catch((err) => console.log(err))
    },

    getWorkout: (req, res) => {
        let exercises = [];
        Workout.findOne({_id: req.params.id})
        .then((workout) => {
            Relationship.find({workoutId: req.params.id})
            .then((relationships) => {
                relationships.map((relationship) => {
                    exercises.push(relationship)
                });
            })
            .then(() => {
                res.json({...workout, exercises: exercises});
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    },

    deleteWorkout: (req, res) => {
        Workout.deleteOne({_id:req.params.id})
            .then((deleteWorkout) =>  {
                res.json(deleteWorkout);
            })
            .catch((err) => console.log(err))
    },

    updateWorkout: (req,res) => {
        Workout.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
            .then(updatedWorkout => res.json(updatedWorkout))
            .catch(err => res.json(err))
    },

};
