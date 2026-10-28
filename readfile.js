const fs = require('fs');
const path = 'app/products/[handle]/page.tsx';
try {
  const content = fs.readFileSync(path, 'utf8');
  console.log(content);
} catch(e) {
  console.error('ERR', e.message);
}
