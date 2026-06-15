import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceRadial,
  forceSimulation,
  type Simulation,
  type SimulationNodeDatum,
} from 'd3-force';
import { Brain, Maximize2, Minus, Plus, RotateCcw, Sparkles } from 'lucide-react';

type NodeKind = 'center' | 'category' | 'project' | 'skill' | 'thinking' | 'future' | 'tool';

type GraphNode = {
  id: string;
  label: string;
  subtitle?: string;
  kind: NodeKind;
  group: string;
  detailTitle?: string;
  tags?: string[];
  details?: string[];
  philosophy?: string[];
};

type SimNode = GraphNode & SimulationNodeDatum;

type GraphLink = {
  source: string | SimNode;
  target: string | SimNode;
  group: string;
};

type Language = 'zh' | 'en';

const WIDTH = 1480;
const HEIGHT = 760;

const graphCopy: Record<Language, {
  eyebrow: string;
  title: string;
  subtitle: string;
  hint: string;
  ariaLabel: string;
  currentNode: string;
  tags: string;
  philosophy: string;
  emptyDetails: string;
}> = {
  zh: {
    eyebrow: '核心知识图谱',
    title: '探索我的思维图谱',
    subtitle: '比起告诉你我做过什么，我更希望展示我是如何思考的。',
    hint: '拖拽节点 · 滚轮缩放 · 点击探索',
    ariaLabel: '孙晓云的核心知识图谱',
    currentNode: '当前节点',
    tags: '核心标签',
    philosophy: '核心理念',
    emptyDetails: '点击图谱节点查看具体内容',
  },
  en: {
    eyebrow: 'Core Knowledge Graph',
    title: 'Explore My Thinking Map',
    subtitle: 'Rather than only showing what I have done, I want to show how I think.',
    hint: 'Drag nodes · Scroll to zoom · Click to explore',
    ariaLabel: 'Sun Xiaoyun core knowledge graph',
    currentNode: 'Current Node',
    tags: 'Core Tags',
    philosophy: 'Core Principles',
    emptyDetails: 'Click a graph node to view details',
  },
};

