import * as path from 'path';
import { FileGuard } from "../lib";

const filepath = path.join(__dirname, './Hotpot.png');

const ff = {
    fieldname: 'event',
    originalname: '20200924191124_784695event_21006.json',
    encoding: '7bit',
    mimetype: 'application/octet-stream',
    buffer:
        `<Buffer 7b 22 70 61 63 6b 65 74 43 6f 75 6e 74 65 72 22 3a 22 32 31 30 30 36 22 2c 0d 0a 22 63 61 70 74 75 72 65 5f 74 69 6d 65 73 74 61 6d 70 22 3a 22 31 36 ... >`,
    size: 963
}
const result = new FileGuard(ff).type(['epub']).size(1);
console.log(result);
