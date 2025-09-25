import request from 'supertest';
import app from '.././src/app';
import connection from '../src/db/connection'
import buildb from '../src/db/build';


beforeAll(buildb);
afterAll(() => connection.close())

