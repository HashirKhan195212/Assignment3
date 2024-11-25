var express = require('express');
// Create a router object from Express
var router = express.Router();
// Calls model from model folder
let Schedule = require('../model/schedule'); // Use consistent model name

function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login'); // Fixed typo
    }
    next();
}

// Route to get the list of all exams or entries
router.get('/', async (req, res, next) => {
    try {
        const scheduleList = await Schedule.find();
        res.render('Exam/index', {
            title: 'Exam Schedule', // Ensure title is included
            displayName: req.user ? req.user.displayName : '',
            scheduleList: scheduleList
        });
    } catch (err) {
        console.error(err);
        res.render('Exam/index', {
            error: 'Error on Server',
            title: 'Exam Schedule', // Add title here for consistency
        });
    }
});

// Route to display the add page
router.get('/add', async (req, res, next) => {
    try {
        res.render('Exam/add', {
            title: 'Add Exam', // Include title here
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err) {
        console.error(err);
        res.render('Exam/index', {
            error: 'Error on Server',
            title: 'Exam Schedule' // Consistent fallback title
        });
    }
});

// Route to handle adding new data
router.post('/add', async (req, res, next) => {
    try {
        let newSchedule = new Schedule({
            Course: req.body.Course,
            CourseCode: req.body.CourseCode,
            Professor: req.body.Professor,
            Day: req.body.Day,
            Weight: req.body.Weight
        });
        await newSchedule.save();
        res.redirect('/'); // Redirect to the homepage
    } catch (err) {
        console.error(err);
        res.render('Exam/index', {
            error: 'Error on server',
            title: 'Exam Schedule' // Add title for error page
        });
    }
});

// Route to show the edit page for schedule
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const scheduleToEdit = await Schedule.findById(id);
        if (!scheduleToEdit) {
            return res.status(404).send('Exam not found');
        }
        res.render('Exam/edit', {
            title: 'Edit Exam', // Include title
            displayName: req.user ? req.user.displayName : '',
            Schedule: scheduleToEdit
        });
    } catch (err) {
        console.error(err);
        res.render('Exam/index', {
            error: 'Error on Server',
            title: 'Exam Schedule' // Consistent fallback title
        });
    }
});

// Route to handle editing exam information
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedSchedule = {
            Course: req.body.Course,
            CourseCode: req.body.CourseCode,
            Professor: req.body.Professor,
            Day: req.body.Day,
            Weight: req.body.Weight
        };
        await Schedule.findByIdAndUpdate(id, updatedSchedule);
        res.redirect('/'); // Redirect to the homepage
    } catch (err) {
        console.error(err);
        res.render('Exam/index', {
            error: 'Error on server',
            title: 'Exam Schedule' // Add title for error page
        });
    }
});

// Route to handle deleting an exam
router.post('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Schedule.deleteOne({ _id: id });
        res.redirect('/'); // Redirect to the homepage
    } catch (err) {
        console.error(err);
        res.render('Exam/index', {
            error: 'Error on server',
            title: 'Exam Schedule' // Add title for error page
        });
    }
});

module.exports = router;
