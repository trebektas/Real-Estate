export const apiService = async (url, method, body) => {
  const myHeaders = new Headers()
  myHeaders.append('X-Api-Key', import.meta.env.VITE_API_KEY)

  const requestOptions = body
    ? {
        method: method,
        headers: myHeaders,
        body: body,
        redirect: 'follow'
      }
    : {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
      }

  return fetch(url, requestOptions)
}
