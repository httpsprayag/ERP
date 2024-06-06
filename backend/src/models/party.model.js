import knexConnection from '../provider/db';
import priceFormatter from '../utils/priceFormatter';

// --- Area tag ---
const postAreaTagData = async areaName =>
  knexConnection('area_tags').insert({
    area_name: areaName,
  });

const getAreaByName = async name =>
  knexConnection('area_tags').select('*').where({ area_name: name, is_deleted: 0 }).first();

const getAllAreaTagsData = async () =>
  knexConnection('area_tags')
    .select('area_tag_id AS id', 'area_name As name')
    .where({ is_deleted: 0 })
    .orderBy('area_tag_id', 'desc');

const getAreaTagById = async id =>
  knexConnection('area_tags').select('*').where({ area_tag_id: id, is_deleted: 0 }).first();

// --- collection tag ---
const postCollectionTag = async collectionName =>
  knexConnection('collection_by_tags').insert({
    collection_by_name: collectionName,
  });

const getCollectionByName = async name =>
  knexConnection('collection_by_tags').select('*').where({ collection_by_name: name, is_deleted: 0 }).first();

const getALlCollectionTagData = async () =>
  knexConnection('collection_by_tags')
    .select('collection_by_tag_id AS id', 'collection_by_name AS name')
    .where({ is_deleted: 0 })
    .orderBy('collection_by_tag_id', 'desc');

const getCollectionByTagId = async id =>
  knexConnection('collection_by_tags').select('*').where({ collection_by_tag_id: id, is_deleted: 0 }).first();

// --- Group By Purchase ---
const getPurchaseByName = async name =>
  knexConnection('party_group_by_purchase_tags')
    .select('*')
    .where({ party_group_by_purchase_name: name, is_deleted: 0 })
    .first();

const postPurchaseGroup = async purchaseName =>
  knexConnection('party_group_by_purchase_tags').insert({
    party_group_by_purchase_name: purchaseName,
  });

const getAllPurchaseTagData = async () =>
  knexConnection('party_group_by_purchase_tags')
    .select('party_group_by_purchase_tag_id AS id', 'party_group_by_purchase_name AS name')
    .where({ is_deleted: 0 })
    .orderBy('party_group_by_purchase_tag_id', 'desc');

const getGroupByPurchaseTagById = async id =>
  knexConnection('party_group_by_purchase_tags')
    .select('*')
    .where({ party_group_by_purchase_tag_id: id, is_deleted: 0 })
    .first();

// --- Group By Sale
const getSaleByName = async name =>
  knexConnection('party_group_by_sale_tags')
    .select('*')
    .where({ party_group_by_sale_name: name, is_deleted: 0 })
    .first();

const postSaleGroup = async saleName =>
  knexConnection('party_group_by_sale_tags').insert({
    party_group_by_sale_name: saleName,
  });

const getAllSaleTagData = async () =>
  knexConnection('party_group_by_sale_tags')
    .select('party_group_by_sale_tag_id AS id', 'party_group_by_sale_name AS name')
    .where({ is_deleted: 0 })
    .orderBy('party_group_by_sale_tag_id', 'desc');

const getGroupBySaleTagById = async id =>
  knexConnection('party_group_by_sale_tags')
    .select('*')
    .where({ party_group_by_sale_tag_id: id, is_deleted: 0 })
    .first();

// --- Post party data ---
const postPartyData = async partyFormData =>
  knexConnection('party').insert({
    user_id: partyFormData.userId,
    party_name: partyFormData.name,
    contact_number: partyFormData.contactNumber,
    phone_number: partyFormData.phoneNumber,
    address: partyFormData.address,
    is_sub_party: partyFormData.isSubParty,
    area_tag_id: partyFormData.areaTagId,
    collection_by_tag_id: partyFormData.collectionByTagId,
    party_group_by_sale_tag_id: partyFormData.partyGroupBySaleId,
    party_group_by_purchase_tag_id: partyFormData.partyGroupByPurchaseId,
    credit_limit: priceFormatter(partyFormData.creditLimit),
    party_balance_is_receivable: partyFormData.partyBalanceIsReceivable,
    party_balance_amount: priceFormatter(partyFormData.partyBalanceAmount),
    party_balance_as_on_date: partyFormData.partyBalanceAsOnDate,
    party_status: partyFormData.partyStatus,
  });

// --- Post Sub Party data ---
const postSubPartyData = async subPartyFormData => knexConnection('sub_party').insert(subPartyFormData);

// --- Get Parties List ---
const getAllPartiesData = async () =>
  knexConnection('party')
    .select(
      'party.party_id AS partyId',
      'party.party_name AS partyName',
      'party.party_balance_amount AS partyBalanceAmount',
      'party.address',
      'party.credit_limit AS creditLimit',
      'party.contact_number AS number',
      knexConnection.raw(
        `CASE 
           WHEN COUNT(sub_party.sub_party_id) > 0 
           THEN CONCAT('[', GROUP_CONCAT(JSON_OBJECT(
             'subPartyId', sub_party.sub_party_id, 
             'subPartyBalance', sub_party.sub_party_balance_amount, 
             'subPartyName', sub_party.sub_party_name
           )), ']')
           ELSE '[]' 
         END AS subParties`,
      ),
    )
    .leftJoin('sub_party', 'party.party_id', 'sub_party.party_id')
    .groupBy('party.party_id', 'party.party_name');

const partyData = {
  postAreaTagData,
  getAreaByName,
  getAllAreaTagsData,
  getAreaTagById,
  postCollectionTag,
  getCollectionByName,
  getALlCollectionTagData,
  getCollectionByTagId,
  getPurchaseByName,
  postPurchaseGroup,
  getAllPurchaseTagData,
  getGroupByPurchaseTagById,
  postSaleGroup,
  getSaleByName,
  getAllSaleTagData,
  getGroupBySaleTagById,
  postPartyData,
  postSubPartyData,
  getAllPartiesData,
};

export default partyData;
