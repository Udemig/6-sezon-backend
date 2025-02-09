import { readRecipes, writeRecipes } from "../model/recipeModel.js";

const data = readRecipes();

// 1) bütün yemek tariflerini al
export const getAllRecipes = (req, res) => {
  res.status(200).json({
    message: "Bütün yemek tarifleri alındı",
    results: data.length,
    data,
  });
};

// 2) yeni yemek tarifi ekle
export const createRecipes = (req, res) => {
  res.status(201).json({
    message: "Yemek tarifi oluşturuldu",
  });
};

// 3) bir yemek taifini al
export const getRecipe = (req, res) => {
  res.status(200).json({
    message: "Bir yemek tarifleri alındı",
  });
};

// 4) bir yemek tarifini sil
export const deleteRecipe = (req, res) => {
  res.status(204).json({
    message: "Yemek tarifi silindi",
  });
};

// 5)bir yemek tarifini güncelle
export const updateRecipe = (req, res) => {
  res.status(200).json({
    message: "Yemek tarifi güncellendi",
  });
};
