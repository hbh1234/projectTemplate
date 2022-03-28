let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'https://dev.hzwtech.com/cloud-tool'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http:dadad/api'
} else {
  BASE_URL = 'xxxxx'
}

export { BASE_URL }
