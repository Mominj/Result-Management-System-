const {Schema , model} = require('mongoose');     


const resultSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
	exam_year: {
		type: String,
		required: true
	},
    exam_name: {
        type: String,
		required: true
    },
    group: {
        type: String,
		required: true
    },
    subject_name: {
        type: String,
        required: true,
    },
    subject_code: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        required: true
    },
    parent_name: {
        type: String,
        required: true
    },
    full_mark: {
        type: Number,
        required: true
    },
    creative: {
        type: Number,
    },
    mcq: {
        type: Number
    },
    practical: {
        type: Number
    }
	
});

const Result = model("Result", resultSchema);
module.exports = Result