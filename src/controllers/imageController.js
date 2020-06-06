const Image = require('../database/models/image')

module.exports = {
  create (file, cb) {
    if (!file) return cb(null)

    const newImage = {
      key: file.key,
      url: file.location
    }

    Image.create(newImage, function (err, image) {
      if (err) {
        cb(null)
      } else {
        cb(image._id)
      }
    })
  },

  update (id, file, deleteImage, cb) {
    if (id && (deleteImage || file)) {
      this.destroy(id)
    }

    this.create(file, newId => {
      cb(newId || !deleteImage && id || null)
    })
  },

  async destroy (id) {
    if (!id) return

    const image = await Image.findById(id)
    image.remove()
  }
}
