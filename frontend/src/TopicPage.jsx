import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TopicDiagram from './Diagrams'

const API = 'http://localhost:8081/api'

const themes = {
  'Arrays & Hashing': ['#6366f1', '#8b5cf6'],
  'Two Pointers & Sliding Window': ['#0ea5e9', '#6366f1'],
  'Binary Search': ['#10b981', '#0ea5e9'],
  'Linked List': ['#f59e0b', '#ef4444'],
  'Stack & Queue': ['#ec4899', '#f43f5e'],
  'Recursion & Backtracking': ['#8b5cf6', '#ec4899'],
  'Trees & BST': ['#16a34a', '#65a30d'],
  'Heaps & Priority Queue': ['#f97316', '#eab308'],
  'Graphs (BFS & DFS)': ['#0891b2', '#2563eb'],
  'Dynamic Programming': ['#7c3aed', '#2563eb'],
  'Greedy & Intervals': ['#dc2626', '#f59e0b'],
}

const hooks = {
  'Arrays & Hashing': 'Seen it before? Ask the hash map.',
  'Two Pointers & Sliding Window': 'Two fingers, one pass. Move the finger that fixes the problem.',
  'Binary Search': 'Cut the search area in half, every single time.',
  'Linked List': 'Save next, flip the pointer, move on.',
  'Stack & Queue': 'Stack = pile of plates (last in, first out). Queue = line at a counter (first in, first out).',
  'Recursion & Backtracking': 'Choose, explore, undo.',
  'Trees & BST': 'Solve the left, solve the right, combine the answers.',
  'Heaps & Priority Queue': 'The boss is always on top.',
  'Graphs (BFS & DFS)': 'Mark it visited, then visit its neighbours.',
  'Dynamic Programming': 'Never solve the same small problem twice. Save the answer.',
  'Greedy & Intervals': 'Sort first, then take the best choice that fits.',
}

const sectionStyles = {
  blue: { box: 'border-blue-500 bg-blue-50', title: 'text-blue-700' },
  pink: { box: 'border-pink-500 bg-pink-50', title: 'text-pink-700' },
  teal: { box: 'border-teal-500 bg-teal-50', title: 'text-teal-700' },
  green: { box: 'border-green-500 bg-green-50', title: 'text-green-700' },
  sky: { box: 'border-sky-500 bg-sky-50', title: 'text-sky-700' },
  amber: { box: 'border-amber-500 bg-amber-50', title: 'text-amber-700' },
  red: { box: 'border-red-500 bg-red-50', title: 'text-red-700' },
  indigo: { box: 'border-indigo-500 bg-indigo-50', title: 'text-indigo-700' },
  orange: { box: 'border-orange-500 bg-orange-50', title: 'text-orange-700' },
  emerald: { box: 'border-emerald-500 bg-emerald-50', title: 'text-emerald-700' },
  purple: { box: 'border-purple-500 bg-purple-50', title: 'text-purple-700' },
  code: { box: 'border-slate-700 bg-slate-100', title: 'text-slate-700' },
}

const badge = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
}

