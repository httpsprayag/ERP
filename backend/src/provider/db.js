import knex from 'knex';
import knexfile from '../../knexfile';

const knexConnection = knex(knexfile.development);

export default knexConnection;
