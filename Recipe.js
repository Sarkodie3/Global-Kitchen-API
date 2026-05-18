const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one ingredient is required",
      },
    },
    instructions: {
      type: String,
      required: [true, "Instructions are required"],
      trim: true,
    },
    cookingTime: {
      type: Number,
      required: [true, "Cooking time is required"],
      min: [1, "Cooking time must be a positive number (in minutes)"],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "Difficulty must be Easy, Medium, or Hard",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: [
          "Breakfast",
          "Lunch",
          "Dinner",
          "Dessert",
          "Snack",
          "Beverage",
          "Other",
        ],
        message:
          "Category must be one of: Breakfast, Lunch, Dinner, Dessert, Snack, Beverage, Other",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt as real Date types automatically
  }
);

// Index on category for heavy lookup performance
recipeSchema.index({ category: 1 });
// Index on title for search performance
recipeSchema.index({ title: 1 });

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