const graphNodeEnglishOverrides: Record<string, Partial<GraphNode>> = {
  sunxiaoyun: {
    label: 'Sun Xiaoyun',
    subtitle: 'AI Product Candidate',
    detailTitle: 'Sun Xiaoyun',
    tags: ['TEM-8 English', 'Overseas SaaS', 'AI Product Practice', 'Product Thinking'],
    details: ['My goal is not only to show what I know, but to make it clear how I turn real user needs into AI product ideas.'],
    philosophy: [
      'TEM-8 English gives me a cross-cultural communication foundation.',
      'Overseas SaaS experience keeps me close to real users.',
      'AI project practice helps me turn ideas into working prototypes.',
      'Product thinking keeps me focused on user value first.',
    ],
  },
  about: {
    label: 'About Me',
    detailTitle: 'About Me',
    details: ['English major', 'TEM-8 certified', 'Overseas SaaS operations experience', 'AI product practitioner'],
  },
  work: {
    label: 'Experience',
    detailTitle: 'Work Experience',
    details: ['Overseas SaaS operations', 'Customer communication', 'Requirement feedback analysis', 'Cross-cultural collaboration'],
  },
  projects: {
    label: 'Projects',
    detailTitle: 'Project Experience',
    details: ['AI marketing workbench', 'Menu allergy check Agent', 'Bazi Agent'],
  },
  abilities: {
    label: 'Core Skills',
    detailTitle: 'Core Skills',
    details: ['English communication', 'User insight', 'AI product practice', 'AI workflow design', 'Content growth', 'Global perspective'],
  },
  thinking: {
    label: 'Thinking',
    detailTitle: 'Product Thinking',
    details: ['Why AI product', 'Users do not directly state needs', 'Product management in the AI era', 'Product = hypothesis + validation'],
  },
  'saas-ops': {
    label: 'Overseas SaaS',
    detailTitle: 'Overseas SaaS Operations',
    details: ['Handled overseas customer communication and requirement feedback.', 'Learned to understand business scenarios from the customer perspective.'],
  },
  'customer-communication': {
    label: 'Customer Communication',
    detailTitle: 'Overseas Customer Communication',
    details: ['Used my English background and TEM-8 training to communicate clearly and steadily with overseas customers.'],
  },
  'feedback-analysis': {
    label: 'Feedback Analysis',
    detailTitle: 'Requirement Feedback Analysis',
    details: ['Identified real needs, business blockers, and product improvement opportunities from customer feedback.'],
  },
  'cross-culture': {
    label: 'Cross-Cultural Work',
    detailTitle: 'Cross-Cultural Collaboration',
    details: ['Understood user expression across different markets and communication contexts, reducing collaboration cost.'],
  },
  'allergy-agent': {
    label: 'Menu Allergy Agent',
    detailTitle: 'Menu Allergy Check Agent',
    details: ['Designed for Chinese restaurants in North America.', 'Uses AI to identify menu content and potential allergen risks.'],
  },
  'ai-marketing-tool': {
    label: 'AI Marketing Tool',
    detailTitle: 'ViralGen: TikTok Fragrance AI Marketing Workbench',
    details: [
      'Problem: cross-border sellers understand their products, but struggle to produce TikTok-style marketing content consistently.',
      'The workflow needs product analysis, user pain point research, competitor research, creative direction, and video script generation.',
      'Solution: built an AI marketing workflow using Python, Streamlit, LLMs, multimodal recognition, Tavily Search, and a fragrance RAG knowledge base.',
      'Product design: decomposed the marketing process into product analysis, user insight, competitor research, style generation, scene generation, and prompt generation modules.',
    ],
  },
  'bazi-agent': {
    label: 'Bazi Agent',
    detailTitle: 'Bazi Agent',
    details: [
      'Problem: different LLMs often give different conclusions for the same chart, making trust difficult.',
      'Thinking: real life events may be more useful than abstract personality questions for validation.',
      'Solution: built a FastAPI + Python Agent supporting chart calculation, true solar time conversion, luck-cycle analysis, and streamed reports.',
      'Product innovation: designed a year-anchor Q&A system to validate judgments through user life-event feedback.',
      'Takeaway: users trust not only algorithms, but whether the result can connect with their lived experience.',
    ],
  },
  'english-communication': {
    label: 'English Communication',
    detailTitle: 'English Communication',
    details: ['TEM-8 certified', 'Fluent English communication', 'Cross-cultural collaboration', 'Overseas customer interaction'],
  },
  'user-research': {
    label: 'User Insight',
    detailTitle: 'User Insight',
    details: ['Worked closely with overseas restaurant customers.', 'Learned to understand needs through who the user is, what problem they face, and why the problem happens.', 'Turned feedback into product hypotheses and validation directions.'],
  },
  'ai-workflow': {
    label: 'AI Workflow',
    detailTitle: 'AI Workflow Design',
    details: ['Comfortable using Codex, Claude Code, and OpenClaw.', 'Can break complex business processes into Agents, Skills, and Workflows.', 'Uses AI automation to improve product design, content production, and business execution.'],
  },
  'ai-product-practice': {
    label: 'AI Product Practice',
    detailTitle: 'AI Product Practice',
    details: ['Used AI to complete requirement analysis, product design, prototype development, and product validation.', 'Continuously explores building AI products from 0 to 1.'],
  },
  'content-growth': {
    label: 'Content Growth',
    detailTitle: 'Content Growth Practice',
    details: ['Ran a U.S. Chinese restaurant entrepreneurship content account.', 'Used AI for topic research, content production, and data review.', 'Grew to 1,500+ targeted followers and 4,400+ likes and saves.', 'Used content data to validate user interests and needs.'],
  },
  'global-perspective': {
    label: 'Global Perspective',
    detailTitle: 'Global Perspective',
    details: ['Long-term focus on the U.S. restaurant market, overseas SaaS, TikTok ecosystems, and cross-border commerce.', 'Continuously studies differences in user behavior across markets.'],
  },
  'mvp-thinking': {
    label: 'Hypothesis + Validation',
    detailTitle: 'Product = Hypothesis + Validation',
    details: ['Whether building an AI marketing tool or a Bazi Agent, I keep asking: does this user problem really exist, and can we validate it?', 'This is how I understand the essence of product work.'],
  },
  'user-value': {
    label: 'Hidden User Needs',
    detailTitle: 'Users Do Not Directly State Needs',
    details: ['Users express problems, but product managers need to identify the deeper reasons behind them.', 'Real needs are often hidden in behavior, feedback, and data.'],
  },
  'why-ai-pm': {
    label: 'Why AI Product',
    detailTitle: 'Why I Choose AI Product',
    details: ['Overseas operations experience kept me close to real user needs.', 'AI gave me the ability to go from idea to working product prototype.', 'Through multiple projects, I confirmed AI product as my long-term direction.'],
  },
  'ai-pm-era': {
    label: 'AI Product Era',
    detailTitle: 'Product Managers in the AI Era',
    details: ['AI is lowering the threshold for product building.', 'Future product managers need to understand both users and the capability boundaries of AI.', 'I want to become the person who connects the two.'],
  },
};

