function Defs() {
  return (
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
      </marker>
    </defs>
  )
}

function Frame({ height, caption, children }) {
  return (
    <div>
      <svg viewBox={`0 0 640 ${height}`} className="w-full" role="img">
        <Defs />
        {children}
      </svg>
      {caption && <p className="text-sm text-slate-600 mt-2">{caption}</p>}
    </div>
  )
}

function Cell({ x, y, w = 46, h = 40, text, fill = '#e0e7ff', stroke = '#6366f1', color = '#312e81', size = 16 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke} strokeWidth="2" />
      <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize={size} fontWeight="700" fill={color}>
        {text}
      </text>
    </g>
  )
}

function Label({ x, y, children, color = '#475569', size = 13, anchor = 'middle', weight = 600 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color}>
      {children}
    </text>
  )
}

function Arrow({ x1, y1, x2, y2, color = '#475569', dashed = false }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="2"
      markerEnd="url(#arr)"
      strokeDasharray={dashed ? '5 4' : undefined}
    />
  )
}

function Edge({ x1, y1, x2, y2, color = '#94a3b8' }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />
}

function Circle({ x, y, text, r = 22, fill = '#bbf7d0', stroke = '#16a34a', color = '#14532d' }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} strokeWidth="2" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={color}>
        {text}
      </text>
    </g>
  )
}

const dim = { fill: '#f1f5f9', stroke: '#cbd5e1', color: '#94a3b8' }
const hot = { fill: '#fed7aa', stroke: '#ea580c', color: '#7c2d12' }
const good = { fill: '#bbf7d0', stroke: '#16a34a', color: '#14532d' }

function ArraysHashing() {
  const values = [2, 7, 11, 15]
  return (
    <Frame height={235} caption="Remember: check the map first, then store the current number.">
      <Label x={20} y={22} anchor="start" color="#4338ca" size={14}>Array nums, target = 9</Label>
      {values.map((v, i) => (
        <g key={i}>
          <Cell x={20 + i * 54} y={60} text={v} {...(i === 0 ? good : i === 1 ? hot : {})} />
          <Label x={43 + i * 54} y={120} size={12} color="#64748b">{i}</Label>
        </g>
      ))}
      <Label x={380} y={22} anchor="start" color="#15803d" size={14}>HashMap "seen"</Label>
      <rect x={380} y={60} width={200} height={40} rx="8" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
      <Label x={480} y={85} color="#14532d" size={15}>2 -&gt; index 0</Label>
      <path d="M 380 72 C 330 28, 100 28, 46 60" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arr)" />
      <Label x={250} y={34} color="#15803d" size={12}>found it!</Label>
      <Label x={20} y={158} anchor="start" color="#c2410c" size={15}>i = 1: value is 7, so need = 9 - 7 = 2</Label>
      <Label x={20} y={185} anchor="start" color="#15803d" size={15}>Is 2 in the map? Yes, at index 0</Label>
      <Label x={20} y={213} anchor="start" color="#4338ca" size={16} weight={700}>Answer: [0, 1]</Label>
    </Frame>
  )
}

function TwoPointers() {
  const sorted = [1, 3, 4, 6, 8, 11]
  const word = ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b']
  return (
    <Frame height={265} caption="Two pointers walk toward each other. A window grows on the right and shrinks on the left.">
      <Label x={20} y={22} anchor="start" color="#0369a1" size={14}>Two pointers on a sorted array (target = 10)</Label>
      {sorted.map((v, i) => (
        <Cell key={i} x={20 + i * 54} y={36} text={v} {...(i === 0 || i === 5 ? hot : {})} />
      ))}
      <Arrow x1={43} y1={112} x2={43} y2={84} color="#ea580c" />
      <Label x={43} y={128} color="#ea580c">L</Label>
      <Arrow x1={313} y1={112} x2={313} y2={84} color="#ea580c" />
      <Label x={313} y={128} color="#ea580c">R</Label>
      <Label x={380} y={56} anchor="start" color="#334155" size={14}>1 + 11 = 12</Label>
      <Label x={380} y={78} anchor="start" color="#dc2626" size={14}>12 is too big,</Label>
      <Label x={380} y={100} anchor="start" color="#dc2626" size={14}>so move R left</Label>

      <Label x={20} y={163} anchor="start" color="#0369a1" size={14}>Sliding window on "abcabcbb"</Label>
      {word.map((v, i) => (
        <Cell key={i} x={20 + i * 54} y={178} text={v} {...(i >= 1 && i <= 3 ? good : {})} />
      ))}
      <rect x={68} y={170} width={166} height={56} rx="10" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="6 4" />
      <Label x={151} y={246} color="#15803d" size={13}>window "bca": no repeats</Label>
      <Label x={470} y={198} anchor="start" color="#334155" size={13}>right: expand</Label>
      <Label x={470} y={218} anchor="start" color="#334155" size={13}>left: shrink on repeat</Label>
    </Frame>
  )
}

