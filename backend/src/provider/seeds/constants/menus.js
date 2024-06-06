exports.menusRows = [
  { menu_id: 1, menu_name: 'HOME' },
  { menu_id: 2, menu_name: 'PARTIES' },
  { menu_id: 3, menu_name: 'ITEMS' },

  { menu_id: 4, menu_name: 'PURCHASE' },
  { menu_id: 5, menu_name: 'PURCHASE ORDER', parent_menu_id: 4 },
  { menu_id: 6, menu_name: 'PURCHASE BILL', parent_menu_id: 4 },
  { menu_id: 7, menu_name: 'PURCHASE RETURN or DEBIT NOTE', parent_menu_id: 4 },

  { menu_id: 8, menu_name: 'SALE' },
  { menu_id: 9, menu_name: 'SALE ORDER', parent_menu_id: 8 },
  { menu_id: 10, menu_name: 'SALE BILL', parent_menu_id: 8 },
  { menu_id: 11, menu_name: 'SALE RETURN or CREDIT NOTE', parent_menu_id: 8 },

  { menu_id: 12, menu_name: 'PAYMENT' },
  { menu_id: 13, menu_name: 'PAYMENT IN', parent_menu_id: 12 },
  { menu_id: 14, menu_name: 'PAYMENT OUT', parent_menu_id: 12 },

  { menu_id: 15, menu_name: 'REPORTS' },

  { menu_id: 16, menu_name: 'CASH & BANK' },
  { menu_id: 17, menu_name: 'CASH IN HAND', parent_menu_id: 16 },
  { menu_id: 18, menu_name: 'BANK ACCOUNTS', parent_menu_id: 16 },
  { menu_id: 19, menu_name: 'P2P TRANSFER', parent_menu_id: 16 },

  { menu_id: 20, menu_name: 'PRICE LIST' },

  { menu_id: 21, menu_name: 'TASK TODO LIST' },

  { menu_id: 22, menu_name: 'B2B TRANSACTION' },
  { menu_id: 23, menu_name: 'GOODS TRANSFER', parent_menu_id: 22 },
  { menu_id: 24, menu_name: 'FUND TRANSFER', parent_menu_id: 22 },

  { menu_id: 25, menu_name: 'EXPENSES' },

  { menu_id: 26, menu_name: 'OTHER INCOME' },

  { menu_id: 27, menu_name: 'CEMENT BOOK' },
  { menu_id: 28, menu_name: 'PURCHASE ORDER', parent_menu_id: 27 },
  { menu_id: 29, menu_name: 'ORDER DISPATCHED', parent_menu_id: 27 },
  { menu_id: 30, menu_name: 'PARTY CONFIRMATION', parent_menu_id: 27 },
  { menu_id: 31, menu_name: 'COMPLETE BILL', parent_menu_id: 27 },
  { menu_id: 32, menu_name: 'CEMENT BOOK BANK ACCOUNT', parent_menu_id: 27 },

  { menu_id: 33, menu_name: 'ASSETS DIRECTORY' },

  { menu_id: 34, menu_name: 'UTILITY' },
  { menu_id: 35, menu_name: 'USER SETUP', parent_menu_id: 34 },
  { menu_id: 36, menu_name: 'SETUP', parent_menu_id: 34 },
  { menu_id: 37, menu_name: 'RECYCLE BIN', parent_menu_id: 34 },
  { menu_id: 38, menu_name: 'USER LOG', parent_menu_id: 34 },
  { menu_id: 39, menu_name: 'IMPORT', parent_menu_id: 34 },
  { menu_id: 40, menu_name: 'EXPORT', parent_menu_id: 34 },
  { menu_id: 41, menu_name: 'BACKUP DATA TO DRIVE', parent_menu_id: 34 },

  { menu_id: 42, menu_name: 'GENERAL SETTINGS' },
  { menu_id: 43, menu_name: 'WAREHOUSES', parent_menu_id: 42 },
  { menu_id: 44, menu_name: 'ROLES & PERMISSIONS', parent_menu_id: 42 },
  { menu_id: 45, menu_name: 'USERS', parent_menu_id: 42 },
];
