const Result = require('../model/result.model');
const Student = require('../model/student.model')
const xlsx = require("xlsx")




module.exports.resultSave = async(req, res) => {

    try {
        let path = './public/uploads/' + req.file.filename;
        const wb = xlsx.readFile(path,{ cellDates:true})
        const ws = wb.Sheets[wb.SheetNames[0]];
        const formData = xlsx.utils.sheet_to_json(ws) 

        let resultsArray = await Promise.all(formData.map( async (item) => {
            let studentid = item.student_id;
            let q = {
                student_id: studentid
            }

            let user  =  await Student.findOne(q);
            
            let result = {
                student_id: user._id,
                exam_year: req.body.exam_year,
                exam_name: req.body.exam_name,
                group: req.body.group,
                subject_name: item.subject_name,
                subject_code: item.subject_code,
                status: item.status,
                parent_name: item.parent_name,
                full_mark: item.full_mark,
                creative: item.creative,
                mcq: item.mcq,
                practical: item.practical,
            
            }
            return result;
        }))

        const docs = await Result.insertMany(resultsArray);
        res.status(200).send({ message :"Data Insert Succesfully"});

    } catch(err) {
            res.status(500).json({ message: err || "Some error occurred "});
    }

}