function BinarySearch() {
  const nums = [1, 3, 5, 7, 9, 11, 13, 15]
  return (
    <Frame height={275} caption="Every step throws away half of the numbers, so 1,000,000 items need only about 20 steps.">
      <Label x={20} y={24} anchor="start" color="#047857" size={14}>Step 1: look at the middle (target = 11)</Label>
      {nums.map((v, i) => (
        <Cell key={i} x={20 + i * 54} y={36} text={v} {...(i === 3 ? hot : {})} />
      ))}
      <Arrow x1={43} y1={116} x2={43} y2={84} color="#0369a1" />
      <Label x={43} y={132} color="#0369a1" size={12}>lo</Label>
      <Arrow x1={205} y1={116} x2={205} y2={84} color="#ea580c" />
      <Label x={205} y={132} color="#ea580c" size={12}>mid = 7</Label>
      <Arrow x1={367} y1={116} x2={367} y2={84} color="#0369a1" />
      <Label x={367} y={132} color="#0369a1" size={12}>hi</Label>
      <Label x={470} y={56} anchor="start" color="#334155" size={14}>7 is less than 11</Label>
      <Label x={470} y={78} anchor="start" color="#dc2626" size={14}>drop the left half</Label>

      <Label x={20} y={162} anchor="start" color="#047857" size={14}>Step 2: only the right half is left</Label>
      {nums.map((v, i) => (
        <Cell key={i} x={20 + i * 54} y={174} text={v} {...(i < 4 ? dim : i === 5 ? good : {})} />
      ))}
      <Arrow x1={313} y1={248} x2={313} y2={222} color="#16a34a" />
      <Label x={313} y={266} color="#15803d" size={12}>mid = 11</Label>
      <Label x={470} y={196} anchor="start" color="#15803d" size={14} weight={700}>mid = 11, found!</Label>
    </Frame>
  )
}

function LinkedList() {
  const nodeX = (i) => 90 + i * 110
  return (
    <Frame height={215} caption="Reversing: save the next node, flip the pointer backwards, then move forward.">
      <Label x={20} y={20} anchor="start" color="#b45309" size={14}>Original list</Label>
      <Label x={nodeX(0) + 28} y={38} color="#b45309" size={12}>head</Label>
      {[1, 2, 3].map((v, i) => (
        <Cell key={i} x={nodeX(i)} y={46} w={56} text={v} fill="#fef3c7" stroke="#f59e0b" color="#78350f" />
      ))}
      {[0, 1, 2].map((i) => (
        <Arrow key={i} x1={nodeX(i) + 60} y1={66} x2={i === 2 ? 414 : nodeX(i + 1) - 4} y2={66} color="#b45309" />
      ))}
      <Label x={420} y={71} anchor="start" color="#64748b" size={14}>null</Label>

      <Label x={20} y={122} anchor="start" color="#b91c1c" size={14}>After reversing</Label>
      <Label x={nodeX(2) + 28} y={140} color="#b91c1c" size={12}>new head</Label>
      {[1, 2, 3].map((v, i) => (
        <Cell key={i} x={nodeX(i)} y={148} w={56} text={v} fill="#fee2e2" stroke="#ef4444" color="#7f1d1d" />
      ))}
      <Label x={20} y={173} anchor="start" color="#64748b" size={14}>null</Label>
      <Arrow x1={nodeX(0) - 4} y1={168} x2={56} y2={168} color="#b91c1c" />
      {[0, 1].map((i) => (
        <Arrow key={i} x1={nodeX(i + 1) - 4} y1={168} x2={nodeX(i) + 60} y2={168} color="#b91c1c" />
      ))}
      <Label x={480} y={62} anchor="start" color="#334155" size={13}>1. save next</Label>
      <Label x={480} y={82} anchor="start" color="#334155" size={13}>2. flip pointer</Label>
      <Label x={480} y={102} anchor="start" color="#334155" size={13}>3. move forward</Label>
    </Frame>
  )
}

