# NPTEL Practice

Local quiz app: paste questions, practice one at a time. No backend, no API keys.

```bash
npm install
npm run dev      # open the printed http://localhost:5173
npm test         # parser + streak/score tests
```

## Adding your own questions
Paste into the text area (or click "Load sample questions" to see an example):

```text
Q: Question text
A) Option one
B) Option two
C) Option three
D) Option four
ANSWER: C
EXPLANATION: Optional reason.

Q: Next question...
```

Rules: each question starts with `Q:`; options use `A)` or `A.`; `ANSWER:` is one letter;
`EXPLANATION:` is optional; questions, options and explanations may span multiple lines.
Any format error is listed with its question number and line, and Start Quiz stays disabled until fixed.

Shortcuts in the quiz: option letters select, Enter = next, Esc = back (with confirmation).
