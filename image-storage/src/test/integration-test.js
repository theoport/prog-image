import http from 'http'
import url from 'url'
import fs from 'fs'
import chai from 'chai'
import {v4 as uuidv4} from 'uuid'

const expect = chai.expect

describe('Integration test', () => {
    it('should upload image', (done) => {

        const options = url.parse('http://localhost:3000/api/v1/images');
        options.method = 'POST'

        const req = http.request(options, (res) => {
            const { statusCode } = res
            const contentType = res.headers['content-type'];

            expect(statusCode).to.equal(200)
            expect(contentType).to.equal('application/json; charset=utf-8')

            let rawData = ''
            res.on('data', (chunk) => {
                rawData += chunk
            });
            res.on('end', () => {
                const parsedData = JSON.parse(rawData);
                expect(parsedData).to.have.property('id')
                done()
            })
        })

        fs.createReadStream('src/test/test-image.png').pipe(req);
    })

    it('should get image in different format', (done) => {
        const uuid = storePngTestImage()
        const expectedJpgImage = fs.readFileSync('src/test/test-image.jpg')

        const options = url.parse(`http://localhost:3000/api/v1/images/${uuid}.jpg`);
        options.method = 'GET'

        http.get(options, (res) => {
            const { statusCode } = res
            const contentType = res.headers['content-type'];

            expect(statusCode).to.equal(200)
            expect(contentType).to.equal('image/jpeg')

            const rawData = [];
            res.on('data', (chunk) => {
                rawData.push(chunk);
            });
            res.on('end', () => {
                const buffer = Buffer.concat(rawData);
                expect(Buffer.compare(buffer, expectedJpgImage)).to.equal(0)
                done()
            })
        })
    })

    function storePngTestImage() {
        const uuid = uuidv4();
        const buffer = fs.readFileSync('src/test/test-image.png')
        fs.writeFileSync(`images/${uuid}`, buffer)
        return uuid
    }
})