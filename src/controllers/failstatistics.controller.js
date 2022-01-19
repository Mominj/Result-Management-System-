const Result = require('../model/result.model');
const Student = require('../model/student.model')

module.exports.failStatistics = async(req, res) => {


    try {
        const data = await Result.find({
            $and: [
                {exam_name: req.body.exam_name},
                {exam_year: req.body.exam_year},
                {group: req.body.group}
            ]
        });
        if(data.length == 0){
            return res.status(404).json({message :  "data not found"})
        }
        let ll = await Result.find({$and: [
            {exam_name: req.body.exam_name},
            {exam_year: req.body.exam_year},
            {group: req.body.group}
        ]}).distinct("student_id");
        
        let allfaill = []
    
        for(let i=0; i<ll.length; i++){

            let flag = 1;
            let d = await Result.findOne({student_id: ll[i]}).populate("student_id");
       
            let sub = []
    
            sub.push(d.student_id.student_id)
            sub.push(d.student_id.name)
    
            let rowdata = await Result.find({student_id: ll[i]});
        
            rowdata.forEach( (item) =>{
    
                if(item.status == "fail" || item.status == "absent") {
                    sub.push(item.subject_name) 
                    flag = 0;
                }
    
            })
    
            if(flag == 0) allfaill.push(sub)
    
        }
    
        res.status(200).json(allfaill)
    } catch (error) {

        res.status(500).json({message : error.message})
    }
    
    
  
}