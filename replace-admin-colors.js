import fs from 'fs';
import path from 'path';

const adminPath = path.join(process.cwd(), 'src/pages/Admin.tsx');
if (fs.existsSync(adminPath)) {
  let content = fs.readFileSync(adminPath, 'utf-8');
  content = content.replace(/bg-blue-600/g, 'bg-[#C5A059]');
  content = content.replace(/text-blue-600/g, 'text-[#C5A059]');
  content = content.replace(/border-blue-600/g, 'border-[#C5A059]');
  content = content.replace(/ring-blue-600/g, 'ring-[#C5A059]');
  content = content.replace(/peer-checked:bg-blue-600/g, 'peer-checked:bg-[#C5A059]');
  
  content = content.replace(/bg-blue-700/g, 'bg-[#b38f4a]');
  content = content.replace(/text-blue-700/g, 'text-[#b38f4a]');
  content = content.replace(/hover:bg-blue-700/g, 'hover:bg-[#b38f4a]');
  content = content.replace(/hover:text-blue-700/g, 'hover:text-[#b38f4a]');
  
  content = content.replace(/bg-blue-50/g, 'bg-[#C5A059]/10');
  content = content.replace(/bg-blue-100/g, 'bg-[#C5A059]/20');
  content = content.replace(/border-blue-200/g, 'border-[#C5A059]/30');
  
  fs.writeFileSync(adminPath, content, 'utf-8');
  console.log('Admin colors updated to Gold.');
}
