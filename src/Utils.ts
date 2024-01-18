export const randomID = () =>
  Date.now().toString(16) + Math.random().toString(16).slice(2)

export const download = (data: any, filename: string) => {
  const jsonObjectUrl = URL.createObjectURL(
    new Blob([JSON.stringify(data)], { type: 'application/json' })
  )
  const anchorEl = document.createElement('a')
  anchorEl.href = jsonObjectUrl
  anchorEl.download = filename
  anchorEl.click()
  URL.revokeObjectURL(jsonObjectUrl)
}
