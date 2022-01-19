const Result = require('../model/result.model');


function getGpa(mark) {
    if(mark >= 80 && mark <= 100) return 5 ;
    else if(mark >= 70 && mark <=79) return 4;
    else if(mark >= 60 && mark <= 69) return 3.5;
    else if(mark >= 50 && mark <= 59) return 3;
    else if(mark >= 40 && mark <= 49) return 2;
    else if(mark >= 33 && mark <= 39) return 1;
}



module.exports.allpassStatistics = async(req, res) => {


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

        
        let result = []

        for(let i=0; i<ll.length; i++){

            let formdata = await Result.find({ student_id: ll[i] }).populate("student_id");

            let passcheck = new Object();
           
            formdata.forEach( (items) =>{
                let mark1 = items.creative
                let mark2 = items.mcq || 0
                let mark3 = items.practical || 0
    
             
                passcheck[items.subject_name] = {
                            "pass": items.status,
                            "parent_sub": items.parent_name,
                            "mark": mark1 + mark2 + mark3,
                            "four_sub": items.student_id.four_subject,
                            "roll": items.student_id.student_roll
                        }
    
            });

            let arraydata = []

            for(let k in passcheck){
    
                let sub = passcheck[k].parent_sub;
                let obtain_mark = 0
                let pass = "pass"
                let roll
                let four_sub

    
                for(let i in passcheck){
    
                    if(passcheck[i].parent_sub == sub) {
                        obtain_mark = obtain_mark + passcheck[i].mark || 0;
                        four_sub = passcheck[i].four_sub
                        roll =  passcheck[i].roll
                        if(passcheck[i].pass == "pass" && pass == "pass") pass = "pass"
                        else pass = "fail"

                    }
                }
    
                arraydata[sub] = {
                    "subject": sub,
                    "obtain_mark": obtain_mark,
                    "pass": pass,
                    "four_sub": four_sub,
                    "roll": roll
                };
            }

            let sum = 0;
          
            for(let i in arraydata) {

               if(arraydata[i].pass == "pass"){
               
                   if(arraydata[i] == arraydata[i].four_sub){

                        let mark = parseInt(arraydata[i].obtain_mark /2)
                        console.log(mark)

                        if(mark >= 49) sum = sum + getGpa(mark);
                        else sum = sum + 0;

                   } else if(arraydata[i].sub == "ict") {
    
                       let  mark = parseInt(arraydata[i].obtain_mark);

                       if(mark >= 32 && mark <= 100) { sum = sum + getGpa(mark) }
                       else { sum = sum + 0}
                        
                   } else{

                    let  mark = parseInt(arraydata[i].obtain_mark / 2);

                    if(mark >= 32 && mark <= 100) { sum = sum + getGpa(mark) }
                    else { sum = sum + 0}

                   }

               } else {
                   sum = 0; break;
               }
            }
            let num = sum/6;

            let objj = {
                "roll": arraydata["bangla"].roll || arraydata["ict"].roll || arraydata["Bangla"].roll,
                "gpa" :  num.toFixed(2)
            }
            
            if(objj.gpa > 0){
                result.push(objj);
            }
            

        }

        res.status(200).json({result: result})

      
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    
    
  
}