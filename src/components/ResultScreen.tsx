import { Flame, RotateCcw, ArrowLeft } from 'lucide-react'
import type { QuizState } from '../types'

interface Props {
  state: QuizState
  onRestart: () => void
  onBack: () => void
}

export default function ResultScreen({ state, onRestart, onBack }: Props) {
  const total = state.questions.length
  const accuracy = total ? Math.round((state.correct / total) * 100) : 0
  const rows: [string, string | number][] = [
    ['Total questions', total],
    ['Correct', state.correct],
    ['Incorrect', state.incorrect],
    ['Accuracy', `${accuracy}%`],
  ]

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-md">
        <h2 className="text-2xl font-semibold">Quiz complete</h2>
        <dl className="mt-6 divide-y divide-gray-100 dark:divide-gray-800">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between py-3">
              <dt className="text-gray-500 dark:text-gray-400">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
          <div className="flex justify-between py-3">
            <dt className="text-gray-500 dark:text-gray-400">Highest streak</dt>
            <dd className="flex items-center gap-1 font-medium text-orange-500"><Flame size={18} /> {state.bestStreak}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button onClick={onRestart} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700">
            <RotateCcw size={16} /> Practice Again
          </button>
          <button onClick={onBack} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800">
            <ArrowLeft size={16} /> Back to Questions
          </button>
        </div>
      </div>
    </main>
  )
}
