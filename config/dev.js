module.exports = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000
  },
  Credentials: {
    "ClientID": process.env.client_id,     
    "ClientSeceret": process.env.client_seceret,
    "ClientID2": "344c019c-1fa0-4854-9a23-9cb6f3a7f33d",     
    "ClientSeceret2": "9ae8a1e0-869b-486b-b71d-dd0c54d75aa"
  }
};




