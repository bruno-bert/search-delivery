export default {
  client: process.env.DB_CONNECTION,
  connectionString: process.env.DB_CONNECTION_STRING,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // authSource: process.env.DB_AUTH_SOURCE
      // replicaSet: Env.get('DB_REPLICA_SET', '')
      // ssl: Env.get('DB_SSL, '')
      // connectTimeoutMS: Env.get('DB_CONNECT_TIMEOUT_MS', 15000),
      // socketTimeoutMS: Env.get('DB_SOCKET_TIMEOUT_MS', 180000),
      // w: Env.get('DB_W, 0),
      // readPreference: Env.get('DB_READ_PREFERENCE', 'secondary'),
      // authMechanism: Env.get('DB_AUTH_MECHANISM', ''),
      // other options
    }
  }
};
