const config = {
  REACT_APP_API_BASE:
    process.env.NODE_ENV === 'production'
      ? 'https://petful-server-william-jamesj.herokuapp.com/api'
      : 'http://localhost:8000/api',
}

export default config
