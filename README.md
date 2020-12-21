# ProgImage

### Running in development

```
// image-storage service
cd image-storage
npm install
npm run dev

// image-rotation service
cd image-rotation
npm install
npm run dev
```

`image-storage` service must be running for `image-rotation` service to work. 

### Running using docker

```
docker-compose up
```

### API methods

Valid image formats for uploading and format conversion: `png|jpg|tif`

##### Upload image
```
$ curl --data-binary @test-image.png http://localhost:3000/api/v1/images

{"id":"efcfd7d6-9f91-4cf1-91d8-eb21f215335b"}
```

##### Download image
```
$ curl http://localhost:3000/api/v1/images/efcfd7d6-9f91-4cf1-91d8-eb21f215335b >> output.png
```

##### Format image
```
$ curl http://localhost:3000/api/v1/images/efcfd7d6-9f91-4cf1-91d8-eb21f215335b.jpg >> output.jpg
```

##### Rotate image
```
$ cat data.json

{
  "rotations": [
    {
      "imageId": "efcfd7d6-9f91-4cf1-91d8-eb21f215335b",
      "angle": 90
    },
    {
      "imageId": "c01e8e86-7230-4f12-9e03-124a162c356b",
      "angle": 180 
    }
  ]
}

$ curl -H "Content-Type: application/json" -d @data.json http://localhost:3001/api/v1/image-rotation

{
  "rotatedImages":[
    {
      "originalImageId":"efcfd7d6-9f91-4cf1-91d8-eb21f215335b",
      "rotatedImageId":"b7bf9269-4eb6-4e41-916d-f89c68c6c1be"
    },
    {
      "originalImageId":"c01e8e86-7230-4f12-9e03-124a162c356",
      "rotatedImageId":"70acf023-baa0-488b-b6e8-c74f36d3f4d3"
    }
  ]
}
```

Rotated image can then be retrieved from storage server
