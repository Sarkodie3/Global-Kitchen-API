const Recipe = require("../models/Recipe");

// Retrieve all recipes, with optional category filter
const getAllRecipes = async (category) => {
  const filter = category ? { category } : {};
  const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
  return recipes;
};

// Retrieve a single recipe by its ID
const getRecipeById = async (id) => {
  const recipe = await Recipe.findById(id);
  return recipe; // Returns null if not found; controller handles the 404
};

// Validate and create a new recipe
const createRecipe = async (recipeData) => {
  const { title, ingredients, instructions, cookingTime, difficulty, category } =
    recipeData;

  // Business logic validation
  if (!title || !ingredients || !instructions || !cookingTime || !difficulty || !category) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  if (typeof cookingTime !== "number" || cookingTime <= 0) {
    const error = new Error("cookingTime must be a positive number (in minutes)");
    error.statusCode = 400;
    throw error;
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    const error = new Error("ingredients must be a non-empty array");
    error.statusCode = 400;
    throw error;
  }

  const newRecipe = await Recipe.create(recipeData);
  return newRecipe;
};

// Update only the provided fields of a recipe (partial update)
const updateRecipe = async (id, updateData) => {
  // If cookingTime is being updated, validate it
  if (updateData.cookingTime !== undefined) {
    if (typeof updateData.cookingTime !== "number" || updateData.cookingTime <= 0) {
      const error = new Error("cookingTime must be a positive number (in minutes)");
      error.statusCode = 400;
      throw error;
    }
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
    new: true,          // Return the updated document
    runValidators: true, // Re-run schema validators on the update
  });

  return updatedRecipe; // Returns null if not found; controller handles the 404
};

// Delete a recipe by ID
const deleteRecipe = async (id) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(id);
  return deletedRecipe; // Returns null if not found; controller handles the 404
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
