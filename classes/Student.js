class Student {
    constructor(id, name, department, semester, coursesEnrolled, coursesCompleted) {
      this.id = id;
      this.name = name;
      this.department = department;
      this.semester = semester;
      this.coursesEnrolled = coursesEnrolled;
      this.coursesCompleted = coursesCompleted;
    }
    calculateAverageGrade(){
        let total = 0;
        for(var i = 0; i < this.coursesCompleted.length; i++){
            total += this.coursesCompleted[i].gradeAchieved;
        }
        return Math.round(total / this.coursesCompleted.length);
    }
  }

module.exports = Student;
