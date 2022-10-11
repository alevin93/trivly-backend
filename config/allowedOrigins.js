const allowedOrigins = [
    
    'http://127.0.0.1:3001',
    'http://192.168.0.196:3001',
    'http://localhost:3001',
    'http://localhost:*'

]; // This is to whitelist your own website so other cannot hit your backend

module.exports = allowedOrigins;