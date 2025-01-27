const mongoose = require('mongoose');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

// add
async function addCategory(category) {
  const newCategory = await Category.create(category);

  return newCategory;
}

// edit
async function editCategory(user, id, categoryData) {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error('Category not found');
  }

  if (user !== category.user.toString()) {
    throw new Error('Category access error');
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
    returnDocument: 'after',
  });

  return updatedCategory;
}

// delete
async function deleteCategory(user, id) {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error('Category not found');
  }

  if (user !== category.user.toString()) {
    throw new Error('Category access error');
  }

  await Transaction.deleteMany({ category: id });

  return Category.deleteOne({ _id: id });
}

// get list with search and pagination
async function getCategories(user) {
  const userObjectId = new mongoose.Types.ObjectId(user);

  const categories = await Category.find({ user: { $in: userObjectId } });

  return categories;
}

// get item
async function getCategory(user, id) {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error('Category not found');
  }

  if (user !== category.user.toString()) {
    throw new Error('Category access error');
  }

  return category;
}

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
  getCategory,
};
