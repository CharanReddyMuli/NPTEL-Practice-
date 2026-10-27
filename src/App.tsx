import { useEffect, useState } from 'react'
import InputPage from './components/InputPage'
import QuizScreen from './components/QuizScreen'
import ThemeToggle from './components/ThemeToggle'
import type { Question } from './types'

// localStorage helpers: fail quietly if storage is unavailable
const load = (k: string, fallback: string) => { try { return localStorage.getItem(k) ?? fallback } catch { return fallback } }
const save = (k: string, v: string) => { try { localStorage.setItem(k, v) } catch { /* ignore */ } }

export default function App() {
  const [text, setText] = useState(() => load('nptel.text', ''))
  const [shuffle, setShuffle] = useState(() => load('nptel.shuffle', 'false') === 'true')
  const [showExplanations, setShowExplanations] = useState(() => load('nptel.explain', 'true') === 'true')
  const [quiz, setQuiz] = useState<Question[] | null>(null)
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    save('nptel.theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => save('nptel.text', text), [text])
  useEffect(() => save('nptel.shuffle', String(shuffle)), [shuffle])
  useEffect(() => save('nptel.explain', String(showExplanations)), [showExplanations])

  const toggle = <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />

  if (quiz) {
    return (
      <>
        {toggle}
        <QuizScreen questions={quiz} shuffleOnStart={shuffle} showExplanations={showExplanations} onExit={() => setQuiz(null)} />
      </>
    )
  }
  return (
    <>
      {toggle}
      <InputPage
      text={text}
      onTextChange={setText}
      shuffle={shuffle}
      onShuffleChange={setShuffle}
      showExplanations={showExplanations}
      onShowExplanationsChange={setShowExplanations}
      onStart={setQuiz}
      />
    </>
  )
}
