const Result = require('../model/result.model');
const Student = require('../model/student.model')

module.exports.resultStatistics = async(req, res) =>{


    try {

        let numofstudents = await Student.find({group: req.body.group}) 
        let ll = await Result.find({group: req.body.group}).distinct("student_id") ;


        let total_st =  numofstudents.length
        let attend_st = ll.length;
        let total_pass = 0;

        let data = await Result.find({
            $and: [
                {exam_year: req.body.exam_year},
                {group: req.body.group}
            ]
        });

        for(let i=0; i<ll.length; i++){

            let f = 1;
            data.forEach( (item) => {

                let d = item.toJSON();
                if(String(d.student_id) == String(ll[i]) && d.status == "fail") {f = 0;}

            });

            if(f == 1) total_pass++;

        }

        if(data.length == 0){
            return res.status(404).json({message :  "data not found"})
        }

        let formdata = data;
        let resultstat = {}

        formdata.forEach( (rowdata) => {

            let count = 0;
            let pass = 0;
            let pluss = 0;
            let sub = rowdata.subject_name;
            let absent = 0;

            data.forEach( (item) => {

                if(item.subject_name == sub) {
                    count ++;

                    if(item.status == "pass") {

                        pass++;
                        let num = 0
                        num = num + item.creative;
                        if(item.hasOwnProperty('mcq')) num = num + item.mcq;
                        if(item.hasOwnProperty('practical')) num = num + item.practical;
                        if(num >= 80) pluss ++;
                
                    } else if(item.status == "absent") {
                        absent++;
                    }

                }
            });

            resultstat[sub] =  {
                "total student": count,
                "pass": pass,
                "fail": (count - (pass+absent)),
                "plus": pluss,
                "%_pass": parseInt((pass*100)/count)
            }

        })

        let obj = {
            "numofstudent": total_st,
            "attend_student": attend_st,
            "passallsubject": total_pass,
            "numberoffail": attend_st- total_pass,
            "pass_rate": parseInt((total_pass*100)/attend_st)
        }

        res.status(200).json({resultstat, obj})
            
    } catch (error) {
       res.status(404).json({message :  error.message || "data not found"})
    }


    
}