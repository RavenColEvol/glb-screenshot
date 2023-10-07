import { takeScreenshot } from ".";
import fs from 'fs';
import path from 'path'

try {
  const res = await takeScreenshot(path.join(__dirname, 'assets', 'op.glb'));
  if (res) {
    await fs.writeFileSync('./output/op.png', res);
  }
} catch(err) {
  console.error('err', err);
}
// takeScreenshot()