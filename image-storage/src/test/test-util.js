
export function binaryParser(response, cb) {
    const data =  []
    response.on('data', (chunk) => {
        data.push(chunk)
    })
    response.on('end', () => {
        cb(null, Buffer.concat(data))
    })
}