import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  'Two Pointers & Sliding Window': 'Two fingers, one pass.',
  'Binary Search': 'Cut the search area in half, every time.',
  'Linked List': 'Save next, flip the pointer, move on.',
  'Stack & Queue': 'Plates pile up. People line up.',
  'Recursion & Backtracking': 'Choose, explore, undo.',
  'Trees & BST': 'Solve left, solve right, combine.',
  'Heaps & Priority Queue': 'The boss is always on top.',
  'Graphs (BFS & DFS)': 'Mark it visited, then visit neighbours.',
  'Dynamic Programming': 'Never solve the same problem twice.',
  'Greedy & Intervals': 'Sort first, then take the best fit.',
}

// Short symbol shown in the big circle on each card
const symbols = {
  'Arrays & Hashing': '[ ]',
  'Two Pointers & Sliding Window': '<->',
  'Binary Search': '1/2',
  'Linked List': 'o-o',
  'Stack & Queue': '|||',
  'Recursion & Backtracking': '(n)',
  'Trees & BST': 'Y',
  'Heaps & Priority Queue': '^',
  'Graphs (BFS & DFS)': '*-*',
  'Dynamic Programming': 'DP',
  'Greedy & Intervals': '>>',
}

export default function App() {
  const navigate = useNavigate()
  const [topics, setTopics] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const subjects = await (await fetch(`${API}/subjects`)).json()
        if (subjects.length === 0) return
        const res = await fetch(`${API}/subjects/${subjects[0].id}/topics`)
        setTopics(await res.json())
      } catch (e) {
        setError(true)
      }
    }
    load()
  }, [])

  const avg = topics.length === 0 ? 0 : topics.reduce((s, t) => s + t.confidence, 0) / topics.length
  const strong = topics.filter((t) => t.confidence >= 4).length
  const minutes = topics.reduce((s, t) => s + t.blocks * 30, 0)

  return (
    <div className="min-h-screen bg-slate-100">
      <div
        className="text-white"
        style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed 50%, #db2777)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-sm font-semibold tracking-widest uppercase text-indigo-100">PrepDSA</div>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold">Data Structures and Algorithms</h1>
          <p className="mt-3 max-w-2xl text-lg text-indigo-100">
            Every topic MNC interviews ask about. Learn it with a diagram, practise the questions, and watch your
            confidence grow.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-xl bg-white/15 px-4 py-2">
              <div className="text-2xl font-bold">{topics.length}</div>
              <div className="text-xs text-indigo-100">topics</div>
            </div>
            <div className="rounded-xl bg-white/15 px-4 py-2">
              <div className="text-2xl font-bold">{strong}</div>
              <div className="text-xs text-indigo-100">strong topics</div>
            </div>
            <div className="rounded-xl bg-white/15 px-4 py-2">
              <div className="text-2xl font-bold">{avg.toFixed(1)}/5</div>
              <div className="text-xs text-indigo-100">average confidence</div>
            </div>
            <div className="rounded-xl bg-white/15 px-4 py-2">
              <div className="text-2xl font-bold">{Math.round(minutes / 60)} h</div>
              <div className="text-xs text-indigo-100">to cover everything</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-800">Pick a topic</h2>
        <p className="text-slate-600 mb-6">Each topic has a lesson, a diagram and interview questions.</p>

        {error && (
          <p className="text-red-600 mb-4">Could not reach the backend. Make sure it is running on port 8081.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t) => {
            const [c1, c2] = themes[t.name] || ['#6366f1', '#8b5cf6']
            return (
              <div
                key={t.id}
                onClick={() => navigate(`/topic/${t.id}`)}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="flex items-center gap-4 p-5 text-white"
                  style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/25 text-lg font-extrabold">
                    {symbols[t.name] || 'DS'}
                  </div>
                  <h3 className="text-lg font-bold leading-tight">{t.name}</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm font-medium text-slate-700">{hooks[t.name] || 'Open the lesson to learn it.'}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>Importance {t.marks}/10</span>
                    <span>{t.blocks * 30} min</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className="h-2 flex-1 rounded-full"
                        style={{ background: n <= t.confidence ? c1 : '#e2e8f0' }}
                      ></span>
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-xs">
                    <span className="text-slate-500">Confidence {t.confidence}/5</span>
                    <span className="font-semibold" style={{ color: c1 }}>
                      Open lesson -&gt;
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
