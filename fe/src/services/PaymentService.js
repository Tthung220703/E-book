import axios from "axios"

export const getConfig = async (data) => {
  const res = await axios.post(`http://localhost:3001/api/paymentzalo/config`, data)
  return res.data
}