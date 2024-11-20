const express = require("express");
const router = express.Router();

// Course controllers Impport
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
} = require('../controllers/Course');


// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require('../controllers/Category');


// Sections Controllers Import
const {
    createSection,
    updateSection,
    deleteSection,
} = require('../controllers/Section');


// Sub-Sections Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/SubSection")


// Rating Controllers Import
const {
    createRating,
    getAverageRating,
    getAllRatingReview,
} = require("../controllers/RatingAndReview")

const {
    updateCourseProgress,
    getProgressPercentage
  } = require("../controllers/courseProgress");

// import Middlewares
const {
    auth,
    isAdmin,
    isInstructor,
    isStudent,
} = require('../middlewares/auth');


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth,isInstructor, createCourse);
// Add a Section to a Course
router.post("/addSection", auth, createSection);
// Update a Section
router.put("/updateSection", auth,  updateSection);
// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, createSubSection);
// Edit Sub Section
router.put("/updateSubSection", auth, updateSubSection);
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.put("/editCourse", auth,  editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
router.get("/getProgressPercentage", auth, isStudent, getProgressPercentage);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingReview);

module.exports = router