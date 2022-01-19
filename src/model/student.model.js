const {Schema, model } = require('mongoose');

const studentSchema = new Schema({
    student_id: {
        type: String,
		required: true,
        unique: true
    },
    student_roll: {
        type: Number,
		required: true
    },
    name: {
        type: String,
		required: true
    },
    class: {
        type: String,
		required: true
    },
    father_name: {
        type: String,
        required: true
    },
    mother_name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    session:{
        type: String,
        required: true
    },
    four_subject: {
        type: String,
        required: true
    }
});

const Student = model("Student", studentSchema);
module.exports = Student;