function StackQueue() {
  return (
    <Frame height={260} caption="Stack: last in, first out (like plates). Queue: first in, first out (like a line at a counter).">
      <Label x={100} y={22} color="#be185d" size={14}>Stack</Label>
      <Arrow x1={100} y1={32} x2={100} y2={82} color="#be185d" />
      <Label x={60} y={52} color="#be185d" size={12}>push</Label>
      <path d="M 50 80 L 50 215 L 150 215 L 150 80" fill="none" stroke="#475569" strokeWidth="3" />
      <Cell x={60} y={170} w={80} h={36} text="A" fill="#fce7f3" stroke="#ec4899" color="#831843" />
      <Cell x={60} y={130} w={80} h={36} text="B" fill="#fce7f3" stroke="#ec4899" color="#831843" />
      <Cell x={60} y={90} w={80} h={36} text="C" fill="#fbcfe8" stroke="#db2777" color="#831843" />
      <Arrow x1={178} y1={100} x2={178} y2={50} color="#be185d" />
      <Label x={196} y={74} color="#be185d" size={12} anchor="start">pop C</Label>
      <Label x={100} y={240} color="#be185d" size={13}>top is the only open end</Label>

      <Label x={420} y={60} color="#0369a1" size={14}>Queue</Label>
      <line x1="292" y1="104" x2="548" y2="104" stroke="#475569" strokeWidth="3" />
      <line x1="292" y1="156" x2="548" y2="156" stroke="#475569" strokeWidth="3" />
      {[1, 2, 3, 4].map((v, i) => (
        <Cell key={i} x={300 + i * 60} y={112} w={52} h={36} text={v} fill="#e0f2fe" stroke="#0ea5e9" color="#0c4a6e" />
      ))}
      <Arrow x1={296} y1={130} x2={240} y2={130} color="#0369a1" />
      <Label x={268} y={120} color="#0369a1" size={12}>dequeue</Label>
      <Arrow x1={634} y1={130} x2={554} y2={130} color="#0369a1" />
      <Label x={594} y={120} color="#0369a1" size={12}>enqueue</Label>
      <Label x={420} y={190} color="#0369a1" size={13}>front is on the left, back is on the right</Label>
    </Frame>
  )
}

function Recursion() {
  const box = { fill: '#ede9fe', stroke: '#8b5cf6', color: '#4c1d95' }
  return (
    <Frame height={270} caption="Backtracking walks down the tree choosing, and walks back up undoing, so every branch is tried.">
      <Edge x1={300} y1={57} x2={222} y2={113} color="#8b5cf6" />
      <Edge x1={340} y1={57} x2={418} y2={113} color="#8b5cf6" />
      <Arrow x1={185} y1={147} x2={185} y2={203} color="#8b5cf6" />
      <Arrow x1={215} y1={203} x2={215} y2={147} color="#dc2626" dashed />
      <Cell x={285} y={23} w={70} h={34} text="[ ]" {...box} />
      <Cell x={165} y={113} w={70} h={34} text="[1]" {...box} />
      <Cell x={405} y={113} w={70} h={34} text="[2]" {...box} />
      <Cell x={165} y={203} w={70} h={34} text="[1,2]" {...box} />
      <Label x={246} y={84} anchor="end" color="#6d28d9" size={12}>choose 1</Label>
      <Label x={394} y={84} anchor="start" color="#6d28d9" size={12}>choose 2</Label>
      <Label x={178} y={180} anchor="end" color="#6d28d9" size={12}>choose 2</Label>
      <Label x={228} y={180} anchor="start" color="#dc2626" size={12}>undo</Label>
      <Label x={330} y={205} anchor="start" color="#334155" size={13}>choose: add a number</Label>
      <Label x={330} y={226} anchor="start" color="#334155" size={13}>explore: go deeper</Label>
      <Label x={330} y={247} anchor="start" color="#dc2626" size={13}>undo: remove it, try the next</Label>
    </Frame>
  )
}

