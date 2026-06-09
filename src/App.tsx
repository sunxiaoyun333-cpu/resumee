import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import profilePhoto from './assets/profile-photo.png';
import smilePhoto from './assets/smile-photo.png';
import baziChartImage from './assets/bazi-chart.png';
import baziQuestionOneImage from './assets/bazi-question-1.png';
import baziQuestionTwoImage from './assets/bazi-question-2.png';
import baziQuestionThreeImage from './assets/bazi-question-3.png';
import baziReportImage from './assets/bazi-report.png';
import viralgenInputImage from './assets/viralgen-input.png';
import viralgenProfileImage from './assets/viralgen-profile.png';
import viralgenPlanImage from './assets/viralgen-plan.png';
import viralgenVideoImage from './assets/viralgen-video.png';
import restaurantProfileImage from './assets/restaurant-profile.png';
import restaurantPostsOneImage from './assets/restaurant-posts-1.png';
import restaurantPostsTwoImage from './assets/restaurant-posts-2.png';
import restaurantPostsThreeImage from './assets/restaurant-posts-3.png';
import menuHeroImage from './assets/menu-hero.png';
import menuWorkflowImage from './assets/menu-workflow.png';
import menuResultInfoImage from './assets/menu-result-info.png';
import menuAllergenMarketingImage from './assets/menu-allergen-marketing.png';
import menuCopyOutputImage from './assets/menu-copy-output.png';
import KnowledgeGraph from './KnowledgeGraph';
import {
  Award,
  Briefcase,
  Calendar,
  ChevronRight,
  Code,
  Coffee,
  Github,
  GraduationCap,
  Heart,
  Languages,
  Linkedin,
  Mail,
  Sun,
  User,
  X,
} from 'lucide-react';

type Language = 'zh' | 'en';

type ProjectSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type Project = {
  title: string;
  subtitle: string;
  desc: string[];
  tags: string[];
  img: string;
  gallery: { src: string; alt: string }[];
  sections: ProjectSection[];
};

type Content = {
  nav: Record<string, string>;
  hero: {
    hello: string;
    name: string;
    tagline: React.ReactNode;
    intro: string[];
    treat: string;
  };
  mind: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { title: string; body: string; tags: string[] }[];
  };
  experience: {
    title: string;
    role: string;
    company: string;
    period: string;
    desc: string[];
    coreTitle: string;
    coreWork: string[];
    gainsTitle: string;
    gains: string[];
  };
  projectsTitle: string;
  projects: Project[];
  skills: {
    title: string;
    toolsTitle: string;
    softTitle: string;
    tools: string[];
    soft: string[];
  };
  education: {
    title: string;
    school: string;
    major: string;
    note: string;
  };
  contact: {
    title: string;
    tagTitle: string;
    tags: string[];
    heading: string;
    body: string;
    button: string;
  };
  modal: {
    details: string;
    closeProject: string;
    closeImage: string;
  };
  footer: string;
};

