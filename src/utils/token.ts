export const removeAllToken = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }