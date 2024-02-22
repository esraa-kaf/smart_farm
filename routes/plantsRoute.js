const express=require('express')
const router= express.Router()
const PlantsController=require('../controller/PlantsController')

router.post('/create-plant',PlantsController.createPlants)

/// get all treatement plants
router.get('/treatement_plants',PlantsController.findTreatementPlants)

// get SummerPlants
router.get('/Plants/:category_id',PlantsController.findPlantsByCategoryId)

router.post("/new-category",PlantsController.createNewCategory)


router.get("/all-category",PlantsController.findAllCategory)





module.exports=router