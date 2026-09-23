export function download(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename.replace(/[\\/:*?"<>|]/g, '-')
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Normalize photos for local storage and print without embedding full camera originals. */
export function normalizePhoto(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const image = new Image()
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('图片无法解码，请选择有效图片。'))
    }
    image.onload = () => {
      try {
        const scale = Math.min(1, 640 / Math.max(image.naturalWidth, image.naturalHeight))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
        const context = canvas.getContext('2d')
        if (!context) throw new Error('当前浏览器无法处理图片。')
        context.fillStyle = '#fff'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.88))
      } catch (error) {
        reject(error)
      } finally {
        URL.revokeObjectURL(url)
      }
    }
    image.src = url
  })
}
export function readAvatar(file: File): Promise<string> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
    return Promise.reject(new Error('请选择 JPG、PNG 或 WebP 图片。'))
  if (file.size > 2_000_000) return Promise.reject(new Error('头像请控制在 2 MB 以内。'))
  return normalizePhoto(file)
}
