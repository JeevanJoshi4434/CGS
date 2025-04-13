import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

export const getHttpsOptions = () => {
  if (process.env.HTTPS !== 'true') return null;

  const keyPath = process.env.SSL_KEY_PATH || './ssl/key.pem';
  const certPath = process.env.SSL_CERT_PATH || './ssl/cert.pem';

  try {
    const options = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
    return options;
  } catch (err:any) {
    console.error('❌ Failed to load SSL certificates:', err.message);
    return null;
  }
};

export const createSecureServer = (app: any) => {
  const options = getHttpsOptions();
  const port = Number(process.env.HTTPS_PORT) || 443;

  if (!options) {
    console.warn('⚠️ HTTPS disabled. Falling back to HTTP.');
    return app.listen(port, () => {
      console.log(`HTTP server running on http://localhost:${port}`);
    });
  }

  return https.createServer(options, app).listen(port, () => {
    console.log(`✅ HTTPS server running at https://localhost:${port}`);
  });
};
