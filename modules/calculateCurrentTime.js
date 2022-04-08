const  calculateCurrentTime = () => {
    const date = new Date
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  export default calculateCurrentTime