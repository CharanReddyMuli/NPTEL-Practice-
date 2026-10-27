import { useMemo } from 'react'
import { AlertCircle, CheckCircle2, FileText, Play, Trash2 } from 'lucide-react'
import { parseQuestions } from '../lib/parser'
import { SAMPLE } from '../lib/sample'
import type { Question } from '../types'

interface Props {
  text: string
  onTextChange: (t: string) => void
  shuffle: boolean
  onShuffleChange: (v: boolean) => void
  showExplanations: boolean
  onShowExplanationsChange: (v: boolean) => void
  onStart: (questions: Question[]) => void
}

export default function InputPage(p: Props) {
  const { questions, errors } = useMemo(() => parseQuestions(p.text), [p.text])
  const canStart = questions.length > 0 && errors.length === 0

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">NPTEL Practice</h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400">Paste your questions, then practice one at a time.</p>

      <textarea
        value={p.text}
        onChange={(e) => p.onTextChange(e.target.value)}
        spellCheck={false}
        placeholder={'Q: Your question here\nA) Option one\nB) Option two\nANSWER: B\nEXPLANATION: Optional'}
        className="mt-6 h-96 w-full resize-y rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 font-mono text-sm leading-relaxed shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900"
      />

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={p.shuffle} onChange={(e) => p.onShuffleChange(e.target.checked)} className="accent-indigo-600" />
          Shuffle questions
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={p.showExplanations} onChange={(e) => p.onShowExplanationsChange(e.target.checked)} className="accent-indigo-600" />
          Show explanations
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => p.onStart(questions)}
          disabled={!canStart}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700"
        >
          <Play size={16} /> Start Quiz
        </button>
        <button onClick={() => p.onTextChange(SAMPLE)} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
          <FileText size={16} /> Load sample questions
        </button>
        <button onClick={() => p.onTextChange('')} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
          <Trash2 size={16} /> Clear
        </button>
      </div>

      {p.text.trim() !== '' && (
        <div className="mt-6 space-y-3">
          <p className={`flex items-center gap-2 text-sm font-medium ${questions.length ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
            <CheckCircle2 size={16} /> {questions.length} question{questions.length === 1 ? '' : 's'} parsed successfully
          </p>
          {errors.length > 0 && (
            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-300">
                <AlertCircle size={16} /> Fix {errors.length} problem{errors.length === 1 ? '' : 's'} to start the quiz
              </p>
              <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
                {errors.map((e, i) => (
                  <li key={i}>
                    {e.question ? `Question ${e.question}` : 'Input'} (line {e.line}): {e.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <details className="mt-8 text-sm text-gray-600 dark:text-gray-400">
        <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">Format guide</summary>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 text-xs">{`Q: Question text (can span several lines)
A) First option
B) Second option
C) Third option
ANSWER: B
EXPLANATION: Optional, can span several lines

(blank line, then the next "Q:")`}</pre>
      </details>
    </main>
  )
}
