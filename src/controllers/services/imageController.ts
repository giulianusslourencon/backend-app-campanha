import Image from '../../database/models/image'

export const create = async (file?: Express.MulterS3.File) => {
  if (!file) return null

  const newImage = await Image.create({
    key: file.key,
    url: file.location
  })
  return newImage._id as string
}

export const update = async (id: string | null, file: Express.MulterS3.File,
  deleteImage: boolean) => {

  if (id && (deleteImage || file)) {
    destroy(id)
  }

  const newId = await create(file)
  return newId || (!deleteImage && id) || null
}

export const destroy = async (id: string | null) => {
  if (!id) return

  const image = await Image.findById(id)
  if (!image) throw new Error('Image not found')

  await image.remove()
}

