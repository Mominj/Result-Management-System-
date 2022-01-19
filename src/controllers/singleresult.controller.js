const Result = require('../model/result.model');
const Student = require('../model/student.model');

function getGrade(mark) {
   
    if(mark >= 80 && mark <= 100) return 'A+';
    else if(mark >= 70 && mark <= 79) return 'A';
    else if(mark >= 60 && mark <= 69) return 'A-';
    else if(mark >= 50 && mark <= 59) return 'B';
    else if(mark >= 40 && mark <= 49) return 'C';
    else if(mark >= 33 && mark <= 39) return 'D';
   
}
function getGpa(mark) {
        
        if(mark >= 80 && mark <= 100) return 5 ;
        else if(mark >= 70 && mark <=79) return 4;
        else if(mark >= 60 && mark <= 69) return 3.5;
        else if(mark >= 50 && mark <= 59) return 3;
        else if(mark >= 40 && mark <= 49) return 2;
        else if(mark >= 33 && mark <= 39) return 1;
}
module.exports.singleStudentResult = async(req, res) =>{

    try {

        let q = {
            student_id: req.body.student_id
        }
        let user  =  await Student.findOne(q);
        if(!user){
           return res.status(404).json({message :  "Student not found"})
        }

        const data = await Result.find({
            $and: [
                {exam_name: req.body.exam_name},
                {exam_year: req.body.exam_year},
                {student_id: user._id}
            ]
        });
        if(data.length == 0){
            return res.status(404).json({message :  "data not found"})
        }
        let subjects = [];

        data.forEach( (item) => {
          let rowdata = item.toJSON();
          let subject = new Object();
          for(let k in rowdata) {

              if( k != "_id" && k != "student_id" && k != "__v" && k != "exam_year" && k != "exam_name")
              subject[k] = rowdata[k];

          }
         subjects.push(subject);
        });

        let passcheck = new Object();
       
         subjects.forEach( (items) => {
            if( items.hasOwnProperty('creative') && items.hasOwnProperty('mcq') && items.hasOwnProperty('practical')){
                let passed = "fail"
                if(items.status == "pass"){
                    passed = "pass"
                } 
                passcheck[items.subject_name] = {
                    "pass": passed,
                    "parent_sub": items.parent_name,
                    "total_obtain_mark": items.creative + items.mcq + items.practical,
                    "full_mark": items.full_mark,
                    "creative": items.creative,
                    "mcq": items.mcq,
                    "practical": items.practical
                }
                 
            } else if( items.hasOwnProperty('creative') && items.hasOwnProperty('mcq')){ 
            
                let passed = "fail"
                if(items.status == "pass"){
                    passed = "pass"
                } 

                passcheck[items.subject_name] = {
                    "pass": passed,
                    "parent_sub": items.parent_name,
                    "total_obtain_mark": items.creative + items.mcq,
                    "full_mark": items.full_mark,
                    "creative": items.creative,
                    "mcq": items.mcq,
                }
             

            } else if( items.hasOwnProperty('creative')) { 

                let passed = "fail"
                if(items.status == "pass"){
                    passed = "pass"
                }

                passcheck[items.subject_name] = {
                    "pass": passed,
                    "parent_sub": items.parent_name,
                    "total_obtain_mark": items.creative,
                    "full_mark": items.full_mark,
                    "creative": items.creative,
                }
            }else{
                passcheck[items.subject_name] = {
                    "pass": "absent",
                    "parent_sub": items.parent_name,
                    "full_mark": items.full_mark,
                }
            }
        });
    
        console.log(passcheck)
        let arraydata = new Object()

        for(let k in passcheck){

            let sub = passcheck[k].parent_sub;
            let obtain_mark = 0
            let total_full_mark = 0
            let total_mcq_mark = 0
            let total_creative_mark = 0
            let total_practical_mark = 0
            let pass = "pass"

            for(let i in passcheck){

                if(passcheck[i].parent_sub == sub) {

                    obtain_mark = obtain_mark + passcheck[i].total_obtain_mark;
                    total_full_mark = total_full_mark +  passcheck[i].full_mark;
                    total_creative_mark = total_creative_mark + passcheck[i].creative;

                    if(passcheck[i].hasOwnProperty('practical')) { 
                        total_practical_mark = total_practical_mark + passcheck[i].practical
                    }
                    if(passcheck[i].hasOwnProperty('mcq')) { 
                        total_mcq_mark = total_mcq_mark + passcheck[i].mcq
                    }


                    if(passcheck[i].pass == "pass" && pass == "pass") pass = "pass"
                    else pass = "fail"
                }
            }

            arraydata[sub] = {
                "subject": sub,
                "obtain_mark": obtain_mark,
                "full_mark": total_full_mark,
                "total_creative": total_creative_mark,
                "total_mcq": total_mcq_mark,
                "total_practical": total_practical_mark,
                "pass": pass
            };
        }

   let results = []
       for(let k in arraydata){
           let grade;
           let gpa;

           if(arraydata[k].pass ==  "pass"){
                console.log(arraydata[k].subject)

               let  mark = arraydata[k].obtain_mark;

                if(arraydata[k].subject != "ict") {
                    mark = parseInt(mark/2)
                }
                grade = getGrade(mark);
                gpa = getGpa(mark);
                
           } else {
                grade = "F";
                gpa = 0
           }

           let obj = {
               "Subject": k,
               "LG": grade,
               "GPA": gpa,
               "full_mark": arraydata[k].full_mark,
               "obtain_mark":arraydata[k].obtain_mark,
               "total_creative": arraydata[k].total_creative,
               "total_mcq":  arraydata[k].total_mcq,
               "total_practical":arraydata[k].total_practical,

           }
           results.push(obj);
       }
       
       //console.log(results);
       user = user.toJSON();
       res.json({subjects,results,user});

    } catch(err) {
        res.status(404).json({message : err.message || "some error occur"})
    }
}