// Splits the lesson text into sections: a heading line in capitals, then its body
function parseSections(text) {
  if (!text) return []
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .filter((block) => block.trim() !== '')
    .map((block) => {
      const lines = block.split('\n')
      const first = lines[0].trim()
      const isHeading = first.length >= 3 && /^[A-Z][A-Z0-9 &(),:'\/-]*$/.test(first)
      const title = isHeading ? first : ''
      const body = isHeading ? lines.slice(1) : lines
      const codeLines = body.filter((l) => /[;{}]\s*$/.test(l.trim())).length
      let isCode = codeLines >= 2
      let kind = 'purple'
      if (/^WHAT/.test(title)) kind = 'blue'
      else if (/ANALOGY/.test(title)) kind = 'pink'
      else if (/^KEY/.test(title)) kind = 'teal'
      else if (/^WHEN/.test(title)) kind = 'green'
      else if (/^CODE/.test(title)) {
        kind = 'code'
        isCode = true
      } else if (/^(WORKED|EXAMPLE|HOW TO)/.test(title)) kind = 'sky'
      else if (/COMPLEXITY/.test(title)) kind = 'amber'
      else if (/MISTAKES/.test(title)) kind = 'red'
      else if (/^INTERVIEW/.test(title)) kind = 'indigo'
      else if (/^PRACTICE/.test(title)) kind = 'orange'
      else if (/^QUICK/.test(title)) kind = 'emerald'
      else if (isCode) kind = 'code'
      return { title, body, kind, isCode }
    })
}

function SectionBody({ section }) {
  if (section.isCode) {
    return (
      <pre className="bg-slate-900 text-green-300 text-xs sm:text-sm rounded-lg p-3 overflow-x-auto">
        {section.body.join('\n')}
      </pre>
    )
  }
  return (
    <div className="text-sm text-slate-700 space-y-1">
      {section.body.map((line, i) => {
        if (/^- /.test(line)) {
          return (
            <div key={i} className="flex gap-2">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>
              <span>{line.slice(2)}</span>
            </div>
          )
        }
        if (/^ {2,}\S/.test(line)) {
          return (
            <div key={i} className="font-mono text-xs bg-white/70 rounded px-2 py-0.5 overflow-x-auto whitespace-pre">
              {line.trim()}
            </div>
          )
        }
        if (/^\d+\. /.test(line)) {
          return (
            <div key={i} className="pl-1">
              {line}
            </div>
          )
        }
        return <p key={i}>{line}</p>
      })}
    </div>
  )
}

export default function TopicPage() {
  const { id } = useParams()
  const [topic, setTopic] = useState(null)
  const [questions, setQuestions] = useState([])
  const [notFound, setNotFound] = useState(false)

  async function loadTopic() {
    const res = await fetch(`${API}/topics/${id}`)
    if (!res.ok) {
      setNotFound(true)
      return
    }
    setTopic(await res.json())
  }

  useEffect(() => {
    loadTopic()
    fetch(`${API}/topics/${id}/questions`)
      .then((res) => res.json())
      .then(setQuestions)
  }, [id])

  async function toggle(q) {
    const res = await fetch(`${API}/questions/${q.id}/solved?value=${!q.solved}`, { method: 'PUT' })
    const updated = await res.json()
    setQuestions((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))
    loadTopic()
  }

  const back = (
    <Link to="/" className="inline-block text-sm text-indigo-700 hover:underline mb-4">
      Back to all topics
    </Link>
  )

  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="max-w-4xl mx-auto p-6">
          {back}
          <p className="text-slate-600">This topic was not found.</p>
        </div>
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="max-w-4xl mx-auto p-6">{back}</div>
      </div>
    )
  }

  const [c1, c2] = themes[topic.name] || ['#6366f1', '#8b5cf6']
  const sections = parseSections(topic.explanation)
  const solved = questions.filter((q) => q.solved).length
  const pct = questions.length === 0 ? 0 : Math.round((solved / questions.length) * 100)

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto p-6">
        {back}

        <div
          className="rounded-2xl p-6 text-white shadow"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          <h1 className="text-3xl font-bold">{topic.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span>Importance {topic.marks}/10</span>
            <span>Study time {topic.blocks * 30} min</span>
            <span className="flex items-center gap-2">
              Your confidence
              <span className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className="w-5 h-3 rounded-full"
                    style={{ background: n <= topic.confidence ? '#ffffff' : 'rgba(255,255,255,0.3)' }}
                  ></span>
                ))}
              </span>
              {topic.confidence}/5
            </span>
          </div>
        </div>

        {hooks[topic.name] && (
          <div className="mt-5 rounded-xl border-2 border-dashed p-4" style={{ borderColor: c1 }}>
            <div className="text-xs font-bold tracking-wide uppercase" style={{ color: c1 }}>
              Remember it in one line
            </div>
            <div className="text-lg font-semibold text-slate-800">{hooks[topic.name]}</div>
          </div>
        )}

        <div className="mt-5 bg-white rounded-xl shadow p-5">
          <h2 className="font-semibold text-lg mb-3">See it</h2>
          <TopicDiagram name={topic.name} />
        </div>

        <div className="mt-5 space-y-4">
          {sections.length === 0 && (
            <div className="bg-white rounded-xl shadow p-5 text-sm text-slate-500">
              No lesson has been written for this topic yet.
            </div>
          )}
          {sections.map((s, i) => (
            <div key={i} className={`rounded-xl border-l-8 p-4 ${sectionStyles[s.kind].box}`}>
              {s.title && (
                <h3 className={`font-bold text-sm tracking-wide mb-2 ${sectionStyles[s.kind].title}`}>{s.title}</h3>
              )}
              <SectionBody section={s} />
            </div>
          ))}
        </div>

        <div className="mt-5 bg-white rounded-xl shadow p-5">
          <h2 className="font-semibold text-lg mb-1">Practice questions</h2>
          <div className="text-sm text-slate-600 mb-2">
            {solved} of {questions.length} solved. Each solved question raises your confidence in this topic.
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
            <div
              className="h-3 rounded-full"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c1}, ${c2})` }}
            ></div>
          </div>

          {questions.length === 0 && <p className="text-sm text-slate-500">No questions for this topic yet.</p>}

          <ul className="divide-y">
            {questions.map((q) => (
              <li key={q.id} className="py-2 flex items-center gap-3">
                <input type="checkbox" checked={q.solved} onChange={() => toggle(q)} />
                <a
                  className={`flex-1 text-indigo-700 hover:underline ${q.solved ? 'line-through text-slate-400' : ''}`}
                  href={q.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {q.title}
                </a>
                <span className={`text-xs rounded px-2 py-0.5 ${badge[q.difficulty] || ''}`}>{q.difficulty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
