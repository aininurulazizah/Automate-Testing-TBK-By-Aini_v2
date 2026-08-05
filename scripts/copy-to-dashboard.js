const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '../reports/dashboard-data.json');
const destination = path.resolve(
  __dirname,
  '../../dabang-automate test-v1.0.0/public/reports/dashboard-data.json'
);

try {
  if (!fs.existsSync(source)) {
    throw new Error(`Source file tidak ditemukan: ${source}`);
  }

  fs.copyFileSync(source, destination);

  console.log('✅ dashboard-data.json berhasil dicopy ke dashboard/public');
} catch (err) {
  console.error('❌ Gagal copy dashboard-data.json');
  console.error(err.message);
  process.exit(1);
}