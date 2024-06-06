import { StatusCodes } from 'http-status-codes';
import itemData from '../models/item.model';

const createCategoryService = async (name, userId) => {
  // check name is exist or not
  const isNameExist = await itemData.getCategoryByName(name);
  if (isNameExist) {
    return { status: StatusCodes.CONFLICT, success: false, message: 'Opps! category with this name already exist!' };
  }
  // Post category name to the category_master table
  const result = await itemData.postCategoryData(name, userId);
  if (!result) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'Category insertion failed.' };
  }
  return { success: true, message: 'Category Added successfully!' };
};

const fetchAllCategories = async () => {
  // Get all the category from category_master table
  const categoriesQueryResponse = await itemData.fetchAllCategoriesData();
  return { success: true, message: 'Successfully fetch all categories', result: categoriesQueryResponse };
};

const createGroupService = async (groupFormData, userId) => {
  // check category is exist or not
  const isCategoryExist = await itemData.getCategoryById(groupFormData.category);
  if (!isCategoryExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Category does not exists' };

  // check name is exist or not
  const isNameExist = await itemData.getGroupByName(groupFormData.name);
  if (isNameExist) {
    return { status: StatusCodes.CONFLICT, success: false, message: 'Opps! group with this name already exist!' };
  }
  // Post group name to the group_master table
  const result = await itemData.postGroupData(groupFormData, userId);
  if (!result) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'Group insertion failed.' };
  }
  return { success: true, message: 'Group Added successfully!' };
};

const fetchAllGroups = async () => {
  // Get all the group from group_master table
  const groupsQueryResponse = await itemData.fetchAllGroupsData();
  return { success: true, message: 'Successfully fetch all groups', result: groupsQueryResponse };
};

const createUnitService = async (unitFormData, userId) => {
  // check name is exist or not
  const isNameExist = await itemData.getUnitByName(unitFormData.name);
  if (isNameExist) {
    return { status: StatusCodes.CONFLICT, success: false, message: 'Opps! unit with this name already exist!' };
  }
  // Post unit name to the unit_master table
  const result = await itemData.postUnitData(unitFormData, userId);
  if (!result) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'Unit insertion failed.' };
  }
  return { success: true, message: 'Unit Added successfully!' };
};

const fetchAllUnitsService = async () => {
  // Get all the unit from unit_master table
  const unitsQueryResponse = await itemData.fetchAllUnitsData();
  return { success: true, message: 'Successfully fetch all units', result: unitsQueryResponse };
};

const itemServices = {
  createCategoryService,
  fetchAllCategories,
  createGroupService,
  fetchAllGroups,
  createUnitService,
  fetchAllUnitsService,
};

export default itemServices;
