import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Message() {
  const [input, setInput] = useState('')

  const handleSendMessage = async () => {
    // inputの値をsupabaseのmessagesテーブルにメッセージを追加
    const { data, error } = await supabase.from('messages').insert({
      message: input,
    })
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      setInput('') // 送信後にinputをクリア
    }
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSendMessage}
      >
        送信
      </button>
      <p>Message1</p>
    </div>
  )
} 