const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

// GET /recipes         → Retrieve all recipes (supports ?category= query filter)
// POST /recipes        → Create a new recipe
router.route("/").get(getAllRecipes).post(createRecipe);

// GET /recipes/:id     → Get a single recipe by ID
// PATCH /recipes/:id   → Update specific fields of a recipe
// DELETE /recipes/:id  → Remove a recipe
router.route("/:id").get(getRecipeById).patch(updateRecipe).delete(deleteRecipe);

module.exports = router;