function Trees() {
  return (
    <Frame height={285} caption="In a BST, everything on the left is smaller and everything on the right is larger.">
      <Edge x1={320} y1={44} x2={200} y2={118} />
      <Edge x1={320} y1={44} x2={440} y2={118} />
      <Edge x1={200} y1={118} x2={140} y2={196} />
      <Edge x1={200} y1={118} x2={260} y2={196} />
      <Edge x1={440} y1={118} x2={500} y2={196} />
      <Circle x={320} y={44} text="8" fill="#fef08a" stroke="#ca8a04" color="#713f12" />
      <Circle x={200} y={118} text="3" />
      <Circle x={440} y={118} text="10" />
      <Circle x={140} y={196} text="1" />
      <Circle x={260} y={196} text="6" />
      <Circle x={500} y={196} text="14" />
      <Label x={352} y={32} anchor="start" color="#a16207" size={12}>root</Label>
      <Label x={20} y={30} anchor="start" color="#15803d" size={14}>left &lt; node &lt; right</Label>
      <Label x={320} y={256} color="#15803d" size={15} weight={700}>In-order walk: 1 3 6 8 10 14 (sorted!)</Label>
    </Frame>
  )
}

function Heaps() {
  const vals = [1, 3, 2, 7, 4, 5, 6]
  const heat = { fill: '#fed7aa', stroke: '#ea580c', color: '#7c2d12' }
  return (
    <Frame height={305} caption="A heap is a tree, but it is stored in a plain array. The smallest item is always at index 0.">
      <Label x={20} y={26} anchor="start" color="#c2410c" size={14}>Min-heap: every parent is smaller than its children</Label>
      <Edge x1={320} y1={64} x2={200} y2={116} />
      <Edge x1={320} y1={64} x2={440} y2={116} />
      <Edge x1={200} y1={116} x2={140} y2={170} />
      <Edge x1={200} y1={116} x2={260} y2={170} />
      <Edge x1={440} y1={116} x2={380} y2={170} />
      <Edge x1={440} y1={116} x2={500} y2={170} />
      <Circle x={320} y={64} text="1" fill="#fde68a" stroke="#d97706" color="#78350f" />
      <Circle x={200} y={116} text="3" {...heat} />
      <Circle x={440} y={116} text="2" {...heat} />
      <Circle x={140} y={170} text="7" {...heat} />
      <Circle x={260} y={170} text="4" {...heat} />
      <Circle x={380} y={170} text="5" {...heat} />
      <Circle x={500} y={170} text="6" {...heat} />
      <Label x={352} y={52} anchor="start" color="#b45309" size={12}>smallest</Label>
      <Label x={20} y={222} anchor="start" color="#475569" size={13}>The same heap as an array:</Label>
      {vals.map((v, i) => (
        <g key={i}>
          <Cell x={20 + i * 54} y={232} text={v} {...(i === 0 ? { fill: '#fde68a', stroke: '#d97706', color: '#78350f' } : {})} />
          <Label x={43 + i * 54} y={290} size={12} color="#64748b">{i}</Label>
        </g>
      ))}
      <Label x={420} y={246} anchor="start" color="#334155" size={13}>children of i: 2i+1, 2i+2</Label>
      <Label x={420} y={268} anchor="start" color="#334155" size={13}>parent of i: (i-1)/2</Label>
    </Frame>
  )
}

function Graphs() {
  const levels = [
    { fill: '#fecaca', stroke: '#dc2626', color: '#7f1d1d' },
    { fill: '#fed7aa', stroke: '#ea580c', color: '#7c2d12' },
    { fill: '#fef08a', stroke: '#ca8a04', color: '#713f12' },
    { fill: '#bbf7d0', stroke: '#16a34a', color: '#14532d' },
  ]
  const nodes = [
    { n: 'A', x: 80, y: 130, l: 0 },
    { n: 'B', x: 200, y: 70, l: 1 },
    { n: 'C', x: 200, y: 190, l: 1 },
    { n: 'D', x: 330, y: 70, l: 2 },
    { n: 'E', x: 330, y: 190, l: 2 },
    { n: 'F', x: 460, y: 130, l: 3 },
  ]
  const find = (n) => nodes.find((x) => x.n === n)
  const edges = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'F'], ['E', 'F']]
  return (
    <Frame height={250} caption="BFS visits the graph level by level, so the first time you reach a node is by the shortest path.">
      {edges.map(([a, b], i) => (
        <Edge key={i} x1={find(a).x} y1={find(a).y} x2={find(b).x} y2={find(b).y} />
      ))}
      {nodes.map((n) => (
        <Circle key={n.n} x={n.x} y={n.y} text={n.n} {...levels[n.l]} />
      ))}
      <Label x={80} y={106} color="#dc2626" size={12}>start</Label>
      {['level 0', 'level 1', 'level 2', 'level 3'].map((t, i) => (
        <g key={t}>
          <rect x={530} y={60 + i * 28} width={16} height={16} rx="4" fill={levels[i].fill} stroke={levels[i].stroke} strokeWidth="2" />
          <Label x={554} y={73 + i * 28} anchor="start" color="#334155" size={13}>{t}</Label>
        </g>
      ))}
    </Frame>
  )
}

