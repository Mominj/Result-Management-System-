const Result = require('../model/resultupload.model');

module.exports.dataUploads = async(req , res)=>{
    try{
        
        const science = ["roll", "name","four_subject", "bangla", "english", "ict", "physics" , "chemistry" , "biology", "higher_mathematics", "statistics", "agriculture_education"];
        const arts = ["roll", "name","four_subject", "bangla", "english", "ict", "economics" , "sociology" , "logic", "statistics","history","home_economics", "civics", "islamic_history_and_culture"];
        const commerce = [ "roll", "name","four_subject", "bangla", "english", "ict", "accounting" , "finance_banking_and_insurance" , "statistics", "economics" ];
        const group = req.body.group;

        if( group == "science") {
            res.status(200).json(science)
        } else if (group == "arts") {
            res.status(200).json(arts)
        } else if ( group == "commerce") {
            res.status(200).json(commerce)
        }

    } catch(err) {
        res.status(500).json({message : err.message || "some error occur"})
    }
} 


module.exports.dataUploadsSave = async(req, res) => {

    try{
        let results = []
        let data = req.body.data;
        for(var i = 0; i < data.length; i++){
            var result = {
                year: data[i].year,
                examtype: data[i].examtype,
                group: data[i].group,
                roll_number: data[i].roll_number,
                name: data[i].name,
                four_subject: data[i].four_subject,
                bangla: data[i].bangla,
                english: data[i].english,
                higher_mathematics: data[i].higher_mathematics,
                ict: data[i].ict,
                physics: data[i].physics,
                chemistry: data[i].chemistry,
                biology: data[i].biology,
                agriculture_education: data[i].agriculture_education,
                geography: data[i].geography,
                psychology: data[i].psychology,
                statistics: data[i].statistics,
                accounting: data[i].accounting,
                economics: data[i].economics,
                business_organization_and_management: data[i].business_organization_and_management,
                finance_banking_and_insurance: data[i].finance_banking_and_insurance,
                home_economics: data[i].home_economics,
                economics: data[i].economics,
                history: data[i].history,
                islamic_history_and_culture: data[i].islamic_history_and_culture,
                sociology: data[i].sociology,
                logic: data[i].logic,
                civics: data[i].civics
            }
            results.push(result)       
        }
        const docs = await Result.insertMany(results);
        res.status(200).send({ message :"Data Insert Succesfully"});
    } catch(err) {
        res.status(500).send({ message :   err.message || "some error occur" });
    }
    
}


