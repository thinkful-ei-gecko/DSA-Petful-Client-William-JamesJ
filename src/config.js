const config = {
  REACT_APP_API_BASE:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_BASE
      : 'http://localhost:8000/api',
}

export default config
