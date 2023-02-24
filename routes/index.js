var express = require('express');
var router = express.Router();
const OngoingCourse = require('../classes/OngoingCourse')
const Student = require('../classes/Student')
const CompletedCourse = require('../classes/CompletedCourse')

const ongoingCourse = [
  new OngoingCourse(209, "System Design", "Computer Science", "designing systems for business", 30),
  new OngoingCourse(210, "Psychology", "Psychology", "Psych Development things", 0),
  new OngoingCourse(211, "Data Structures & Algorithms", "Computer Science", "arrays, lists, etc", 15),
  new OngoingCourse(212, "Modern Web Tech", "Computer Science", "Express.js stuff", 0),
  new OngoingCourse(213, "Gender Studies", "Psychology", "learning about genders", 25),
  new OngoingCourse(214, "Classical Music", "Music", "old tunes", 30)

]
const students = [
  new Student(1, 'Joshua', 'Computer Science', 2, [ongoingCourse[0], ongoingCourse[4], ongoingCourse[5]], [
    new CompletedCourse(144, "React development", "Computer Science", "react development",89),
    new CompletedCourse(111, "Database Development", "Computer Science", "Database Development",67),
    new CompletedCourse(135, "Calculus", "Math", "functions and calculus",70),
    new CompletedCourse(115, "Operating Systems", "Computer Science", "bash, terminal",60)
  ]),
  new Student(2, 'Kodie', 'Music', 2, [ongoingCourse[1], ongoingCourse[4], ongoingCourse[5]], [
    new CompletedCourse(490, "Music Theory", "Music", "music theory",66),
    new CompletedCourse(491, "Drumming", "Music", "Drums",90),
    new CompletedCourse(448, "Piano", "Music", "black and white keys",77),
    new CompletedCourse(467, "Flute", "Music", "flute  music",60)
  ]),
  new Student(3, 'Sohil', 'Psychology', 2, [ongoingCourse[1], ongoingCourse[4], ongoingCourse[5]], [
    new CompletedCourse(690, "Child Development", "Psychology", "child development",89),
    new CompletedCourse(677, "Psych Development", "Psychology", "people Development",67),
    new CompletedCourse(512, "Calculus", "Math", "functions and calculus",90),
    new CompletedCourse(679, "Isho Psych", "Psychology", "Isho stuff",60)
  ]),
  new Student(4, 'Moses', 'Computer Science', 2, [ongoingCourse[0], ongoingCourse[2], ongoingCourse[3]], [
    new CompletedCourse(144, "React development", "Computer Science", "react development",57),
    new CompletedCourse(111, "Database Development", "Computer Science", "Database Development",90),
    new CompletedCourse(135, "Calculus", "Math", "functions and calculus",84),
    new CompletedCourse(115, "Operating Systems", "Computer Science", "bash, terminal",65)
  ]),
]

router.get('/students', function (req, res) {
  res.render('students', {students: students})
});

router.get('/ongoingClass', function(req, res){
  res.render('ongoingCourses', {classes: ongoingCourse})
});
router.get('/students/filter', function (req, res) {
  res.render('filterStudentForm')
});
router.post('/course/filter', function (req, res) {
  let courses = ongoingCourse;
  let id = req.body.id ? req.body.id : false;
  let name = req.body.name ? req.body.name : false;
  let department = req.body.department ? req.body.department : false;
  let is_open = req.body.checkbox ? true : false;

  if (id){
    courses = (courses.filter(c => c.id === parseInt(id)))
  }
  if (name){
    courses = (courses.filter(c => c.name === name))
  }
  if (department){
    courses = (courses.filter(c => c.department === department))
  }
  if (is_open){
    courses = (courses.filter(c => c.remainingSeats > 0 === is_open))
  }
  res.render('course_filter', {course: courses})
});

router.post('/students/filter', function (req,res){
  let student = students;
  let id = req.body.id ? req.body.id : false;
  let name = req.body.name ? req.body.name : false;
  let department = req.body.department ? req.body.department : false;
  let enroll = req.body.enroll ? req.body.enroll : false;
  let complete = req.body.complete ? req.body.complete : false;

  if (id){
    student = (student.filter(s => s.id === parseInt(id)))
  }
  if (name){
    student = (student.filter(s => s.name === name))
  }
  if (department){
    student = (student.filter(s => s.department === department))
  }
  if (enroll) {
    students = students.filter(s => {
      for (var i = 0; i > s.coursesEnrolled.length; i++){
        if (s.coursesEnrolled[i].name === enroll){
          return true;
        }else{
          return false;
        }
      }
    })
  }
  if (complete) {
    students = students.filter(s => {
      for (var i = 0; i > s.coursesEnrolled.length; i++){
        if (s.coursesCompleted[i].name === complete){
          return true;
        }else{
          return false;
        }
      }
    })
  }
  res.render('student_filter', {
    stu: student
  });

});

router.get('/average/:id', function (req, res, next) {
  let id = students.find(student => student.id === parseInt(req.params.id))
  
  res.render('totalAverage', 
  {
    student: id
    
  })
})
router.get('/course/filter', function (req, res, next){
  res.render('filterCourseForm')
})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Student Database' });
});

module.exports = router;
