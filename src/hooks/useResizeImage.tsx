import { useCallback } from 'react'
import Pica from 'pica'

const pica = new Pica()

const useResizeImage = (): ((file: File, width: number) => Promise<Blob>) => {
  const resizeImage = useCallback(async (file: File, width: number): Promise<Blob> => {
    return await new Promise((resolve, reject) => {
      const img = new Image()
      img.src = URL.createObjectURL(file)

      img.onload = () => {
        const aspectRatio = img.height / img.width
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = width * aspectRatio

        pica
          .resize(img, canvas)
          .then((result) => {
            const fileType = file.type
            return pica.toBlob(result, fileType)
          })
          .then((blob) => {
            resolve(blob)
          })
          .catch((error) => {
            reject(error)
          })
      }

      img.onerror = (error) => {
        reject(error)
      }
    })
  }, [])

  return resizeImage
}

export default useResizeImage
