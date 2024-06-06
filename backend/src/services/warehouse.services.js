import warehouseData from '../models/warehouse.model';
import currentKnexDate from '../utils/CurrentDateFormatter';

const createWarehouseService = async (warehouseName, warehouseAddress) => {
  await warehouseData.postWarehouseData(warehouseName, warehouseAddress);
  return { success: true, message: 'Warehouse Added SuccessFully!' };
};

const getWarehouseListService = async () => {
  const result = await warehouseData.getWarehouseListData();
  return { success: true, message: 'Fetch warehouse list successfully!', result };
};
const updateWarehouseService = async (id, warehouseName, warehouseAddress) => {
  const result = await warehouseData.updateWarehouseById(id, warehouseName, warehouseAddress);
  if (result === 0) return { success: false, message: 'Opps, Warehouse not found!' };
  return { success: true, message: 'Warehouse updated successfully!' };
};

const deleteWarehouseService = async id => {
  const deletedAt = currentKnexDate();
  const result = await warehouseData.deleteWarehouseData(id, deletedAt);
  if (result === 0) return { success: false, message: 'Opps, Warehouse not found!' };
  return { success: true, message: 'Warehouse deleted Successfully!' };
};
const warehouseServices = {
  createWarehouseService,
  getWarehouseListService,
  updateWarehouseService,
  deleteWarehouseService,
};

export default warehouseServices;
