var express = require('express');
// Create a router object from Express
var router = express.Router();
// Calls model from model folder
let Calculator = require('../model/schedule');
function requireAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.redidirect('/login')
    }
    next();
}
// Route to get the list of all exams or entries
router.get('/', async (req, res, next) => {
    // Try catch method
    try {
        // Using all entries from the database using the Schedule model
        const scheduleList = await Calculator.find();
        res.render('Exam/index', {
            // Page title
            title: 'Exam Schedule',
            displayName:req.user ? req.user.displayName:'',
            // Data that will be used
            scheduleList: scheduleList
        });
    } catch (err) {
        // show the error to the console
        console.error(err);
        // Render an error message
        res.render('index', {
            error: 'Error on Server'
        });
    }
});
// / Route to display to add a new entry
router.get('/add', async (req, res, next) => {
    // Try catch method
    try {
        // Render the add page with a title
        res.render('Exam/add', {
            title: "Add Exam",
            displayName:req.user ? req.user.displayName:''
        });
    } catch (err) {
        // show the error to the console
        console.error(err);
        // Render an error message
        res.render('index', {
            error: 'Error on Server'
        });
    }
});

// Route to handle adding new data
router.post('/add', async (req, res, next) => {
    // Try catch method
    try {
        // Using all entries from the database using the Schedule model
        let newSchedule = new Schedule({
            "Course": req.body.Course,
            "CourseCode": req.body.CourseCode,
            "Professor": req.body.Professor,
            "Day": req.body.Day,
            "Weight": req.body.Weight
        });
        // Save the new entry to the database
        await newSchedule.save();
        // Redirects to schedule
        res.redirect('/index');  
    } catch (err) {
        // Redirects to schedule
        console.error(err);
        // Render an error message
        res.render('index', {
            error: 'Error on server'
        });
    }
});

// Route to show the edit page for schedule
router.get('/edit/:id', async (req, res, next) => {
    // Try catch method
    try {
        // Get the ID from the route parameters
        const id = req.params.id;
        // Find the entry to edit using the ID
        const ScheduleToEdit = await Schedule.findById(id);
        if (!ScheduleToEdit) {
            // If the entry is not found, send a 404 response
            return res.status(404).send('Values not found');
        }
        // Rendering the edit page
        res.render('Exam/edit', {
            title: 'Edit Values',
            Schedule: ScheduleToEdit
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// Route to handle editing exam information
router.post('/edit/:id', async (req, res, next) => {
    try {
        // Get the ID from the route parameters
        let id = req.params.id;
        // Create an updated entry with the data
        let updatedSchedule = {
            "Course": req.body.Course,
            "CourseCode": req.body.CourseCode,
            "Professor": req.body.Professor,
            "Day": req.body.Day,
            "Weight": req.body.Weight
        };
        // Find the entry by ID and update it in the database
        await Schedule.findByIdAndUpdate(id, updatedSchedule);
        res.redirect('/index');  // Redirect to schedule
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// Route to handle deleting an exam
router.post('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Schedule.deleteOne({ _id: id });
        res.redirect('/index');  // Redirect to Schedule
    } catch (err) {
        // errors to the console
        console.error(err);
        res.render('Exam/index', {
            error: 'Error on server'
        });
    }
});

module.exports = router;