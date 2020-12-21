const ImageService = {
    host: process.env.ENVIRONMENT === 'docker' ? 'image-storage': 'localhost',
    port: 3000
}

export { ImageService }