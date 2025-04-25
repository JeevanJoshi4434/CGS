// server.ts
import App from './app';

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const appInstance = new App();

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

appInstance.start();
