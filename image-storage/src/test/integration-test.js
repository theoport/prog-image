import request from 'supertest'
import app from '../app.js'
import fs from 'fs'
import chai from 'chai'
import {v4 as uuidv4} from 'uuid'
import { binaryParser } from './test-util.js'

const expect = chai.expect

describe('Integration test', () => {
    it('should upload image', (done) => {

        request(app)
            .post('/api/v1/images')
            .send(fs.readFileSync('src/test/test-image.png'))
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).to.have.property('id')
                done()
            })
    })

    it('should get image in different format', (done) => {
        const uuid = storePngTestImage()
        const expectedJpgImage = fs.readFileSync('src/test/test-image.jpg')

        request(app).get(`/api/v1/images/${uuid}.jpg`)
            .expect(200)
            .expect('Content-Type', 'image/jpeg')
            .buffer()
            .parse(binaryParser)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                expect(Buffer.compare(res.body, expectedJpgImage)).is.equal(0)
                done()
            })
    })

    function storePngTestImage() {
        const uuid = uuidv4();
        const buffer = fs.readFileSync('src/test/test-image.png')
        fs.writeFileSync(`images/${uuid}`, buffer)
        return uuid
    }
})