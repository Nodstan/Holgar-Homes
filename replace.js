import fs from 'fs';
import path from 'path';

const adminPath = path.join(process.cwd(), 'src/pages/Admin.tsx');
let content = fs.readFileSync(adminPath, 'utf-8');
content = content.replace(/charcoal-900/g, 'rich-black');
content = content.replace(/blue-600/g, 'luxury-gold');
content = content.replace(/blue-700/g, 'luxury-gold-hover');
content = content.replace(/blue-800/g, 'luxury-gold-hover');
content = content.replace(/blue-50/g, 'luxury-gold/10');
content = content.replace(/blue-100/g, 'luxury-gold/20');
content = content.replace(/blue-200/g, 'luxury-gold/30');
fs.writeFileSync(adminPath, content, 'utf-8');
console.log('Admin colors updated.');
