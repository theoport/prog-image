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



## Task

_Below the task that this repository solved_

You are a member of a team that has been tasked with developing a programmatic image storage and processing service called ProgImage.com.

Unlike other image storage services that have a web front-end and target end-users, ProgImage is designed as a specialised image storage and processing engine to be used by other applications, and will (only) provide high-performance access via its API.

Apart from bulk image storage and retrieval, ProgImage provides several image processing and transformation capabilities such as compression, rotation, a variety of filters, thumbnail creation, and masking.

These capabilities are all delivered as a set of high-performance web-services that can operate on images provided as data in a request, operate on a remote image via a URL, or on images that are already in the repository. All of the processing features should be able to operate in bulk, and at a significant scale.

**What you need to do**

1. Build a simple microservice that can receive an uploaded image and return a unique identifier for the uploaded image that can be used subsequently to retrieve the image.
1. Extend the microservice so that different image formats can be returned by using a different image file type as an extension on the image request URL.
1. Write a series of automated tests that test the image upload, download, and file format conversion capabilities.

**Stretch**

1. Write a series of microservices for each type of image transformation. Coordinate the various services using runtime virtualization or containerization technology of your choice.
1. Design a language-specific API shim (in the language of your choice) for ProgImage as a reusable library (e.g. Ruby Gem, Node Package, etc). The library should provide a clean and simple programmatic interface that would allow a client back-end application to talk to the ProgImage service. The library should be idiomatic for the target language.
