import express from "express";
import {
  createRecipes,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from "../controllers/recipeControllers.js";

//Router > server.js dosyasında route tanımı yapmamızı sağlıyor

const router = express.Router();

//oluşturduğumuz rıuterın endpoint/route/ yollarını ve istek gelince çalışacak fonksiyonları belirle

router.route("/api/v1/recipes").get(getAllRecipes).post(createRecipes);

router
  .route("/api/v1/recipes/:id")
  .get(getRecipe)
  .patch(updateRecipe)
  .delete(deleteRecipe);

//serverda kullanamk için routerı export et
export default router;
