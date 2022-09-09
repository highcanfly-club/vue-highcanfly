/*!
=========================================================
* © 2022 Ronan LE MEILLAT for High Can Fly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
*/
// basic logic for minifying fontawesome fonts
// idea is to normally build, next extract all unicode character declaration from built css (after purgecss)
// and pass this to fontmin
// for avoiding to create a plugin, this extract the sha256_8 hash computed by vite for renaming the font files
import { createHash as cryptoCreateHash, type Hash } from 'crypto';
import fs from 'fs/promises'
import { createReadStream } from 'fs';
import { Transform } from 'stream'
import glob from 'glob'
import Fontmin from 'fontmin'

const FONT_REGEX = /\.(eot|ttf|svg|woff|woff2)(\?.+)?$/
const TTF_REGEX = /\.(ttf)(\?.+)?$/
const TEXT_REGEX = /\.(js|css|html)$/
const GLYPH_REGEX = /content\s*:[^};]*?('|")(.*?)\s*('|"|;)/g
const UNICODE_REGEX = /\\([0-9a-f]{2,6})/i
const SHA256_8_REGEX = /(fa-.*-[0-9]{3})\.(.*)\.(eot|ttf|svg|woff|woff2)$/
const FONTMIN_EXTENSIONS = ['eot', 'woff', 'woff2', 'svg']
const BASE_DIR = 'dist/assets'
const FONTAWESOME_SRC_DIR = 'fontawesome/webfonts'
const GLYPH_WHITELIST = ['?']

function computeHash(filename: string): Promise<string> {
    const hash = cryptoCreateHash('sha256');
    const input = createReadStream(filename);
    return new Promise((resolve) => {
        input.on('readable', () => {
            // Only one element is going to be produced by the
            // hash stream.
            const data = input.read();
            if (data)
                hash.update(data);
            else {
                console.log(`${hash.digest('hex')} ${filename}`);
            }
        })
            .on('end', () => { resolve(hash.digest('hex').substring(0, 8)) })
    })

}
function getSurrogatePair(astralCodePoint: number): [number, number] {
    const highSurrogate = Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xD800
    const lowSurrogate = ((astralCodePoint - 0x10000) % 0x400) + 0xDC00
    return [highSurrogate, lowSurrogate]
}

function fixedHex(number: number, length: number): string {
    var str = number.toString(16).toUpperCase();
    while (str.length < length)
        str = "0" + str;
    return str;
}

/* Creates a unicode literal based on the string */
function unicodeLiteral(str: string) {
    var i: number;
    var result = "";
    for (i = 0; i < str.length; ++i) {
        /* You should probably replace this by an isASCII test */
        if (str.charCodeAt(i) > 126 || str.charCodeAt(i) < 32)
            result += "\\u" + fixedHex(str.charCodeAt(i), 4);
        else
            result += str[i];
    }

    return result;
}

function getFileList(baseDir: string, regex: RegExp): Promise<string[]> {
    return new Promise((resolve) => {
        fs.readdir(baseDir).then(files => {
            const fileList = files.map(file => {
                if (file.match(regex))
                    return file
                else
                    return false
            })
            const filteredFileList = fileList.filter(Boolean) as string[]
            resolve(filteredFileList)
        })
    })
}

function getUnicodeGlyphs(baseDir: string, file: string, regex: RegExp): Promise<string[]> {
    return new Promise((resolve) => {
        fs.readFile(`${baseDir}/${file}`, { encoding: 'utf8' }).then(data => {
            const matches = (data.toString()).match(regex) || []
            const glyphList = matches.map(match => {
                const unicodeMatch = match.match(UNICODE_REGEX)
                if (!unicodeMatch) {
                    return false
                }
                const unicodeHex = unicodeMatch[1]
                const numericValue = parseInt(unicodeHex, 16)
                const character = String.fromCharCode(numericValue)
                if (unicodeHex.length === 2 || unicodeHex.length === 4) {
                    return character
                }
                const multiCharacter = getSurrogatePair(numericValue)
                    .map(v => String.fromCharCode(v))
                    .join('')
                return multiCharacter
            }).filter(Boolean) as string[]
            resolve(glyphList)
        })
    })
}


getFileList(BASE_DIR, TEXT_REGEX).then(files => {
    let glyphListStr = ''
    const processes = [] as Promise<string[]>[]
    files.forEach(_file => {
        processes.push(getUnicodeGlyphs(BASE_DIR, _file, GLYPH_REGEX))
    })
    Promise.all(processes).then((glyphs) => {
        const glyphsAndWhiteList = glyphs.concat(GLYPH_WHITELIST).join(' ')
        const fontmin = new Fontmin()
            .use(Fontmin.glyph({
                text: glyphsAndWhiteList,
                hinting: true
            }))
            .src(`${BASE_DIR}/*.ttf`)
            .dest(`${BASE_DIR}/`)
            //.use(Fontmin.ttf2eot())
            .use(Fontmin.ttf2woff({
                deflate: true
            } as any))
            .use(Fontmin.ttf2woff2())
            //.use(Fontmin.ttf2svg())
        fontmin.use(new Transform({
            objectMode: true,
            // allowHalfOpen: false,
            transform(chunk, enc, callback) {
                let srcFile = ''
                let splitPath = []
                if (chunk && chunk.path) {
                    splitPath = chunk.path.match(SHA256_8_REGEX)
                    if (splitPath && splitPath.length >= 3) {
                        srcFile = `${BASE_DIR}/${splitPath[1]}*.${splitPath[3]}`
                        glob(srcFile, function (err, matches) {
                            if (matches.length) {
                                const origSplitted = matches[0].match(SHA256_8_REGEX)
                                chunk.basename = `${origSplitted[1]}.${origSplitted[2]}.${origSplitted[3]}`
                            }
                        })
                    }
                }
                callback(null, chunk)
            }
        }))
        fontmin.run((err: Error, files, stream) => {
            if (err) {
                throw err;
            }
        })
    })

})
