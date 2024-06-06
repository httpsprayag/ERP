import { StatusCodes } from 'http-status-codes';
import partyData from '../models/party.model';
import userData from '../models/user.model';
import transactionData from '../utils/PartyTransactionDummyData';
import priceFormatter from '../utils/priceFormatter';

// --- Area tag services ---
const addAreaTagService = async areaName => {
  const isNameExist = await partyData.getAreaByName(areaName);

  if (isNameExist) {
    return { status: StatusCodes.CONFLICT, success: false, message: 'Opps! Area tag with this name already exist!' };
  }

  const areaTagQueryResponse = partyData.postAreaTagData(areaName);
  if (!areaTagQueryResponse) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'Area tag insertion failed.' };
  }

  return { success: true, message: 'Area tag added successfully!' };
};

const getAllAreaTagsService = async () => {
  const queryResponse = await partyData.getAllAreaTagsData();
  return { success: true, message: 'Successfully fetch all area tags!', result: queryResponse };
};

// --- collection by tag services ---
const addCollectionTagService = async collectionName => {
  const isNameExist = await partyData.getCollectionByName(collectionName);
  if (isNameExist) {
    return {
      status: StatusCodes.CONFLICT,
      success: false,
      message: 'Opps! Collection tag with this name already exist!',
    };
  }

  const queryResponse = partyData.postCollectionTag(collectionName);
  if (!queryResponse) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'collection by tag insertion failed.' };
  }

  return { success: true, message: 'Collection by tag added successfully!' };
};

const getAllCollectionTagsService = async () => {
  const queryResponse = await partyData.getALlCollectionTagData();
  return { success: true, message: 'Successfully fetch all collection tags!', result: queryResponse };
};

// --- Group By Purchase ---
const addGroupByPurchaseService = async purchaseName => {
  const isNameExist = await partyData.getPurchaseByName(purchaseName);
  if (isNameExist) {
    return {
      status: StatusCodes.CONFLICT,
      success: false,
      message: 'Opps! Purchase tag with this name already exist!',
    };
  }

  const queryResponse = await partyData.postPurchaseGroup(purchaseName);
  if (!queryResponse) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'Purchase tag insertion failed.' };
  }

  return { success: true, message: 'Purchase tag added successfully!' };
};

const getAllPurchaseTags = async () => {
  const queryResponse = await partyData.getAllPurchaseTagData();
  return { success: true, message: 'Successfully fetch all group by purchase tags!', result: queryResponse };
};

// --- Group By Sale ---
const addGroupBySaleService = async saleName => {
  const isNameExist = await partyData.getSaleByName(saleName);
  if (isNameExist) {
    return {
      status: StatusCodes.CONFLICT,
      success: false,
      message: 'Opps! Sale tag with this name already exist!',
    };
  }

  const queryResponse = await partyData.postSaleGroup(saleName);
  if (!queryResponse) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'Sale tag insertion failed.' };
  }

  return { success: true, message: 'Sale tag added successfully!' };
};

const getAllSaleTags = async () => {
  const queryResponse = await partyData.getAllSaleTagData();
  return { success: true, message: 'Successfully fetch all group by sale tags!', result: queryResponse };
};

// --- Add Party data ---
const addPartyService = async partyFormData => {
  // check user is exist or not
  const isUserExist = await userData.getUserById(partyFormData.userId);
  if (!isUserExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'User does not exists' };

  // check Area tag is exist or not
  const isAreaTagExist = await partyData.getAreaTagById(partyFormData.areaTagId);
  if (!isAreaTagExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Area tag does not exists' };

  // check collection by tag is exist or not
  const isCollectionByTagExist = await partyData.getCollectionByTagId(partyFormData.collectionByTagId);
  if (!isCollectionByTagExist) {
    return { status: StatusCodes.NOT_FOUND, success: false, message: 'Collection by tag does not exists' };
  }

  // check Group by purchase tag is exist or not
  const isGroupBySaleTagExist = await partyData.getGroupBySaleTagById(partyFormData.partyGroupBySaleId);
  if (!isGroupBySaleTagExist) {
    return { status: StatusCodes.NOT_FOUND, success: false, message: 'Party group by sale tag does not exists' };
  }

  // check Group by purchase tag is exist or not
  const isGroupByPurchaseTagExist = await partyData.getGroupByPurchaseTagById(partyFormData.partyGroupByPurchaseId);
  if (!isGroupByPurchaseTagExist) {
    return { status: StatusCodes.NOT_FOUND, success: false, message: 'Party group by purchase tag does not exists' };
  }

  // Post Party data to the party table
  const addPartyQueryResponse = await partyData.postPartyData(partyFormData);
  if (!addPartyQueryResponse) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'Party insertion failed.' };
  }

  // Get party id by its name
  const [partyIdD] = addPartyQueryResponse;

  if (partyFormData.isSubParty && partyFormData.subParty.length > 0) {
    const subPartyDataWithPartId = partyFormData.subParty.map(item => ({
      party_id: partyIdD,
      sub_party_name: item.subPartyName,
      sub_party_balance_is_receivable: item.subPartyBalanceIsReceivable,
      sub_party_balance_amount: priceFormatter(item.subPartyBalanceAmount),
      sub_party_party_balance_as_on_date: item.subPartyBalanceAsOnDate,
      sub_party_status: item.subPartyStatus,
    }));

    const addSubPartyQueryResponse = await partyData.postSubPartyData(subPartyDataWithPartId);
    if (!addSubPartyQueryResponse) {
      return { status: StatusCodes.BAD_REQUEST, success: false, message: 'Sub Party insertion failed.' };
    }
  }

  return { success: true, message: 'Party added successfully!' };
};

// --- Get all parties ---
const getAllPartiesService = async () => {
  const getPartiesQueryResponse = await partyData.getAllPartiesData();
  const partiesData = getPartiesQueryResponse.map(row => ({
    ...row,
    subParties: JSON.parse(row.subParties),
  }));
  return { success: true, message: 'Successfully fetch all parties', result: partiesData };
};

// --- Get party transaction data by party_id ---
const getPartyTransactionService = async id => {
  const dummyData = transactionData;
  return { success: true, message: 'Successfully Fetch party transaction data', result: dummyData };
};

const partyServices = {
  addAreaTagService,
  getAllAreaTagsService,
  addCollectionTagService,
  getAllCollectionTagsService,
  addGroupByPurchaseService,
  getAllPurchaseTags,
  addGroupBySaleService,
  getAllSaleTags,
  addPartyService,
  getAllPartiesService,
  getPartyTransactionService,
};

export default partyServices;