function DynamicProgramming() {
  const vals = [1, 1, 2, 3, 5, 8, 13]
  return (
    <Frame height={265} caption="Each answer is built from smaller answers you already saved, so nothing is solved twice.">
      <Label x={20} y={28} anchor="start" color="#6d28d9" size={14}>Climbing stairs: ways to reach step i</Label>
      {vals.map((v, i) => (
        <g key={i}>
          <Cell
            x={20 + i * 86}
            y={48}
            w={60}
            text={v}
            fill={i === 6 ? '#bbf7d0' : i >= 4 ? '#fed7aa' : '#ede9fe'}
            stroke={i === 6 ? '#16a34a' : i >= 4 ? '#ea580c' : '#8b5cf6'}
            color="#1e1b4b"
          />
          <Label x={50 + i * 86} y={112} size={12} color="#64748b">{`dp[${i}]`}</Label>
        </g>
      ))}
      <path d="M 480 124 L 480 150 L 556 150 L 556 126" fill="none" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arr)" />
      <path d="M 394 124 L 394 176 L 580 176 L 580 126" fill="none" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arr)" />
      <Label x={20} y={216} anchor="start" color="#6d28d9" size={16} weight={700}>dp[6] = dp[5] + dp[4] = 8 + 5 = 13</Label>
      <Label x={20} y={244} anchor="start" color="#334155" size={13}>Recipe: define dp[i], write the rule, set the base cases, fill in order.</Label>
    </Frame>
  )
}

function Greedy() {
  const x = (t) => 40 + t * 28
  const bar = (s, e, y, fill, stroke, text) => (
    <g key={`${s}-${e}-${y}`}>
      <rect x={x(s)} y={y} width={(e - s) * 28} height={28} rx="6" fill={fill} stroke={stroke} strokeWidth="2" />
      <text x={x(s) + ((e - s) * 28) / 2} y={y + 19} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b">{text}</text>
    </g>
  )
  return (
    <Frame height={275} caption="Sort by start time, then keep extending the last interval while the next one overlaps it.">
      <Label x={20} y={26} anchor="start" color="#b91c1c" size={14}>Sorted by start time</Label>
      {bar(1, 3, 40, '#fecaca', '#ef4444', '[1,3]')}
      {bar(2, 6, 74, '#fed7aa', '#f97316', '[2,6]')}
      {bar(8, 10, 40, '#fecaca', '#ef4444', '[8,10]')}
      {bar(15, 18, 40, '#fecaca', '#ef4444', '[15,18]')}
      <Label x={236} y={92} anchor="start" color="#dc2626" size={13}>[1,3] and [2,6] overlap, so merge</Label>
      <Arrow x1={190} y1={106} x2={190} y2={160} color="#475569" dashed />
      <Label x={20} y={150} anchor="start" color="#15803d" size={14}>After merging</Label>
      {bar(1, 6, 166, '#bbf7d0', '#16a34a', '[1,6]')}
      {bar(8, 10, 166, '#bbf7d0', '#16a34a', '[8,10]')}
      {bar(15, 18, 166, '#bbf7d0', '#16a34a', '[15,18]')}
      <line x1={40} y1={224} x2={600} y2={224} stroke="#94a3b8" strokeWidth="2" />
      {[0, 5, 10, 15, 20].map((t) => (
        <Label key={t} x={x(t)} y={246} size={12} color="#64748b">{t}</Label>
      ))}
    </Frame>
  )
}

const diagrams = {
  'Arrays & Hashing': ArraysHashing,
  'Two Pointers & Sliding Window': TwoPointers,
  'Binary Search': BinarySearch,
  'Linked List': LinkedList,
  'Stack & Queue': StackQueue,
  'Recursion & Backtracking': Recursion,
  'Trees & BST': Trees,
  'Heaps & Priority Queue': Heaps,
  'Graphs (BFS & DFS)': Graphs,
  'Dynamic Programming': DynamicProgramming,
  'Greedy & Intervals': Greedy,
}

export default function TopicDiagram({ name }) {
  const Diagram = diagrams[name]
  if (!Diagram) return null
  return <Diagram />
}
