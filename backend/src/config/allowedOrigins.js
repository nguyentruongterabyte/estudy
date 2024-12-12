require('dotenv').config();

const reactUrl = process.env.URL_REACT;

const allowedOrigins = [
  reactUrl,
  `${reactUrl}:3000`,
  `${reactUrl}:3001`,
  'http://localhost',
  'http://localhost:3000',
  'http://localhost:3001',
];

export default allowedOrigins;