const graphNodes: GraphNode[] = [
  {
    id: 'sunxiaoyun',
    label: '孙晓云',
    subtitle: 'AI产品经理方向求职者',
    kind: 'center',
    group: 'core',
    detailTitle: '孙晓云',
    tags: ['英语专八', '美国外企SaaS经验', 'AI项目实践', '产品思维'],
    details: ['目标不是展示我知道多少，而是让你快速理解我如何把真实需求转化为 AI 产品。'],
    philosophy: ['英语专八让我具备跨文化沟通能力', '美国外企SaaS经历让我长期接触真实用户', 'AI项目实践让我把想法落成原型', '产品思维让我坚持用户价值优先'],
  },
  {
    id: 'about',
    label: '关于我',
    kind: 'category',
    group: 'about',
    detailTitle: '关于我',
    details: ['英语专业毕业', 'TEM-8（专业八级）', '美国外企 SaaS 运营经验', 'AI 产品实践者'],
  },
  {
    id: 'work',
    label: '工作经历',
    kind: 'category',
    group: 'work',
    detailTitle: '工作经历',
    details: ['美国外企 SaaS', '海外客户沟通', '需求反馈分析', '跨文化协作'],
  },
  {
    id: 'projects',
    label: '项目经历',
    kind: 'category',
    group: 'projects',
    detailTitle: '项目经历',
    details: ['AI营销工具', '菜单过敏检查Agent', '八字命理 Agent'],
  },
  {
    id: 'abilities',
    label: '核心能力',
    kind: 'category',
    group: 'abilities',
    detailTitle: '核心能力',
    details: ['英语沟通', '用户洞察', 'AI产品实践', 'AI工作流设计', '内容增长实践', '全球化视角'],
  },
  {
    id: 'thinking',
    label: '产品思考',
    kind: 'category',
    group: 'thinking',
    detailTitle: '产品思考',
    details: ['为什么选择 AI 产品', '用户不会直接告诉你需求', 'AI时代的产品经理', '产品 = 假设 + 验证'],
  },
  {
    id: 'saas-ops',
    label: '美国外企 SaaS',
    kind: 'skill',
    group: 'work',
    detailTitle: '美国外企 SaaS 运营经验',
    details: ['长期负责海外客户沟通与需求反馈工作。', '能够从客户视角理解业务场景与实际需求。'],
  },
  {
    id: 'customer-communication',
    label: '海外客户沟通',
    kind: 'skill',
    group: 'work',
    detailTitle: '海外客户沟通',
    details: ['依托英语专业背景和 TEM-8 能力，与海外客户进行清晰、稳定的沟通。'],
  },
  {
    id: 'feedback-analysis',
    label: '需求反馈分析',
    kind: 'skill',
    group: 'work',
    detailTitle: '需求反馈分析',
    details: ['从客户反馈中识别真实需求、业务阻碍和产品改进机会。'],
  },
  {
    id: 'cross-culture',
    label: '跨文化协作',
    kind: 'skill',
    group: 'work',
    detailTitle: '跨文化协作',
    details: ['理解不同市场和沟通语境下的用户表达，降低业务协作成本。'],
  },
  {
    id: 'allergy-agent',
    label: '菜单过敏检查Agent',
    kind: 'project',
    group: 'projects',
    detailTitle: '菜单过敏检查Agent',
    details: ['面向北美华人餐饮场景。', '用 AI Agent 帮助识别菜单内容和潜在过敏风险。'],
  },
  {
    id: 'ai-marketing-tool',
    label: 'AI营销工具',
    kind: 'project',
    group: 'projects',
    detailTitle: 'ViralGen｜TikTok 香氛产品 AI 营销生成工具',
    details: [
      '发现的问题：跨境卖家了解产品，却不知道如何持续产出符合 TikTok 风格的营销内容。',
      '需要同时完成产品分析、用户痛点研究、竞品调研、内容创意和视频脚本编写，成本高且依赖经验。',
      '解决方案：基于 Python + Streamlit 开发跨境电商 AI 营销后台。',
      '集成 LLM、多模态图片识别、Tavily 搜索和香氛领域 RAG 知识库。',
      '实现从商品链接 / 商品图片到产品分析、市场洞察、用户痛点、TikTok Hook、英文文案和视频脚本的自动生成。',
      '产品设计：采用 Agent / Skill 工作流架构，将复杂营销流程拆分为产品分析、用户洞察、竞品研究、风格生成、场景生成和提示词生成模块。',
    ],
  },
  {
    id: 'bazi-agent',
    label: '八字命理 Agent',
    kind: 'project',
    group: 'projects',
    detailTitle: '八字命理 Agent',
    details: [
      '发现的问题：不同大模型对同一命盘的喜忌判断经常出现差异，传统命理产品又过度依赖计算结果。',
      '我的思考：真实人生经历可能比单纯命盘计算更重要，可以用用户过往经历反向验证命理判断。',
      '解决方案：基于 FastAPI + Python 开发八字命理 Agent，支持四柱排盘、真太阳时换算、大运计算、五行十神分析和流式报告生成。',
      '同时接入中国城市经纬度数据库，支持省市区出生地选择。',
      '产品创新：设计流年锚点问答系统，通过用户对关键年份事件的反馈反向验证模型判断。',
      '收获：用户真正相信的不是算法，而是结果是否能够与自身经历产生共鸣；产品价值来自验证机制，而不仅仅是计算能力。',
    ],
  },
  {
    id: 'english-communication',
    label: '英语沟通',
    kind: 'skill',
    group: 'abilities',
    detailTitle: '英语沟通',
    details: ['TEM-8（专业八级）。', '流利英语沟通。', '跨文化协作。', '海外客户交流。'],
  },
  {
    id: 'user-research',
    label: '用户洞察',
    kind: 'skill',
    group: 'abilities',
    detailTitle: '用户洞察',
    details: ['长期与海外餐饮客户沟通。', '习惯从用户是谁、遇到什么问题、为什么会产生问题三个角度理解需求。', '把反馈转化为产品假设与验证方向。'],
  },
  {
    id: 'ai-workflow',
    label: 'AI工作流设计',
    kind: 'skill',
    group: 'abilities',
    detailTitle: 'AI工作流设计',
    details: ['熟练使用 Codex、Claude Code、OpenClaw。', '能够将复杂业务流程拆解为 Agent、Skill、Workflow。', '通过 AI 自动化提升产品设计、内容生产与业务执行效率。'],
  },
  {
    id: 'ai-product-practice',
    label: 'AI产品实践',
    kind: 'skill',
    group: 'abilities',
    detailTitle: 'AI产品实践',
    details: ['利用 AI 完成需求分析、产品设计、原型开发和产品验证。', '持续探索 AI 产品从 0 到 1 的构建过程。'],
  },
  {
    id: 'content-growth',
    label: '内容增长实践',
    kind: 'skill',
    group: 'abilities',
    detailTitle: '内容增长实践',
    details: ['运营美国华人餐饮创业主题账号。', '利用 AI 辅助完成选题研究、内容生产和数据复盘。', '1 个月增长 1500+ 精准粉丝，获得 4400+ 点赞与收藏。', '通过内容数据持续验证用户兴趣与需求。'],
  },
  {
    id: 'global-perspective',
    label: '全球化视角',
    kind: 'skill',
    group: 'abilities',
    detailTitle: '全球化视角',
    details: ['长期关注美国餐饮市场、海外 SaaS、TikTok 生态和跨境电商。', '持续研究不同市场用户行为差异。'],
  },
  {
    id: 'mvp-thinking',
    label: '产品=假设+验证',
    kind: 'thinking',
    group: 'thinking',
    detailTitle: '产品 = 假设 + 验证',
    details: ['无论是 AI 营销工具，还是八字命理 Agent，我最关注的问题始终是：用户是否真的存在这个问题？我们是否有办法验证这个问题？', '这也是我理解的产品工作本质。'],
  },
  {
    id: 'user-value',
    label: '用户不会直接告诉你需求',
    kind: 'thinking',
    group: 'thinking',
    detailTitle: '用户不会直接告诉你需求',
    details: ['用户表达的是问题，产品经理需要发现问题背后的原因。', '真正的需求往往隐藏在行为、反馈和数据之中。'],
  },
  {
    id: 'why-ai-pm',
    label: '为什么选择 AI 产品',
    kind: 'thinking',
    group: 'thinking',
    detailTitle: '为什么选择 AI 产品',
    details: ['海外运营经历让我长期接触真实用户需求。', '接触 AI 后，我第一次拥有了从想法到产品的完整实践能力。', '通过多个项目验证，我逐渐确认 AI 产品是未来长期发展的方向。'],
  },
  {
    id: 'ai-pm-era',
    label: 'AI时代的产品经理',
    kind: 'thinking',
    group: 'thinking',
    detailTitle: 'AI时代的产品经理',
    details: ['AI 正在降低产品开发门槛。', '未来产品经理不仅需要理解用户，也需要理解 AI 的能力边界。', '我希望成为连接两者的人。'],
  },
];

