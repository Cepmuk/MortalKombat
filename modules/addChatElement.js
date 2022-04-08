const addChatElement = (text, $chat) => {
    const el = `<p>${text}</p>`
    $chat.insertAdjacentHTML('afterbegin', el)
  }

  export default addChatElement