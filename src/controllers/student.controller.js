const xlsx = require("xlsx")

//model
const Student = require('../model/student.model')

module.exports.studentdataSave = async(req,res) => {
    try{
        let path = './public/uploads/' + req.file.filename;
        const wb = xlsx.readFile(path,{ cellDates:true})
        const ws = wb.Sheets[wb.SheetNames[0]];
        const formData = xlsx.utils.sheet_to_json(ws) 
        let results = []

        if (formData.length != 0) {
            formData.forEach( (rowData) => {
                let result = {
                    student_id: rowData.student_id,
                    student_roll: rowData.student_roll,
                    name: rowData.name,
                    class: rowData.class,
                    father_name: rowData.father_name,
                    mother_name: rowData.mother_name,
                    group: rowData.group,
                    session: rowData.session,
                    four_subject: rowData.four_subject
                }
                results.push(result)
            });

            const docs = await Student.insertMany(results);
            res.status(200).send({ message :"Data Insert Succesfully"});
            
        } else {
            res.status(500).json({ message: "file is empty"}); 
        } 

    } catch(err) {
        res.status(500).json({ message: err.message || "Some error occurred "});
    }
 
}




module.exports.studentdataSaveInput = async(req, res) =>{
    try {
        let result = {
            student_id:   req.body.student_id,
            student_roll: req.body.student_roll,
            name:         req.body.name,
            class:        req.body.class,
            father_name:  req.body.father_name,
            mother_name:  req.body.mother_name,
            group:        req.body.group,
            session:      req.body.session,
            four_subject: req.body.four_subject
        }

        const rowData = await Student.find({
            $and: [
                {session: req.body.session},
                {group: req.body.group},
                {student_id: req.body.student_id}
           ]
          });

        if(rowData.length == 0) {
            const docs = await Student.insertMany(result);
            res.status(200).send({ message :"Data Insert Succesfully"});
        } else {
            const isDeleteData = await Student.deleteMany({
                $and: [
                    {session: req.body.session},
                    {group: req.body.group},
                    {student_id: req.body.student_id}
                ]
              });

              if(isDeleteData) {
                const docs = await Student.insertMany(result);
                res.status(200).send({ message :"Data Insert Succesfully"});  
              }
        }

    } catch(err) {
        res.status(500).json({ message: err.message || "Some error occurred "});
    }
}



   
