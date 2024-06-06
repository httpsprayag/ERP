import knexConnection from '../provider/db';

const postWarehouseData = async (warehouseName, warehouseAddress) => {
  await knexConnection('warehouses').insert({ warehouse_name: warehouseName, warehouse_address: warehouseAddress });
};

const getWarehouseById = id =>
  knexConnection('warehouses').select('*').where({ warehouse_id: id, is_deleted: 0 }).first();

const getWarehouseListData = () =>
  knexConnection('warehouses')
    .select('warehouse_id AS id', 'warehouse_name AS name', 'warehouse_address AS address')
    .where('is_deleted', 0)
    .orderBy('warehouse_id', 'desc');

const updateWarehouseById = (id, warehouseName, warehouseAddress) =>
  knexConnection('warehouses')
    .update({ warehouse_name: warehouseName, warehouse_address: warehouseAddress })
    .where({ warehouse_id: id, is_deleted: 0 });

const deleteWarehouseData = (id, deletedAt) =>
  knexConnection('warehouses')
    .update({ is_deleted: true, deleted_at: deletedAt })
    .where({ warehouse_id: id, is_deleted: 0 });

const warehouseData = {
  postWarehouseData,
  getWarehouseListData,
  updateWarehouseById,
  deleteWarehouseData,
  getWarehouseById,
};

export default warehouseData;