const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    whileHover={{ scale: 1.015, boxShadow: '0 22px 32px -12px rgb(15 118 110 / 0.18)' }}
    transition={{ type: 'spring', stiffness: 360, damping: 22 }}
    className={`glass-card p-8 ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ children, icon }: { children: React.ReactNode; icon: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-14 flex items-center gap-4"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-teal-100 text-2xl shadow-sm">
      {icon}
    </div>
    <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">{children}</h2>
  </motion.div>
);

const RippleButton = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    className={`ripple rounded-2xl px-7 py-3 font-black transition-all ${className}`}
  >
    {children}
  </motion.button>
);

const baziGallery = [
  { src: baziChartImage, alt: 'Bazi Agent chart confirmation screen' },
  { src: baziQuestionOneImage, alt: 'Bazi Agent validation question one' },
  { src: baziQuestionTwoImage, alt: 'Bazi Agent validation question two' },
  { src: baziQuestionThreeImage, alt: 'Bazi Agent validation question three' },
  { src: baziReportImage, alt: 'Bazi Agent report screen' },
];

const viralgenGallery = [
  { src: viralgenInputImage, alt: 'ViralGen product input screen' },
  { src: viralgenProfileImage, alt: 'ViralGen product profile screen' },
  { src: viralgenPlanImage, alt: 'ViralGen marketing plan screen' },
  { src: viralgenVideoImage, alt: 'ViralGen video script screen' },
];

const restaurantGallery = [
  { src: restaurantProfileImage, alt: 'Chinese restaurant founder account profile' },
  { src: restaurantPostsOneImage, alt: 'Chinese restaurant founder account posts one' },
  { src: restaurantPostsTwoImage, alt: 'Chinese restaurant founder account posts two' },
  { src: restaurantPostsThreeImage, alt: 'Chinese restaurant founder account posts three' },
];

const menuGallery = [
  { src: menuHeroImage, alt: 'AI menu translation website hero screen' },
  { src: menuWorkflowImage, alt: 'AI menu translation workflow screen' },
  { src: menuResultInfoImage, alt: 'AI menu translation dish result screen' },
  { src: menuAllergenMarketingImage, alt: 'AI menu translation allergen and marketing screen' },
  { src: menuCopyOutputImage, alt: 'AI menu translation copy output screen' },
];

const content: Record<Language, Content> = {
  zh: {
    nav: { home: '首页', experience: '经历', projects: '作品', skills: '技能', education: '教育', contact: '联系' },
    hero: {
      hello: '你好，我是',
      name: '孙晓云',
      tagline: (
        <>
          英语专业八级（TEM-8） | <span className="text-teal-600">海外运营（SaaS方向）</span> | AI 产品实践者
        </>
      ),
      intro: [
        '英语专业毕业，TEM-8（专业八级）。',
        '拥有海外 SaaS 运营经验，长期负责海外客户沟通、需求反馈收集与业务支持工作。',
        '持续探索 AI 产品方向，独立完成多个 AI 项目原型，关注用户需求、产品价值与 AI 应用落地。',
        '熟练使用 Codex、Claude Code 等 AI 工具，致力于通过技术创造真实价值。',
      ],
      treat: '您辛苦了，喝杯奶茶',
    },
    mind: {
      eyebrow: '核心知识图谱',
      title: '探索我的思维图谱',
      subtitle: '比起告诉你我做过什么，我更希望展示我是如何思考的。',
      cards: [
        { title: '用户洞察', body: '从真实反馈、行为数据和内容互动中理解用户真正关心的问题。', tags: ['User Research', 'Feedback'] },
        { title: 'AI 工作流', body: '把复杂业务流程拆成可执行的 Agent、Skill 和 Workflow。', tags: ['Agent', 'Workflow'] },
        { title: '产品验证', body: '关注问题是否真实存在，以及方案是否能被用户验证。', tags: ['MVP', 'Validation'] },
        { title: '全球化视角', body: '长期关注北美餐饮、海外 SaaS、TikTok 生态与跨境电商。', tags: ['Global', 'SaaS'] },
      ],
    },
    experience: {
      title: '工作经历',
      role: '海外运营（SaaS方向）',
      company: '成都牙米科技',
      period: '2025.03 - 2026.06',
      desc: [
        '负责海外客户沟通、需求反馈收集与业务支持工作，长期服务北美餐饮行业客户。',
        '工作期间持续关注生成式 AI 发展，并主动探索 AI 在内容营销、市场研究与业务流程中的应用场景。',
      ],
      coreTitle: '核心工作',
      coreWork: [
        '与海外客户进行日常沟通，收集用户反馈与业务需求',
        '协助分析客户问题与使用场景，为产品优化提供参考',
        '研究 AI 工具在营销内容生成、市场信息收集等场景中的落地方式',
        '利用业余时间独立完成多个 AI 产品原型与自动化项目实践',
      ],
      gainsTitle: '主要收获',
      gains: [
        '长期接触真实用户需求，培养了从用户视角理解问题的习惯。',
        '在探索 AI 应用过程中，逐渐形成了从需求发现、方案设计到产品验证的思维方式，并最终确定向 AI 产品方向发展。',
      ],
    },
    projectsTitle: '项目作品',
    projects: [
      {
        title: 'ViralGen',
        subtitle: 'TikTok 香氛产品 AI 营销工作台',
        desc: [
          '研究美国香氛市场时发现，许多卖家缺少用户洞察与内容创意能力。',
          '基于 LLM、RAG 与多模态能力构建 AI 营销工作流，实现从产品分析到 TikTok 营销内容生成的自动化流程。',
        ],
        tags: ['AI Product', 'Agent Workflow', 'RAG', 'TikTok Marketing'],
        img: viralgenInputImage,
        gallery: viralgenGallery,
        sections: [
          { title: '项目背景', paragraphs: ['在研究 TikTok 香氛赛道时，我发现很多卖家的问题并不是不会写文案，而是不知道产品卖点、用户购买动机、不同国家用户关注点和内容组织方式。', '因此我开始思考，是否能够通过 AI 帮助卖家完成从产品分析到营销方案生成的完整流程。'] },
          { title: '关键挑战', paragraphs: ['输入越详细，结果越准确；输入越复杂，用户越容易放弃。产品需要在准确性和使用门槛之间找到平衡。', '1688 信息获取存在反爬限制，RAG 知识会过时，国内产品信息也不等于海外用户需求。'] },
          { title: '解决方案', paragraphs: ['以商品链接作为入口，通过 Skill 模块结构化提取产品名称、卖点、规格、图片和描述。', '设计香氛行业 RAG 知识库，并结合 Search API 获取实时趋势；引入亚马逊同类产品评论，反向提取真实购买原因。', '参考成熟视频生成 Agent 的脚本结构与分镜逻辑，通过 Codex 拆解重构后融入脚本生成模块。'] },
          { title: '技术实现', items: ['Python', 'Streamlit', 'Gemini', 'Tavily Search', 'RAG', 'Multimodal Recognition'] },
          { title: '项目收获', paragraphs: ['AI 产品最大的挑战并不是调用模型，而是把模糊需求拆解成一系列可验证的问题，然后逐个解决。'] },
        ],
      },
      {
        title: '八字命理 Agent',
        subtitle: '命理计算 × 用户验证系统',
        desc: ['发现不同大模型对同一命盘经常给出不同结论。', '尝试将命理计算与用户真实经历验证结合，提升产品可信度与交互体验。'],
        tags: ['AI Agent', 'Product Thinking', 'FastAPI', 'User Validation'],
        img: baziChartImage,
        gallery: baziGallery,
        sections: [
          { title: '项目背景', paragraphs: ['测试多个大模型后发现，对于同一个八字，GPT、DeepSeek、豆包等模型经常给出不同判断。传统命理产品也缺少验证机制。'] },
          { title: '我的思考', paragraphs: ['最开始我考虑过直接设计性格问卷，但这类问题高度依赖用户主观判断。', '于是我开始思考：过去真实发生的人生事件，是否比主观性格判断更可信？'] },
          { title: '解决方案', paragraphs: ['将验证机制从性格判断转向人生事件验证，设计流年锚点问答系统。', '通过用户回顾重要年份中的工作、感情、财富和人生转折事件，反向辅助判断喜忌。'] },
          { title: '技术实现', items: ['Python', 'FastAPI', '真太阳时换算', '四柱排盘', '城市经纬度数据库'] },
          { title: '我的收获', paragraphs: ['用户相信的不是算法本身，而是验证过程。产品价值不仅来自结果，也来自结果如何被验证。'] },
        ],
      },
      {
        title: '美国华人餐饮创业账号',
        subtitle: 'AI 驱动的内容增长实践',
        desc: ['围绕美国华人餐饮创业群体持续输出行业内容。', '利用 AI 辅助完成用户研究、选题验证与视频生成，实现 1500+ 精准粉丝增长。'],
        tags: ['Content Growth', 'User Research', 'AI Workflow', 'Market Validation'],
        img: restaurantProfileImage,
        gallery: restaurantGallery,
        sections: [
          { title: '项目背景', paragraphs: ['在美国外企 SaaS 工作期间，我发现公司官方账号增长速度较慢。于是我开始思考：如果我是美国华人餐厅老板，我真正愿意关注什么内容？'] },
          { title: '用户研究', paragraphs: ['利用 Google Deep Research 和 Reddit API 收集美国华人餐厅老板的真实讨论内容，分析经营难题、成本压力、员工管理、餐厅租约、创业经验和市场变化。', '随后用 Grok、Perplexity、Claude 交叉验证结论并要求提供信息来源，尽可能降低幻觉影响。'] },
          { title: '内容工作流', paragraphs: ['Gemini 负责选题生成和内容初稿，Claude 负责信息验证、内容优化和逻辑调整，AI 视频工具负责自动生成视频。'] },
          { title: '项目结果', items: ['1500+ 精准粉丝', '4400+ 点赞与收藏', '目标用户：美国华人餐饮创业群体'] },
          { title: '我的收获', paragraphs: ['增长的核心不是内容生产，而是理解用户。内容增长本质上也是一种用户研究。'] },
        ],
      },
      {
        title: '菜单过敏检查 Agent',
        subtitle: '面向北美华人餐饮场景的 AI 菜单助手',
        desc: ['帮助餐厅老板完成菜单翻译、过敏原识别与社交媒体营销文案生成。', '通过权威翻译知识库、过敏原知识库与大模型补充能力，降低菜单本地化和内容运营成本。'],
        tags: ['AI Agent', 'Food Safety', 'RAG', 'User Experience'],
        img: menuHeroImage,
        gallery: menuGallery,
        sections: [
          { title: '项目背景', paragraphs: ['北美华人餐厅老板不仅需要将菜单翻译成英文，还需要解决美国消费者能理解的表达、过敏原识别、社交媒体文案和菜品宣传标题。'] },
          { title: '菜单翻译', paragraphs: ['真正优秀的菜单翻译不是字面转换，而是在中国菜品文化和美国消费者理解习惯之间取得平衡。', '我将《中国菜标准翻译资料库》整理为 RAG 知识库，已收录菜品优先调用权威翻译，未收录菜品由大模型补充并用提示词约束风格。'] },
          { title: '过敏原识别', paragraphs: ['美国消费者对食品过敏高度敏感，因此我整理美国食品行业重点关注的过敏原资料，建立标准化知识库。'] },
          { title: '界面设计', paragraphs: ['中文模式采用双栏结构：左侧展示中文内容，右侧输出可直接复制到菜单、网站或社交媒体的英文内容；英文模式适用于海外团队协作。'] },
          { title: '覆盖内容', items: ['Menu Translation', 'Allergen Detection', 'TikTok Copy', 'Instagram Copy', 'Bilingual Output'] },
        ],
      },
    ],
    skills: {
      title: '专业技能',
      toolsTitle: '专业工具',
      softTitle: '能力方向',
      tools: ['Codex', 'Claude Code', 'Gemini', 'DeepSeek', 'Perplexity', 'Grok', 'Python', 'FastAPI', 'Streamlit', 'RAG'],
      soft: ['英语专业八级（TEM-8）', '跨文化沟通', '用户研究', '需求分析', 'AI 工作流设计', '内容增长', '市场研究', '产品验证'],
    },
    education: {
      title: '教育背景',
      school: '成都外国语学院',
      major: '翻译专业 · 本科（25 届）',
      note: '秉持“好奇心与共情力驱动创造力”的跨界理念。',
    },
    contact: {
      title: '关于与联系',
      tagTitle: '个性标签',
      tags: ['AI Product', 'Vibe Coding', 'User Research', 'Global SaaS', 'Content Growth'],
      heading: '向我打招呼',
      body: '我目前正在寻找 AI 产品方向的新机会。如果你有任何有趣的项目、岗位或合作想法，欢迎随时联系我。',
      button: '发送邮件给我',
    },
    modal: { details: '查看详情', closeProject: '关闭项目详情', closeImage: '关闭图片预览' },
    footer: '© 2026 孙晓云. 保持清透，保持热爱。',
  },
  en: {
    nav: { home: 'Home', experience: 'Experience', projects: 'Projects', skills: 'Skills', education: 'Education', contact: 'Contact' },
    hero: {
      hello: 'Hi, I am',
      name: 'Sun Xiaoyun',
      tagline: (
        <>
          TEM-8 English Major | <span className="text-teal-600">Overseas SaaS Operations</span> | AI Product Builder
        </>
      ),
      intro: [
        'English major with TEM-8 certification.',
        'Experienced in overseas SaaS operations, customer communication, requirements feedback, and business support for North American restaurant clients.',
        'Built multiple AI product prototypes independently, with a focus on user needs, product value, and practical AI implementation.',
        'Comfortable using Codex, Claude Code, and modern AI tools to turn product ideas into working prototypes.',
      ],
      treat: 'You worked hard. Have a milk tea.',
    },
    mind: {
      eyebrow: 'Core Thinking Map',
      title: 'How I Think About Products',
      subtitle: 'Rather than only listing what I have done, I want to show how I translate real needs into AI products.',
      cards: [
        { title: 'User Insight', body: 'I look for real needs through feedback, behavior, content data, and repeated user signals.', tags: ['Research', 'Signals'] },
        { title: 'AI Workflow', body: 'I break complex business processes into executable agents, skills, and workflows.', tags: ['Agent', 'Automation'] },
        { title: 'Product Validation', body: 'I care whether the problem truly exists and whether a solution can be verified by users.', tags: ['MVP', 'Validation'] },
        { title: 'Global Perspective', body: 'I follow North American restaurants, overseas SaaS, TikTok ecosystems, and cross-border commerce.', tags: ['Global', 'SaaS'] },
      ],
    },
    experience: {
      title: 'Work Experience',
      role: 'Overseas Operations (SaaS)',
      company: 'Chengdu Yami Technology',
      period: '2025.03 - 2026.06',
      desc: [
        'Handled overseas customer communication, requirements feedback collection, and business support for North American restaurant clients.',
        'During this role, I actively explored how generative AI could be applied to content marketing, market research, and business workflows.',
      ],
      coreTitle: 'Core Responsibilities',
      coreWork: [
        'Communicated with overseas customers and collected user feedback and business requirements.',
        'Helped analyze customer problems and usage scenarios to support product improvement.',
        'Researched practical applications of AI tools in marketing content generation and market information collection.',
        'Independently built several AI product prototypes and automation projects outside regular work.',
      ],
      gainsTitle: 'Key Takeaways',
      gains: [
        'Working closely with real users trained me to understand problems from the user perspective.',
        'Exploring AI applications helped me form a product thinking process from need discovery to solution design and validation.',
      ],
    },
    projectsTitle: 'Projects',
    projects: [
      {
        title: 'ViralGen',
        subtitle: 'AI Marketing Workbench for TikTok Fragrance Products',
        desc: [
          'While researching the U.S. fragrance market, I found that many sellers lacked user insight and content ideation capabilities.',
          'I built an AI marketing workflow based on LLMs, RAG, and multimodal analysis to automate the process from product analysis to TikTok marketing content generation.',
        ],
        tags: ['AI Product', 'Agent Workflow', 'RAG', 'TikTok Marketing'],
        img: viralgenInputImage,
        gallery: viralgenGallery,
        sections: [
          { title: 'Background', paragraphs: ['In the TikTok fragrance niche, the core problem was not copywriting itself. Sellers often did not know what the product selling points were, why users would buy, what different countries cared about, or how to structure marketing content.'] },
          { title: 'Key Challenges', paragraphs: ['More input improves accuracy, but more input also increases friction. 1688 product data was difficult to access reliably, RAG knowledge could become outdated, and domestic product information did not equal overseas user needs.'] },
          { title: 'Solution', paragraphs: ['I used product links as the entry point, introduced a skill module to extract structured product information, built a fragrance RAG knowledge base, connected search APIs for real-time trends, and analyzed Amazon reviews to identify real purchase motivations.'] },
          { title: 'Tech Stack', items: ['Python', 'Streamlit', 'Gemini', 'Tavily Search', 'RAG', 'Multimodal Recognition'] },
          { title: 'Takeaway', paragraphs: ['The hardest part of AI products is not calling the model. It is breaking fuzzy needs into verifiable problems and solving them one by one.'] },
        ],
      },
      {
        title: 'Bazi Agent',
        subtitle: 'Destiny Calculation with User Validation',
        desc: ['Different LLMs often gave different interpretations for the same chart.', 'I combined traditional calculation logic with user life-event validation to improve trust and interaction quality.'],
        tags: ['AI Agent', 'Product Thinking', 'FastAPI', 'User Validation'],
        img: baziChartImage,
        gallery: baziGallery,
        sections: [
          { title: 'Background', paragraphs: ['When testing multiple LLMs, I found that GPT, DeepSeek, and Doubao could produce different judgments for the same Bazi chart. Traditional fortune-telling products also lacked a validation mechanism.'] },
          { title: 'Product Thinking', paragraphs: ['I first considered personality questionnaires, but subjective questions depend heavily on self-perception. I then asked whether real life events could provide a more objective validation signal.'] },
          { title: 'Solution', paragraphs: ['I designed a year-anchor Q&A system. Users review important years and provide real events related to work, relationships, wealth, and major life transitions. The system uses these events to help validate favorable and unfavorable elements.'] },
          { title: 'Tech Stack', items: ['Python', 'FastAPI', 'True Solar Time', 'Four Pillars', 'City Coordinate Database'] },
          { title: 'Takeaway', paragraphs: ['Users do not simply trust algorithms. They trust a process that helps them verify the result.'] },
        ],
      },
      {
        title: 'Chinese Restaurant Founder Account',
        subtitle: 'AI-Driven Content Growth Practice',
        desc: ['I created content for Chinese restaurant founders in the U.S.', 'Using AI-assisted topic research, content validation, and video generation, the account grew to 1,500+ targeted followers.'],
        tags: ['Content Growth', 'User Research', 'AI Workflow', 'Market Validation'],
        img: restaurantProfileImage,
        gallery: restaurantGallery,
        sections: [
          { title: 'Background', paragraphs: ['While working at an overseas SaaS company, I noticed that the official account was growing slowly. I started asking what U.S.-based Chinese restaurant owners would actually want to follow.'] },
          { title: 'User Research', paragraphs: ['I used Google Deep Research and Reddit API to collect real discussions from restaurant owners, then analyzed operating challenges, cost pressure, employee management, leases, startup experience, and market changes. I cross-checked findings with Grok, Perplexity, and Claude.'] },
          { title: 'AI Workflow', paragraphs: ['Gemini generated topics and first drafts. Claude verified information and improved logic. AI video tools helped generate videos at lower production cost.'] },
          { title: 'Results', items: ['1,500+ targeted followers', '4,400+ likes and saves', 'Target users: Chinese restaurant founders in the U.S.'] },
          { title: 'Takeaway', paragraphs: ['Growth is not just content production. It is user research expressed through clicks, likes, saves, and comments.'] },
        ],
      },
      {
        title: 'Menu Allergy Check Agent',
        subtitle: 'AI Menu Assistant for Chinese Restaurants in North America',
        desc: ['A menu assistant that helps restaurant owners translate dishes, detect allergens, and generate marketing copy.', 'It combines authoritative translation references, an allergen knowledge base, and LLM generation to reduce localization and operation costs.'],
        tags: ['AI Agent', 'Food Safety', 'RAG', 'User Experience'],
        img: menuHeroImage,
        gallery: menuGallery,
        sections: [
          { title: 'Background', paragraphs: ['Chinese restaurant owners in North America need more than English translation. They also need menu expressions that U.S. customers understand, allergen detection, social media copy, and dish promotion titles.'] },
          { title: 'Translation Strategy', paragraphs: ['Good menu translation is not literal conversion. It balances Chinese food culture with U.S. customer understanding. I organized authoritative Chinese dish translation materials into a RAG knowledge base and used LLMs to supplement missing dishes under controlled prompts.'] },
          { title: 'Allergen Detection', paragraphs: ['Because U.S. consumers are highly sensitive to food allergies, I built a standardized allergen knowledge base covering milk, eggs, fish, shellfish, peanuts, tree nuts, wheat, soy, sesame, and related risks.'] },
          { title: 'Interface Design', paragraphs: ['The Chinese mode uses a dual-column interface: Chinese content for owner understanding and English output for direct copying into menus, websites, or social media. The English mode supports collaboration with overseas teams.'] },
          { title: 'Coverage', items: ['Menu Translation', 'Allergen Detection', 'TikTok Copy', 'Instagram Copy', 'Bilingual Output'] },
        ],
      },
    ],
    skills: {
      title: 'Skills',
      toolsTitle: 'Tools',
      softTitle: 'Strengths',
      tools: ['Codex', 'Claude Code', 'Gemini', 'DeepSeek', 'Perplexity', 'Grok', 'Python', 'FastAPI', 'Streamlit', 'RAG'],
      soft: ['TEM-8 English', 'Cross-cultural Communication', 'User Research', 'Requirement Analysis', 'AI Workflow Design', 'Content Growth', 'Market Research', 'Product Validation'],
    },
    education: {
      title: 'Education',
      school: 'Chengdu Institute of Foreign Languages',
      major: 'B.A. in Translation · Class of 2025',
      note: 'I believe curiosity and empathy are the foundation of creative product thinking.',
    },
    contact: {
      title: 'About & Contact',
      tagTitle: 'Personal Tags',
      tags: ['AI Product', 'Vibe Coding', 'User Research', 'Global SaaS', 'Content Growth'],
      heading: 'Say Hello',
      body: 'I am currently looking for opportunities in AI product management. If you have an interesting role, project, or collaboration idea, feel free to reach out.',
      button: 'Email Me',
    },
    modal: { details: 'View Details', closeProject: 'Close project details', closeImage: 'Close image preview' },
    footer: '© 2026 Sun Xiaoyun. Stay curious, stay warm.',
  },
};

export default function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTreatActive, setIsTreatActive] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const current = content[language];
  const selectedProject = selectedProjectIndex === null ? null : current.projects[selectedProjectIndex];
  const emailAddress = 'sunxiaoyun333@gmail.com';
  const emailSubject = language === 'zh' ? '来自个人简历网站的联系' : 'Hello from your resume website';
  const emailBody = language === 'zh'
    ? '你好，孙晓云：\n\n我从你的个人简历网站看到你的信息，想和你聊聊：\n\n'
    : 'Hi Xiaoyun,\n\nI found your resume website and would like to talk about:\n\n';
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      for (const section of ['home', 'experience', 'projects', 'skills', 'education', 'contact']) {
        const element = document.getElementById(section);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) setActiveTab(section);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSelectedProjectIndex(null);
    setSelectedImage(null);
  }, [language]);

  const navItems = [
    { id: 'home', icon: <User size={18} /> },
    { id: 'experience', icon: <Briefcase size={18} /> },
    { id: 'projects', icon: <Code size={18} /> },
    { id: 'skills', icon: <Award size={18} /> },
    { id: 'education', icon: <GraduationCap size={18} /> },
    { id: 'contact', icon: <Mail size={18} /> },
  ];

  return (
    <div className="relative min-h-screen font-sans text-slate-800">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="blob bg-teal-200 w-[500px] h-[500px] top-[-10%] left-[-10%] animation-delay-2000" />
        <div className="blob bg-orange-200 w-[500px] h-[500px] bottom-[-10%] right-[-10%] animation-delay-4000" />
        <div className="blob bg-cyan-200 w-[400px] h-[400px] top-[20%] right-[10%] animation-delay-1000" />
        <div className="blob bg-emerald-100 w-[300px] h-[300px] bottom-[20%] left-[10%] animation-delay-3000" />
        <div className="absolute inset-0 sunlight-pattern opacity-50" />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-teal-400 origin-left z-[60]" style={{ scaleX }} />

      <nav className="fixed top-6 left-0 right-0 z-50 px-4 transition-all duration-500">
        <div className="mx-auto max-w-6xl">
          <div className={`nav-glass flex items-center justify-between gap-4 px-5 py-3 transition-all duration-500 ${isScrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
            <div className="ml-2 text-3xl font-black tracking-tighter text-teal-600">LX.</div>
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`relative rounded-2xl px-4 py-3 text-sm font-black transition-all duration-300 lg:px-5 ${
                    activeTab === item.id ? 'text-teal-700' : 'text-slate-500 hover:text-teal-600'
                  }`}
                >
                  {activeTab === item.id && (
                    <motion.div layoutId="nav-active" className="absolute inset-0 -z-10 rounded-2xl bg-teal-100/50" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                  )}
                  {current.nav[item.id]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3 py-2 text-sm font-black text-teal-700 shadow-sm"
              >
                <Languages size={17} />
                {language === 'zh' ? 'EN' : '中文'}
              </button>
              <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/sunxiaoyun333-cpu/resumee" className="p-2 text-slate-500 transition-colors hover:text-teal-600"><Github size={22} /></motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-2 text-slate-500 transition-colors hover:text-teal-600"><Linkedin size={22} /></motion.a>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-40 pb-20">
        <section id="home" className="mb-40 flex min-h-[80vh] flex-col items-center justify-between gap-12 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="mb-8 font-black leading-[0.9] tracking-tighter text-slate-900">
                <span className="mb-4 block text-3xl opacity-80 sm:text-4xl md:text-5xl">{current.hero.hello}</span>
                <span className="bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 bg-clip-text text-6xl text-transparent sm:text-7xl md:text-8xl">{current.hero.name}</span>
              </h1>
              <p className="mb-10 text-2xl font-bold leading-tight tracking-tight text-slate-700 md:text-3xl">{current.hero.tagline}</p>
              <div className="mb-12 max-w-2xl space-y-4 text-base font-bold leading-relaxed text-slate-500 md:text-lg">
                {current.hero.intro.map((item) => <p key={item}>{item}</p>)}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.85, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, type: 'spring' }} className="relative">
            <div className="absolute -inset-4 rounded-full border-4 border-emerald-400/40" />
            <div className="absolute inset-0 rounded-full bg-emerald-300/30 blur-3xl" />
            <motion.button
              type="button"
              aria-label={current.hero.treat}
              onClick={() => {
                setIsTreatActive(true);
                window.setTimeout(() => setIsTreatActive(false), 4500);
              }}
              whileTap={{ scale: 0.96 }}
              className="relative z-10 h-64 w-64 cursor-pointer overflow-hidden rounded-full border-8 border-white/80 bg-transparent p-0 shadow-2xl md:h-80 md:w-80"
            >
              <img src={isTreatActive ? smilePhoto : profilePhoto} alt="Sun Xiaoyun" className="h-full w-full bg-teal-50 object-cover" />
            </motion.button>
            <AnimatePresence>
              {isTreatActive && (
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.9 }}
                  animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.94 }}
                  className="absolute -top-20 left-1/2 z-30 w-64 -translate-x-1/2 rounded-[1.75rem] border border-white/60 bg-teal-500/75 px-6 py-4 text-center shadow-2xl shadow-teal-300/30 backdrop-blur-xl"
                >
                  <p className="text-sm font-black leading-relaxed text-emerald-50 md:text-base">{current.hero.treat}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -right-4 -top-4 z-20 rounded-2xl border border-white bg-white/80 p-4 shadow-xl backdrop-blur-md">
              <Sun className="text-orange-400" size={32} />
            </motion.div>
          </motion.div>
        </section>

        <KnowledgeGraph />

        <section id="experience" className="mb-40 scroll-mt-32">
          <SectionHeading icon="☀️">{current.experience.title}</SectionHeading>
          <div className="relative border-l-4 border-teal-100 pl-8">
            <div className="absolute -left-[14px] top-0 h-6 w-6 rounded-full border-4 border-teal-400 bg-white shadow-lg shadow-teal-200" />
            <GlassCard>
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{current.experience.role}</h3>
                  <p className="text-lg font-bold text-teal-600">{current.experience.company}</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-teal-50 px-4 py-2 text-sm font-black text-teal-700">
                  <Calendar size={16} /> {current.experience.period}
                </div>
              </div>
              <div className="mb-8 space-y-4">
                {current.experience.desc.map((item) => <p key={item} className="text-lg font-bold leading-relaxed text-slate-600">{item}</p>)}
              </div>
              <div className="mb-8">
                <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-teal-500">{current.experience.coreTitle}</p>
                <ul className="space-y-4">
                  {current.experience.coreWork.map((item) => <li key={item} className="flex gap-4 font-bold leading-relaxed text-slate-600"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-400" />{item}</li>)}
                </ul>
              </div>
              <div>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-teal-500">{current.experience.gainsTitle}</p>
                <ul className="space-y-4">
                  {current.experience.gains.map((item) => <li key={item} className="flex gap-4 font-bold leading-relaxed text-slate-600"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-400" />{item}</li>)}
                </ul>
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="projects" className="mb-40 scroll-mt-32">
          <SectionHeading icon="🍋">{current.projectsTitle}</SectionHeading>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
            {current.projects.map((project, index) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <GlassCard className="flex h-full flex-col overflow-hidden p-0">
                  <div className="relative h-56 overflow-hidden">
                    <img src={project.img} alt={project.title} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity hover:opacity-100">
                      <RippleButton onClick={() => setSelectedProjectIndex(index)} className="bg-white/90 text-teal-600 backdrop-blur-sm">{current.modal.details}</RippleButton>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="mb-4 text-2xl font-black text-slate-900">{project.title}</h3>
                    <p className="mb-4 text-sm font-black uppercase tracking-[0.14em] text-teal-500">{project.subtitle}</p>
                    <div className="mb-8 space-y-3 font-bold leading-relaxed text-slate-600">
                      {project.desc.map((item) => <p key={item}>{item}</p>)}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-3">
                      {project.tags.map((tag) => <span key={tag} className="rounded-full border border-white bg-white/60 px-4 py-1.5 text-xs font-black text-teal-700 shadow-sm">{tag}</span>)}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="mb-40 scroll-mt-32">
          <SectionHeading icon="🌿">{current.skills.title}</SectionHeading>
          <div className="grid gap-10 lg:grid-cols-2">
            <GlassCard>
              <h3 className="mb-6 text-2xl font-black text-slate-900">{current.skills.toolsTitle}</h3>
              <div className="flex flex-wrap gap-3">
                {current.skills.tools.map((item) => <span key={item} className="rounded-xl bg-white/70 px-4 py-2 text-sm font-black text-teal-700 shadow-sm">{item}</span>)}
              </div>
            </GlassCard>
            <GlassCard>
              <h3 className="mb-6 text-2xl font-black text-slate-900">{current.skills.softTitle}</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {current.skills.soft.map((item) => <div key={item} className="rounded-xl border border-white/70 bg-white/50 px-4 py-3 font-black text-slate-700">{item}</div>)}
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="education" className="mb-40 scroll-mt-32">
          <SectionHeading icon="🎓">{current.education.title}</SectionHeading>
          <GlassCard className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h3 className="mb-2 text-3xl font-black text-slate-900">{current.education.school}</h3>
              <p className="text-xl font-bold text-teal-600">{current.education.major}</p>
              <p className="mt-3 font-bold text-slate-500">{current.education.note}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['TEM-8', 'TEM-4', 'CET-6'].map((cert) => <span key={cert} className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">{cert}</span>)}
            </div>
          </GlassCard>
        </section>

        <section id="contact" className="mb-20 scroll-mt-32">
          <SectionHeading icon="☀️">{current.contact.title}</SectionHeading>
          <div className="grid gap-10 lg:grid-cols-3">
            <GlassCard>
              <h3 className="mb-8 text-2xl font-black text-slate-900">{current.contact.tagTitle}</h3>
              <div className="flex flex-wrap gap-3">
                {current.contact.tags.map((tag) => <span key={tag} className="rounded-full border border-white bg-white/80 px-4 py-2 text-sm font-bold shadow-sm">{tag}</span>)}
              </div>
            </GlassCard>
            <GlassCard className="lg:col-span-2">
              <h3 className="mb-6 text-3xl font-black text-slate-900">{current.contact.heading}</h3>
              <p className="mb-8 text-lg font-bold leading-relaxed text-slate-500">{current.contact.body}</p>
              <RippleButton onClick={() => { window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer'); }} className="bg-teal-500 text-white shadow-2xl shadow-teal-200">
                {current.contact.button}
              </RippleButton>
              <a href={gmailComposeUrl} target="_blank" rel="noreferrer" className="mt-5 block font-bold tracking-wide text-slate-400 transition-colors hover:text-teal-600">
                {emailAddress}
              </a>
            </GlassCard>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-8 border-t border-slate-200/50 pt-20 font-bold text-slate-400 md:flex-row">
          <p>{current.footer}</p>
          <div className="flex items-center gap-8">
            <div className="flex cursor-pointer items-center gap-2 transition-colors hover:text-teal-500"><Coffee size={18} /> Coffee</div>
            <div className="flex cursor-pointer items-center gap-2 transition-colors hover:text-rose-400"><Heart size={18} /> Open to Collaboration</div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 px-4 py-8 backdrop-blur-md" onClick={() => setSelectedProjectIndex(null)}>
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }} className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl shadow-teal-950/20 backdrop-blur-2xl md:p-8" onClick={(event) => event.stopPropagation()}>
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-teal-500">{selectedProject.subtitle}</p>
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">{selectedProject.title}</h3>
                </div>
                <button type="button" onClick={() => setSelectedProjectIndex(null)} className="shrink-0 rounded-2xl border border-white/70 bg-white/80 p-3 text-slate-500 shadow-sm transition-colors hover:text-teal-600" aria-label={current.modal.closeProject}>
                  <X size={22} />
                </button>
              </div>

              <div className="mb-8 grid gap-4 md:grid-cols-2">
                {selectedProject.gallery.map((image, index) => (
                  <figure key={image.src} className={`${index === selectedProject.gallery.length - 1 && selectedProject.gallery.length % 2 === 1 ? 'md:col-span-2' : ''} overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-sm`}>
                    <button type="button" onClick={() => setSelectedImage(image)} className="block w-full cursor-zoom-in text-left">
                      <img src={image.src} alt={image.alt} className="h-56 w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02] md:h-64" />
                    </button>
                  </figure>
                ))}
              </div>

              <div className="mb-8 flex flex-wrap gap-3">
                {selectedProject.tags.map((tag) => <span key={tag} className="rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-xs font-black text-teal-700">{tag}</span>)}
              </div>

              <div className="space-y-5">
                {selectedProject.sections.map((section) => (
                  <section key={section.title} className="rounded-2xl border border-white/70 bg-white/65 p-5 shadow-sm">
                    <h4 className="mb-3 text-lg font-black text-slate-900">{section.title}</h4>
                    {section.paragraphs && <div className="space-y-3">{section.paragraphs.map((paragraph) => <p key={paragraph} className="text-base font-bold leading-relaxed text-slate-600">{paragraph}</p>)}</div>}
                    {section.items && <ul className="flex flex-wrap gap-2">{section.items.map((item) => <li key={item} className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">{item}</li>)}</ul>}
                  </section>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }} className="relative max-h-[92vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
              <button type="button" onClick={() => setSelectedImage(null)} className="absolute right-3 top-3 z-10 rounded-2xl border border-white/20 bg-slate-950/55 p-3 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-slate-900" aria-label={current.modal.closeImage}>
                <X size={22} />
              </button>
              <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[92vh] w-full rounded-3xl object-contain shadow-2xl shadow-black/30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolled && (
          <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-10 right-10 z-[60] flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white/80 text-teal-500 shadow-xl backdrop-blur-md transition-colors hover:text-teal-600">
            <ChevronRight className="-rotate-90" size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