const graphLinks: GraphLink[] = [
  ...['about', 'work', 'projects', 'abilities', 'thinking'].map((target) => ({ source: 'sunxiaoyun', target, group: target })),
  ...['saas-ops', 'customer-communication', 'feedback-analysis', 'cross-culture'].map((target) => ({ source: 'work', target, group: 'work' })),
  ...['allergy-agent', 'ai-marketing-tool', 'bazi-agent'].map((target) => ({ source: 'projects', target, group: 'projects' })),
  ...['english-communication', 'user-research', 'ai-product-practice', 'ai-workflow', 'content-growth', 'global-perspective'].map((target) => ({ source: 'abilities', target, group: 'abilities' })),
  ...['mvp-thinking', 'user-value', 'why-ai-pm', 'ai-pm-era'].map((target) => ({ source: 'thinking', target, group: 'thinking' })),
  { source: 'customer-communication', target: 'english-communication', group: 'work' },
  { source: 'feedback-analysis', target: 'user-research', group: 'work' },
  { source: 'ai-marketing-tool', target: 'ai-workflow', group: 'projects' },
  { source: 'bazi-agent', target: 'mvp-thinking', group: 'projects' },
  { source: 'content-growth', target: 'user-research', group: 'abilities' },
];

const colorByGroup: Record<string, string> = {
  core: '#14b8a6',
  about: '#06b6d4',
  work: '#f59e0b',
  projects: '#10b981',
  abilities: '#22c55e',
  tools: '#0ea5e9',
  thinking: '#8b5cf6',
  future: '#84cc16',
};

