import { open } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const create = async () => {
    let fileHandler;
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const path = `files`
    const fileName = 'fresh.txt'
    const fullPath = join(__dirname,path, fileName)
    const data = 'I am fresh and young'

    try {
        fileHandler = await open(fullPath, 'wx')
        await fileHandler.appendFile(data)
    } catch(err) {
        if (err.code === 'EEXIST') {
            throw new Error('FS operation failed')
        }
        throw err
    } finally {
        if (fileHandler) {
            fileHandler.close()
        }
    }
};

await create();
