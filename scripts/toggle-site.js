const fs = require('fs');
const path = require('path');

const action = process.argv[2];
const tags = process.argv.slice(3);

if (!['enable', 'disable'].includes(action)) {
    console.error('Action harus "enable" atau "disable".');
    process.exit(1);
}

if (tags.length === 0) {
    console.error(
        'Masukkan minimal satu tag mitra.\n' +
        'Contoh: npm run site -- disable "@ans" "@aragon"'
    );
    process.exit(1);
}

const enabledValue = action === 'enable';

const sitesPath = path.join(__dirname, '../utils/sites.js');

let content = fs.readFileSync(sitesPath, 'utf8');

for (const tag of tags) {
    const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const tagRegex = new RegExp(
        `(tag:\\s*['"]${escapedTag}['"][\\s\\S]*?enabled:\\s*)(true|false)`
    );

    if (!tagRegex.test(content)) {
        console.error(`❌ Mitra ${tag} tidak ditemukan.`);
        continue;
    }

    content = content.replace(
        tagRegex,
        `$1${enabledValue}`
    );

    console.log(`✅ ${tag} berhasil di-${action}: enabled = ${enabledValue}`);
}

fs.writeFileSync(sitesPath, content);