import knexConnection from '../provider/db';

// Get particular category by its name
const getCategoryByName = async name =>
  knexConnection('category_master').select('*').where({ category_name: name, is_deleted: 0 }).first();

// Post category in to categories table
const postCategoryData = async (name, userId) =>
  knexConnection('category_master').insert({
    user_id: userId,
    category_name: name,
  });

// Fetch all the categories
const fetchAllCategoriesData = async () =>
  knexConnection('category_master')
    .select('category_id As id', 'category_name As name')
    .where({ is_deleted: 0 })
    .orderBy('category_master.category_id', 'desc');

// Get category by ID
const getCategoryById = async id =>
  knexConnection('category_master').select('*').where({ category_id: id, is_deleted: 0 }).first();

// Get particular category by its name
const getGroupByName = async name =>
  knexConnection('group_master').select('*').where({ group_name: name, is_deleted: 0 }).first();

// Post category in to categories table
const postGroupData = async (groupFromData, userId) =>
  knexConnection('group_master').insert({
    user_id: userId,
    category_id: groupFromData.category,
    group_name: groupFromData.name,
  });

// Fetch all the categories
const fetchAllGroupsData = async () =>
  knexConnection('group_master')
    .select('group_id As id', 'group_name As name')
    .where({ is_deleted: 0 })
    .orderBy('group_master.group_id', 'desc');

// Get particular category by its name
const getUnitByName = async name =>
  knexConnection('unit_master').select('*').where({ unit_name: name, is_deleted: 0 }).first();

// Post unit in to units table
const postUnitData = async (unitFormData, userId) =>
  knexConnection('unit_master').insert({
    user_id: userId,
    unit_name: unitFormData.name,
    unit_value: unitFormData.value,
  });

const fetchAllUnitsData = async () =>
  knexConnection('unit_master')
    .select('unit_id As id', 'unit_name As name', 'unit_value As value')
    .where({ is_deleted: 0 })
    .orderBy('unit_master.unit_id', 'desc');

const itemData = {
  getCategoryByName,
  postCategoryData,
  fetchAllCategoriesData,
  getCategoryById,
  getGroupByName,
  postGroupData,
  fetchAllGroupsData,
  getUnitByName,
  postUnitData,
  fetchAllUnitsData,
};

export default itemData;
