import { readdirSync } from "fs";
import { Apple } from "../utils/Apple";
import path from "path";

const handleEvets = async (client: Apple) => {
    const handlersDir = path.join(__dirname, '../events');
    const dirs = readdirSync(handlersDir);
    for (const dir of dirs) {
        const files = readdirSync(path.join(handlersDir, dir)).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
        await Promise.all(files.map(async (file) => {
            const filePath = path.join(handlersDir, dir, file);
            try {
                await (await import(filePath)).default(client);
                console.log('Event: '.gray + `${dir}/${file}`.green);
            } catch (error) {
                    console.log('Event Error: '.red + `${dir}/${file}`.green.dim);
                    // console.error(`Error importing file: ${file}`, error);
            }
        }));
    }
};

export default handleEvets