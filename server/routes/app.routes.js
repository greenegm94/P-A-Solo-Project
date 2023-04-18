const UserController = require("../controllers/user.controller");
const ExerciseController = require("../controllers/exercise.controller");
const WorkoutController = require("../controllers/workouts.controller");

module.exports = (app) => {
    app.post("/api/create_user", UserController.createUser);
    app.post("/api/login_user", UserController.loginUser);
    app.post("/api/logout_user", UserController.logoutUser);
    app.post("/api/create_exercise", ExerciseController.createExercise);
    app.post("/api/create", WorkoutController.createWorkout);
    app.get("/api/exercises", ExerciseController.getExercises);
    app.get("/api/get_workouts/:id", WorkoutController.getWorkouts);
    app.get("/api/get_workout/:id", WorkoutController.getWorkout);
    app.put("/api/edit_workout/:id", WorkoutController.updateWorkout);
    app.delete("/api/delete/:id", WorkoutController.deleteWorkout);
}