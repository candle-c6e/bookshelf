const tokenPrefix = "__token__"

function getToken() {
  return window.localStorage.getItem(tokenPrefix)
}

function setToken(token: string) {
  return window.localStorage.setItem(tokenPrefix, token)
}

function removeToken() {
  return window.localStorage.removeItem(tokenPrefix)
}

export { getToken, setToken, removeToken }