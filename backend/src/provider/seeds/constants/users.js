const password = '$2a$12$t9AMhMfbY8KzN9AsSYrB8O7kKwENRDS40W4kKqhwWAgG4Dht5FEJ2';

exports.usersRows = [
  {
    user_id: 1,
    role_id: 1,
    user_name: 'ERP Admin',
    user_email: 'admin@admin.com',
    user_contact_number: '+1234567890',
    user_password: password,
  },
  {
    user_id: 2,
    warehouse_id: 1,
    role_id: 5,
    user_name: 'ERP Test User',
    user_email: 'test@test.com',
    user_contact_number: '+9876543210',
    user_password: password,
  },
  {
    user_id: 3,
    warehouse_id: 2,
    role_id: 6,
    user_name: 'ERP Bonzark Dev',
    user_email: 'bonzark@dev.com',
    user_contact_number: '+4561237890',
    user_password: password,
  },
];