const radiusByKind: Record<NodeKind, number> = {
  center: 66,
  category: 44,
  project: 32,
  skill: 32,
  thinking: 32,
  future: 30,
  tool: 26,
};

const getNode = (value: string | SimNode) => (typeof value === 'string' ? undefined : value);

const getPoint = (svg: SVGSVGElement, event: React.PointerEvent<SVGCircleElement>, zoom: number) => {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const matrix = svg.getScreenCTM();
  const raw = matrix ? point.matrixTransform(matrix.inverse()) : { x: WIDTH / 2, y: HEIGHT / 2 };
  return { x: raw.x / zoom, y: raw.y / zoom };
};

const getLocalizedGraphNodes = (language: Language): GraphNode[] => {
  if (language === 'zh') return graphNodes;
  return graphNodes.map((node) => ({
    ...node,
    ...graphNodeEnglishOverrides[node.id],
  }));
};

export default function KnowledgeGraph({ language = 'zh' }: { language?: Language }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<Simulation<SimNode, GraphLink> | null>(null);
  const scatterTimerRef = useRef<number | null>(null);
  const [nodes, setNodes] = useState<SimNode[]>([]);
  const [selectedId, setSelectedId] = useState('sunxiaoyun');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1.22);
  const localizedGraphNodes = useMemo(() => getLocalizedGraphNodes(language), [language]);
  const copy = graphCopy[language];
  const selectedNode = nodes.find((node) => node.id === selectedId) ?? localizedGraphNodes[0];

  const links = useMemo(() => graphLinks.map((link) => ({ ...link })), [language]);
  const focusId = hoveredId || selectedId;

  const connectedIds = useMemo(() => {
    const ids = new Set([focusId]);
    for (const link of links) {
      const source = getNode(link.source)?.id;
      const target = getNode(link.target)?.id;
      if (source === focusId && target) ids.add(target);
      if (target === focusId && source) ids.add(source);
    }
    return ids;
  }, [focusId, links]);

  useEffect(() => {
    const simNodes: SimNode[] = localizedGraphNodes.map((node, index) => ({
      ...node,
      x: WIDTH / 2 + Math.cos(index * 1.7) * 145,
      y: HEIGHT / 2 + Math.sin(index * 1.7) * 145,
    }));

    const simulation = forceSimulation<SimNode>(simNodes)
      .force('charge', forceManyBody<SimNode>().strength((node) => {
        if (node.kind === 'center') return -900;
        if (node.kind === 'category') return -430;
        return -180;
      }))
      .force('link', forceLink<SimNode, GraphLink>(links).id((node) => node.id).distance((link) => {
        const source = getNode(link.source);
        if (source?.kind === 'center') return 168;
        if (source?.kind === 'category') return 112;
        return 88;
      }).strength(0.64))
      .force('center', forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('collide', forceCollide<SimNode>().radius((node) => radiusByKind[node.kind] + 20).strength(0.92))
      .force('radial', forceRadial<SimNode>((node) => {
        if (node.kind === 'center') return 0;
        if (node.kind === 'category') return 195;
        if (node.kind === 'tool') return 310;
        return 278;
      }, WIDTH / 2, HEIGHT / 2).strength(0.055))
      .velocityDecay(0.58)
      .alpha(0.7)
      .alphaDecay(0.045)
      .on('tick', () => {
        for (const node of simNodes) {
          node.x = Math.max(55, Math.min(WIDTH - 55, node.x ?? WIDTH / 2));
          node.y = Math.max(55, Math.min(HEIGHT - 55, node.y ?? HEIGHT / 2));
        }
        setNodes([...simNodes]);
      });

    simulationRef.current = simulation;
    return () => {
      simulation.stop();
    };
  }, [links, localizedGraphNodes]);

  useEffect(() => {
    return () => {
      if (scatterTimerRef.current) window.clearTimeout(scatterTimerRef.current);
    };
  }, []);

  const selectNode = (id: string) => {
    setSelectedId(id);
    const selected = nodes.find((node) => node.id === id);
    if (!selected) return;

    for (const link of links) {
      const source = getNode(link.source);
      const target = getNode(link.target);
      const related = source?.id === id ? target : target?.id === id ? source : null;
      if (!related) continue;

      const dx = (related.x ?? WIDTH / 2) - (selected.x ?? WIDTH / 2);
      const dy = (related.y ?? HEIGHT / 2) - (selected.y ?? HEIGHT / 2);
      const distance = Math.max(1, Math.hypot(dx, dy));
      related.vx = (related.vx ?? 0) + (dx / distance) * 0.75;
      related.vy = (related.vy ?? 0) + (dy / distance) * 0.75;
    }

    simulationRef.current?.alphaTarget(0.04).restart();
    if (scatterTimerRef.current) window.clearTimeout(scatterTimerRef.current);
    scatterTimerRef.current = window.setTimeout(() => {
      simulationRef.current?.alphaTarget(0);
    }, 240);
  };

  const dragNode = (event: React.PointerEvent<SVGCircleElement>, node: SimNode) => {
    const svg = svgRef.current;
    if (!svg) return;
    const point = getPoint(svg, event, zoom);
    node.fx = point.x;
    node.fy = point.y;
    simulationRef.current?.alphaTarget(0.08).restart();
    setSelectedId(node.id);
  };

  const releaseNode = (node: SimNode) => {
    node.fx = null;
    node.fy = null;
    simulationRef.current?.alphaTarget(0);
  };

  const changeZoom = (nextZoom: number) => {
    setZoom(Math.max(0.88, Math.min(1.65, nextZoom)));
  };

  return (
    <section id="mind-graph" className="mb-40 scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center shadow-sm border border-white/50">
            <Brain className="text-teal-600" size={26} />
          </div>
          <div>
            <p className="text-sm font-black tracking-[0.2em] uppercase text-teal-500 mb-2">{copy.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{copy.title}</h2>
          </div>
        </div>
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">
          {copy.subtitle}
        </p>
      </motion.div>

      <div className="relative left-1/2 w-[min(1380px,calc(100vw-28px))] -translate-x-[54%]">
      <div className="glass-card p-4 md:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(760px,1fr)_360px] gap-5 relative z-10">
          <div className="relative min-h-[720px] overflow-hidden rounded-2xl border border-white/60 bg-white/25">
            <div className="absolute inset-0 sunlight-pattern opacity-40" />
            <div className="absolute right-4 top-4 z-20 flex gap-2">
              <button type="button" onClick={() => changeZoom(zoom - 0.12)} className="rounded-xl border border-white/70 bg-white/70 p-2 text-teal-600 shadow-sm backdrop-blur-md">
                <Minus size={18} />
              </button>
              <button type="button" onClick={() => changeZoom(1)} className="rounded-xl border border-white/70 bg-white/70 p-2 text-teal-600 shadow-sm backdrop-blur-md">
                <RotateCcw size={18} />
              </button>
              <button type="button" onClick={() => changeZoom(zoom + 0.12)} className="rounded-xl border border-white/70 bg-white/70 p-2 text-teal-600 shadow-sm backdrop-blur-md">
                <Plus size={18} />
              </button>
            </div>
                <div className="absolute bottom-4 left-4 z-20 rounded-xl border border-white/70 bg-white/65 px-4 py-2 text-xs font-black text-slate-500 shadow-sm backdrop-blur-md">
                  {copy.hint}
                </div>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className="relative z-10 h-[720px] w-full touch-none"
              role="img"
              aria-label={copy.ariaLabel}
              onWheel={(event) => {
                event.preventDefault();
                changeZoom(zoom + (event.deltaY > 0 ? -0.05 : 0.05));
              }}
            >
              <defs>
                <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g transform={`translate(${(WIDTH * (1 - zoom)) / 2} ${(HEIGHT * (1 - zoom)) / 2}) scale(${zoom})`}>
                {links.map((link, index) => {
                  const source = getNode(link.source);
                  const target = getNode(link.target);
                  if (!source || !target) return null;
                  const active = connectedIds.has(source.id) && connectedIds.has(target.id);
                  const muted = hoveredId && !active;
                  return (
                    <motion.line
                      key={`${source.id}-${target.id}-${index}`}
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={colorByGroup[link.group] ?? '#14b8a6'}
                      strokeWidth={active ? 3.2 : 1.35}
                      strokeOpacity={active ? 0.64 : muted ? 0.04 : 0.14}
                    />
                  );
                })}

                {nodes.map((node) => {
                  const active = connectedIds.has(node.id);
                  const hovered = hoveredId === node.id;
                  const selected = selectedId === node.id;
                  const radius = radiusByKind[node.kind] * (hovered ? 1.1 : 1);
                  const color = colorByGroup[node.group] ?? '#14b8a6';
                  const muted = hoveredId && !active;
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x ?? WIDTH / 2}, ${node.y ?? HEIGHT / 2})`}
                      className="cursor-pointer select-none"
                      opacity={muted ? 0.28 : 1}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <motion.circle
                        r={radius + (selected || hovered ? 10 : 0)}
                        fill={color}
                        opacity={selected ? 0.18 : hovered ? 0.15 : active ? 0.08 : 0.035}
                      />
                      <motion.circle
                        r={radius}
                        fill={node.kind === 'center' ? color : 'rgba(255,255,255,0.88)'}
                        stroke={color}
                        strokeWidth={selected ? 4 : hovered ? 3.4 : active ? 2.3 : 1.35}
                        filter={selected || hovered || node.kind === 'center' ? 'url(#node-glow)' : undefined}
                        onClick={() => selectNode(node.id)}
                        onPointerDown={(event) => dragNode(event, node)}
                        onPointerMove={(event) => {
                          if (node.fx == null || node.fy == null) return;
                          dragNode(event, node);
                        }}
                        onPointerUp={() => releaseNode(node)}
                        onPointerCancel={() => releaseNode(node)}
                      />
                      <text
                        y={node.kind === 'center' ? -4 : 4}
                        textAnchor="middle"
                        className={`pointer-events-none font-black ${node.kind === 'center' ? 'fill-white' : 'fill-slate-700'}`}
                      style={{ fontSize: node.kind === 'center' ? 24 : node.label.length > 9 ? 14 : node.label.length > 6 ? 15 : 17 }}
                      >
                        {node.label}
                      </text>
                      {node.subtitle && (
                        <text
                          y={node.kind === 'center' ? 18 : 22}
                          textAnchor="middle"
                          className={`pointer-events-none font-bold ${node.kind === 'center' ? 'fill-white/90' : 'fill-slate-400'}`}
                          style={{ fontSize: node.kind === 'center' ? 12 : 10 }}
                        >
                          {node.subtitle}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <motion.aside
            key={selectedNode.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-white/60 bg-white/55 p-6 shadow-lg shadow-teal-500/5 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-black tracking-[0.2em] uppercase text-teal-500">{copy.currentNode}</p>
                <h3 className="text-2xl font-black text-slate-900">{selectedNode.detailTitle ?? selectedNode.label}</h3>
                {selectedNode.subtitle && <p className="mt-2 text-sm font-bold text-slate-400">{selectedNode.subtitle}</p>}
              </div>
              <div className="rounded-2xl bg-teal-50 p-3 text-teal-500">
                {selectedNode.id === 'sunxiaoyun' ? <Maximize2 size={22} /> : <Sparkles size={22} />}
              </div>
            </div>

            {selectedNode.tags && (
              <div className="mb-6">
                <p className="mb-3 text-xs font-black tracking-[0.16em] uppercase text-slate-400">{copy.tags}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.tags.map((tag) => (
                    <span key={tag} className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {(selectedNode.details ?? [copy.emptyDetails]).map((item) => (
                <div key={item} className="rounded-xl border border-white/70 bg-white/60 px-4 py-3 text-sm font-bold leading-relaxed text-slate-600 shadow-sm">
                  {item}
                </div>
              ))}
            </div>

            {selectedNode.philosophy && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-black tracking-[0.16em] uppercase text-slate-400">{copy.philosophy}</p>
                <div className="space-y-3">
                  {selectedNode.philosophy.map((item) => (
                    <div key={item} className="rounded-xl border border-teal-100 bg-teal-50/80 px-4 py-3 text-sm font-black leading-relaxed text-teal-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      </div>
      </div>
    </section>
  );
}
