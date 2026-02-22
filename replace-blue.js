import fs from 'fs';
import path from 'path';

const files = [
  'src/components/Layout.tsx',
  'src/pages/Home.tsx',
  'src/pages/Admin.tsx'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/luxury-gold-hover/g, 'blue-700');
    content = content.replace(/luxury-gold\/10/g, 'blue-50');
    content = content.replace(/luxury-gold\/20/g, 'blue-100');
    content = content.replace(/luxury-gold\/30/g, 'blue-200');
    content = content.replace(/luxury-gold/g, 'blue-600');
    content = content.replace(/rich-black/g, 'slate-900');
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
console.log('Blue theme applied.');
