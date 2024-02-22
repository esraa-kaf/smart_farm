const plants = require("../models/plantsModel");
const imageMw=require("../middleware/imageMw")
const categories = require("../models/CategorgiesModel");
exports.createPlants = async (req, res) => {
  try {
    const { cat_id, name, about, benifits, vits, image } = req.body;

  
    const newPlant = new plants({ cat_id, name, about, benifits, vits });
    await newPlant.save();
    console.log("newPlant   ",newPlant);
// add avatar
if(image){
  
  // call plants avatar model create row 

  const fileName = await imageMw.proccesAvatar(image,'plants');
  console.log("filename   ",fileName)
  newPlant.image = fileName
   newPlant.save();
 
}
    res.status(201).json({ success: true, message: "تم رفع النبات بنجاح" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
///////////////////////////////////////////////////////////////
exports.findTreatementPlants = async (req, res) => {
  try {
    const treatedPlants = await plants.find({ is_treatmented: true })
    res.status(200).json({ success: true, plants: treatedPlants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }

}


// add winter or summer category
exports.createNewCategory = async (req, res) => {
  const { name, avatar } = req.body;
  try {
      const fileName = imageMw.proccesAvatar(avatar, "categories");
      const new_category = new categories({
          name,
          avatar: fileName,
      });
      await new_category.save();  // Use await to ensure the save operation completes before sending the response
      return res.status(200).json({
          status_code: 200,
          data: new_category,
          message: "تم إضافة النوع بنجاح"
      });
  } catch (err) {
      return res.status(500).json({
          status_code: 500,
          data: null,
          message: err.message  // Fix the key here, change "messasge" to "message"
      });
  }
};


// add winter or summer category
// exports.createSubCategory=async(req,res)=>{
//   const {name,avatar,about,benifits,vits}=req.body;
//   try{
//     const fileName=imageMw.proccesAvatar(avatar,"categories")
//     const new_category=new categories({
//       name,
//       avatar:fileName,
//       about,
//       benifits,
//       vits
   
//     })
//     new_category.save()
//     return res.status(200).json({status_code:200,data:new_category,message:"تم إضافة النوع بنجاح"})
//   }catch(err){
//     return res.status(500).json({status_code:500,data:null,messasge:err.message})

//   }
 
// }
// 



exports.findPlantsByCategoryId=async(req,res)=>{
  try {
    const SummerPlant = await plants.find({cat_id:req.params.category_id})
      res.status(200).json({ success: true, plants:SummerPlant });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}



//
exports.findAllCategory = async (req, res) => {
  try {
    const categoryPlants = await categories.find({})
    res.status(200).json({ success: true, plants: categoryPlants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }

}


