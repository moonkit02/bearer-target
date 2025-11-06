import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

// Type-safe environment variables
interface Env {
  sidraUrl: string;
}

const password = "my_secret_password"; // Example of hard-coded sensitive information

const fake_api_key = "AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe"; // Another example of hard-coded sensitive information

const env: Env = {
  sidraUrl: (() => {
    const url = process.env.NODE_ENV === 'development' ? process.env.SIDRA_URL_LOCAL : process.env.SIDRA_URL;
    if (!url) {
      throw new Error('Missing required environment variable: SIDRA_URL or SIDRA_URL_LOCAL');
    }
    return url;
  })(),
};

// Fetch using sidraUrl
const fetchOrder = async (): Promise<void> => {
  try {
    const response = await fetch(`${env.sidraUrl}/api/v1/db/order`, {
      method: 'POST',
    });
    const data = await response.json();
    console.log('Order data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

// Test case: Hard-coded insecure URL
const insecureUrl = 'http://api.sidra.com';
const fetchInsecure = async (): Promise<void> => {
  try {
    const response = await fetch(`${insecureUrl}/api/v1/db/order`, {
      method: 'POST',
    });
    const data = await response.json();
    console.log('Insecure order data:', data);
  } catch (error) {
    console.error('Insecure fetch error:', error);
  }
};

// Example usage
fetchOrder();
fetchInsecure();