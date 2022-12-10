const allowedOrigins = [
    
    'http://127.0.0.1:4000',
    'http://192.168.0.196:4000',
    'http://localhost:4000',
    'http://localhost:*',
    'http://192.168.0.196*'

]; // This is to whitelist your own website so other cannot hit your backend

module.exports = allowedOrigins;