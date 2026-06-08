import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
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
  User, 
  Briefcase, 
  Code, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  Download, 
  ExternalLink,
  ChevronRight,
  Heart,
  Coffee,
  MapPin,
  Calendar,
  Award,
  ArrowRight,
  Sun,
  Zap,
  X,
} from 'lucide-react';

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className={`glass-card p-8 ${className}`}
  >
    {children}
  </motion.div>
);

const RippleButton = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`ripple px-8 py-4 rounded-2xl font-bold transition-all ${className}`}
  >
    {children}
  </motion.button>
);

const MilkTeaHands = () => (
  <svg viewBox="0 0 220 170" className="h-full w-full drop-shadow-xl" aria-hidden="true">
    <motion.path
      d="M39 113 C24 101, 18 83, 28 73 C38 63, 52 78, 64 94 L84 119 C68 126, 51 123, 39 113 Z"
      fill="#F7C8A5"
      stroke="#E7A77D"
      strokeWidth="4"
      initial={{ rotate: -8, x: -8 }}
      animate={{ rotate: [-8, -2, -8], x: [-8, -3, -8] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M181 113 C196 101, 202 83, 192 73 C182 63, 168 78, 156 94 L136 119 C152 126, 169 123, 181 113 Z"
      fill="#F7C8A5"
      stroke="#E7A77D"
      strokeWidth="4"
      initial={{ rotate: 8, x: 8 }}
      animate={{ rotate: [8, 2, 8], x: [8, 3, 8] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.g
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M77 49 H143 L136 143 H84 Z" fill="#F6D4A4" stroke="#B98558" strokeWidth="5" />
      <path d="M82 70 H138 L134 133 H86 Z" fill="#D7A56C" opacity="0.72" />
      <path d="M74 43 H146" stroke="#7BCFC1" strokeWidth="10" strokeLinecap="round" />
      <path d="M104 44 C102 25, 114 21, 128 14" fill="none" stroke="#7BCFC1" strokeWidth="6" strokeLinecap="round" />
      <circle cx="98" cy="111" r="5" fill="#7A4A2A" opacity="0.7" />
      <circle cx="118" cy="125" r="5" fill="#7A4A2A" opacity="0.7" />
      <circle cx="126" cy="102" r="4" fill="#7A4A2A" opacity="0.65" />
      <path d="M91 86 C105 94, 122 94, 133 86" fill="none" stroke="#FFF7EA" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
    </motion.g>
  </svg>
);

const SectionHeading = ({ children, icon }: { children: React.ReactNode; icon?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-4 mb-16"
  >
    <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-white/50">
      {icon}
    </div>
    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
      {children}
    </h2>
  </motion.div>
);

const CursorFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-teal-400/20 rounded-full pointer-events-none z-[100] blur-sm hidden md:block"
      animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
      transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
    />
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTreatActive, setIsTreatActive] = useState(false);
  const treatTimerRef = React.useRef<number | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'experience', 'projects', 'skills', 'education', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveTab(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (treatTimerRef.current) {
        window.clearTimeout(treatTimerRef.current);
      }
    };
  }, []);

  const handleAvatarClick = () => {
    if (treatTimerRef.current) {
      window.clearTimeout(treatTimerRef.current);
    }
    setIsTreatActive(true);
    treatTimerRef.current = window.setTimeout(() => {
      setIsTreatActive(false);
      treatTimerRef.current = null;
    }, 5000);
  };

  const navItems = [
    { id: 'home', label: '首页', icon: <User size={18} /> },
    { id: 'experience', label: '经历', icon: <Briefcase size={18} /> },
    { id: 'projects', label: '作品', icon: <Code size={18} /> },
    { id: 'skills', label: '技能', icon: <Award size={18} /> },
    { id: 'education', label: '教育', icon: <GraduationCap size={18} /> },
    { id: 'contact', label: '联系', icon: <Mail size={18} /> },
  ];

  const projects = [
    {
      title: "ViralGen",
      subtitle: "TikTok香氛产品AI营销工作台",
      desc: [
        "研究美国香氛市场时发现，许多卖家缺少用户洞察与内容创意能力。",
        "基于 LLM、RAG 与多模态能力构建 AI 营销工作流，实现从产品分析到 TikTok 营销内容生成的自动化流程。"
      ],
      tags: ["AI Product", "Agent Workflow", "RAG", "TikTok Marketing"],
      img: viralgenInputImage,
      gallery: [
        { src: viralgenInputImage, alt: "ViralGen 产品输入界面" },
        { src: viralgenProfileImage, alt: "ViralGen 产品档案界面" },
        { src: viralgenPlanImage, alt: "ViralGen 营销方案界面" },
        { src: viralgenVideoImage, alt: "ViralGen 视频脚本界面" }
      ],
      sections: [
        {
          title: "项目背景",
          paragraphs: [
            "在研究 TikTok 香氛赛道时，我发现大部分卖家面临的问题并不是不会写文案，而是不知道产品卖点是什么、用户为什么购买、不同国家用户关注什么、应该如何组织营销内容。",
            "因此我开始思考，是否能够通过 AI 帮助卖家完成从产品分析到营销方案生成的完整流程。"
          ]
        },
        {
          title: "遇到的第一个问题：用户应该上传什么信息？",
          paragraphs: [
            "最开始我考虑过让用户上传产品图片、输入产品信息、输入产品配料和产品卖点。",
            "但很快发现一个矛盾：输入越详细，结果越准确；输入越复杂，用户越容易放弃。",
            "产品需要在准确性和使用门槛之间找到平衡。"
          ]
        },
        {
          title: "我的思考：降低输入成本",
          paragraphs: [
            "我开始研究跨境卖家的真实工作流程，发现大部分中国卖家的产品源头都来自 1688。",
            "因此我提出一个假设：如果用户直接上传产品链接，系统是否可以自动完成后续分析？",
            "这样既减少输入成本，又保留产品信息完整度。"
          ]
        },
        {
          title: "遇到的第二个问题：1688信息获取失败",
          paragraphs: [
            "确定使用 1688 链接作为入口后，新的问题出现了。",
            "由于 1688 存在较强的反爬机制，无论是手机端还是 PC 端链接，都很难直接获取完整产品信息。"
          ]
        },
        {
          title: "我的解决方案：结构化提取商品信息",
          paragraphs: [
            "研究多个方案后，最终引入开源 Skill 能力模块。",
            "通过 Skill 自动提取产品名称、产品卖点、产品规格、产品图片和产品描述，成功完成商品信息结构化。"
          ]
        },
        {
          title: "遇到的第三个问题：不同国家需要不同营销策略",
          paragraphs: [
            "产品卖点并不等于用户痛点。同一款香薰，美国用户可能关注减压、助眠和居家氛围，而其他国家用户可能更关注礼品属性、空间除味和情绪价值。",
            "如果直接让大模型生成，结果很容易不稳定。"
          ]
        },
        {
          title: "我的解决方案：香氛行业 RAG 知识库",
          paragraphs: [
            "我设计了香氛行业 RAG 知识库，将用户痛点、购买动机、使用场景和营销角度结构化存储。",
            "生成时优先调用知识库，提高输出一致性和行业相关性。"
          ]
        },
        {
          title: "遇到的第四个问题：RAG知识会过时",
          paragraphs: [
            "知识库虽然稳定，但市场变化很快。TikTok 热点、用户关注点、爆款产品都在持续变化。",
            "我意识到稳定性和实时性都重要，不能只依赖其中一种。"
          ]
        },
        {
          title: "我的解决方案：双层知识体系",
          paragraphs: [
            "我设计了双层知识体系：第一层是 RAG 知识库，负责稳定输出；第二层是 Search API，负责实时搜索最新市场信息。",
            "这样可以实现长期知识与实时趋势的结合。"
          ]
        },
        {
          title: "遇到的第五个问题：国内产品信息不等于海外用户需求",
          paragraphs: [
            "即使获得了 1688 产品数据，依然存在一个问题：卖家视角不等于用户视角。",
            "1688 可以告诉我们产品是什么，却无法告诉我们用户为什么买。"
          ]
        },
        {
          title: "我的解决方案：引入亚马逊评论分析",
          paragraphs: [
            "我引入亚马逊同类产品评论，重点分析五星好评、高频关键词和用户反馈，提取真实购买原因。",
            "再利用海外用户真实评价反向生成卖点、营销角度和广告文案。"
          ]
        },
        {
          title: "遇到的第六个问题：如何生成专业的视频脚本？",
          paragraphs: [
            "我并不是导演，也不具备专业广告分镜能力。如果直接让模型生成，视频内容往往缺乏专业感。",
            "我的思考是：与其自己从零设计，不如学习成熟方案。"
          ]
        },
        {
          title: "我的解决方案：拆解成熟视频 Agent",
          paragraphs: [
            "我研究 GitHub 上的视频生成 Agent 项目，分析其脚本结构、镜头设计、情绪节奏和分镜逻辑。",
            "然后将其中适合营销场景的部分提取出来，通过 Codex 拆解和重构，最终融入 ViralGen 的脚本生成模块。"
          ]
        },
        {
          title: "技术实现",
          items: ["Python", "Streamlit", "Gemini", "Tavily Search", "RAG知识库", "多模态图片识别"]
        },
        {
          title: "项目收获",
          paragraphs: [
            "这个项目让我意识到，AI 产品最大的挑战并不是调用模型。",
            "而是如何把模糊需求拆解成一系列可验证的问题，然后逐个解决。"
          ]
        }
      ]
    },
    {
      title: "八字命理 Agent",
      subtitle: "命理计算 × 用户验证系统",
      desc: [
        "发现不同大模型对同一命盘经常给出不同结论。",
        "尝试将命理计算与用户真实经历验证结合，提升产品可信度与交互体验。"
      ],
      tags: ["AI Agent", "Product Thinking", "FastAPI", "User Validation"],
      img: baziChartImage,
      gallery: [
        { src: baziChartImage, alt: "八字命理 Agent 排盘确认界面" },
        { src: baziQuestionOneImage, alt: "八字命理 Agent 流年锚点问答第一题" },
        { src: baziQuestionTwoImage, alt: "八字命理 Agent 流年锚点问答第二题" },
        { src: baziQuestionThreeImage, alt: "八字命理 Agent 流年锚点问答第三题" },
        { src: baziReportImage, alt: "八字命理 Agent 综合报告界面" }
      ],
      sections: [
        {
          title: "项目背景",
          body: "测试多个大模型后发现，对于同一个八字，GPT、DeepSeek、豆包等模型经常给出不同判断。"
        },
        {
          title: "发现的问题",
          body: "传统命理产品存在两个问题：排盘不够准确，缺少验证机制。用户很难判断结果是否可信。"
        },
        {
          title: "我的思考",
          paragraphs: [
            "最开始我考虑过直接设计问卷，例如：你是否觉得自己性格外向？你是否容易冲动？你是否喜欢稳定？",
            "但很快发现一个问题：这些问题高度依赖用户主观判断，不同的人对于同一个问题可能会有完全不同的理解。",
            "因此，主观问题的可信度较低，也成为产品设计里的一个难点。",
            "于是我开始思考：有没有一种更加客观的验证方式？如果一个人的性格会受到主观认知影响，那么过去真实发生的人生事件是否更加可信？"
          ]
        },
        {
          title: "解决方案",
          paragraphs: [
            "最终我将验证机制从性格判断转向人生事件验证，设计流年锚点问答系统。",
            "通过用户回顾过去重要年份，收集真实人生事件，例如哪一年运势明显变好、哪一年工作出现变化、哪一年感情出现变化、哪一年发生重大转折。",
            "再通过关键年份的事件反馈，反向辅助判断喜忌。"
          ]
        },
        {
          title: "为什么这样设计",
          paragraphs: [
            "相比“你是否性格外向？”这样的主观问题，用户更容易确认 2022 年换工作、2023 年升职、2024 年搬家这类客观事实。",
            "因此我希望利用大运流年与真实事件进行双重验证，让用户不是被动接受结论，而是参与到验证过程中。"
          ]
        },
        {
          title: "技术实现",
          items: ["Python", "FastAPI", "真太阳时换算", "四柱排盘", "中国城市经纬度数据库"]
        },
        {
          title: "我的收获",
          paragraphs: [
            "这个项目让我意识到，很多时候用户相信的不是算法，而是验证过程。",
            "相比直接给出结论，让用户参与验证过程，往往更容易建立信任。",
            "产品价值不仅来自结果本身，也来自结果是如何被验证出来的。"
          ]
        }
      ]
    },
    {
      title: "美国华人餐饮创业账号",
      subtitle: "AI驱动的内容增长实践",
      desc: [
        "在美国外企 SaaS 工作期间，发现官方账号增长速度较慢，于是从美国华人餐厅老板的真实关注点出发重新设计内容方向。",
        "利用 AI 辅助完成用户研究、选题验证与视频生成，形成低成本、可复制、可持续的内容增长流程。"
      ],
      tags: ["Content Growth", "User Research", "AI Workflow", "Market Validation"],
      img: restaurantProfileImage,
      gallery: [
        { src: restaurantProfileImage, alt: "美国华人餐饮创业账号主页与增长数据" },
        { src: restaurantPostsOneImage, alt: "美国华人餐饮创业账号内容列表一" },
        { src: restaurantPostsTwoImage, alt: "美国华人餐饮创业账号内容列表二" },
        { src: restaurantPostsThreeImage, alt: "美国华人餐饮创业账号内容列表三" }
      ],
      sections: [
        {
          title: "项目背景",
          paragraphs: [
            "在美国外企 SaaS 工作期间，我发现公司官方账号增长速度较慢。",
            "虽然持续输出内容，但始终难以吸引目标用户关注。",
            "于是我开始思考：如果我是美国华人餐厅老板，我真正愿意关注什么内容？而这些内容是否能够与公司业务建立联系？"
          ]
        },
        {
          title: "遇到的问题",
          paragraphs: [
            "最初的问题并不是如何制作视频，而是美国华人餐厅老板真正关心什么。",
            "如果选题错误，即使制作再多内容也无法获得关注。",
            "因此我决定先研究用户，而不是直接生产内容。"
          ]
        },
        {
          title: "我的思考",
          paragraphs: [
            "我希望找到真实用户正在讨论的问题，而不是依靠主观猜测。",
            "于是我开始尝试从搜索引擎和社区中寻找答案。"
          ]
        },
        {
          title: "用户研究过程",
          paragraphs: [
            "利用 Google Deep Research 和 Reddit API，收集美国华人餐厅老板的真实讨论内容。",
            "重点分析经营难题、成本压力、员工管理、餐厅租约、创业经验和市场变化。",
            "随后利用 Grok、Perplexity 和 Claude 进行交叉验证，要求模型给出结论的同时提供具体信息来源，尽可能降低幻觉带来的影响。"
          ]
        },
        {
          title: "发现的规律",
          paragraphs: [
            "在大量内容分析后，我发现餐厅老板最关注的并不是营销技巧。",
            "他们更关注如何开店、如何避坑、如何控制成本、如何签租约、如何经营餐厅。",
            "这些内容天然具有传播性，同时又能够与公司的业务场景形成关联。"
          ]
        },
        {
          title: "第二个问题",
          paragraphs: [
            "确定选题方向后，新的问题出现了。",
            "我不希望真人出镜、复杂拍摄或大量剪辑，因为内容生产成本过高。"
          ]
        },
        {
          title: "我的解决方案",
          paragraphs: [
            "我开始研究 AI 内容生产工具，目标是建立一套低成本、可复制、可持续的内容生产流程。"
          ]
        },
        {
          title: "最终 SOP",
          paragraphs: [
            "经过多轮尝试后，形成了选题研究、内容验证、视频生成的自动化内容生产链路。",
            "Gemini 负责选题生成和内容初稿。",
            "Claude 负责信息验证、内容优化和逻辑调整。",
            "AI 视频工具负责自动生成视频，降低制作成本。"
          ]
        },
        {
          title: "项目结果",
          paragraphs: [
            "累计获得 1500+ 精准粉丝，4400+ 点赞与收藏。",
            "目标用户主要为美国华人餐饮创业群体。"
          ]
        },
        {
          title: "我的收获",
          paragraphs: [
            "这个项目让我意识到，增长的核心并不是内容生产，而是理解用户。",
            "很多时候，用户不会直接告诉你需求，但会通过点击、点赞、收藏、评论表达自己的兴趣和关注点。",
            "因此，内容增长本质上也是一种用户研究。"
          ]
        }
      ]
    },
    {
      title: "菜单过敏检查 Agent",
      subtitle: "面向北美华人餐饮场景的 AI 菜单助手",
      desc: [
        "面向北美华人餐饮场景，帮助餐厅老板完成菜单翻译、过敏原识别与社交媒体营销文案生成。",
        "通过权威翻译知识库、过敏原知识库与大模型补充能力，降低菜单本地化和内容运营成本。"
      ],
      tags: ["AI Agent", "Food Safety", "Multimodal", "User Experience"],
      img: menuHeroImage,
      gallery: [
        { src: menuHeroImage, alt: "菜单翻译工具首页输入界面" },
        { src: menuWorkflowImage, alt: "菜单翻译工具功能与流程介绍" },
        { src: menuResultInfoImage, alt: "菜单翻译工具菜品信息输出" },
        { src: menuAllergenMarketingImage, alt: "菜单翻译工具过敏原与营销文案输出" },
        { src: menuCopyOutputImage, alt: "菜单翻译工具中英文营销文案输出" }
      ],
      sections: [
        {
          title: "项目背景",
          paragraphs: [
            "在接触北美餐饮行业客户时，我发现许多华人餐厅老板面临一个共同问题。",
            "他们不仅需要将菜单翻译成英文，还需要同时解决美国消费者能够理解的菜单表达、过敏原识别、社交媒体营销文案和菜品宣传标题。",
            "这些工作通常依赖经验丰富的运营人员完成。因此我开始思考：是否可以通过 AI 将这一流程自动化。"
          ]
        },
        {
          title: "遇到的第一个问题：什么样的翻译才算地道？",
          paragraphs: [
            "最开始我尝试直接使用大模型翻译菜单，但很快发现一个问题：大模型能够完成翻译，却不一定能够保证翻译符合美国餐饮行业的实际表达习惯。",
            "于是我开始思考：什么样的翻译才能被称为地道的翻译？"
          ]
        },
        {
          title: "我的思考：菜单翻译不是字面转换",
          paragraphs: [
            "我认为，真正优秀的菜单翻译，不是字面意义上的中英文转换。",
            "而是在中国菜品文化和美国消费者理解习惯之间取得平衡。",
            "因此，我希望找到经过专业研究和长期验证的权威资料作为基础。"
          ]
        },
        {
          title: "我的解决方案：双层翻译体系",
          paragraphs: [
            "调研过程中，我发现中国翻译专业机构整理过《中国菜标准翻译资料库》。选择它有两个原因：准确性和权威性。",
            "相比纯模型生成结果，它更适合作为标准参考。",
            "最终，我将相关菜品翻译资料整理为 RAG 知识库。当知识库存在对应菜品时，优先调用权威翻译结果。",
            "对于未收录菜品，调用大模型进行补充翻译，并通过预设提示词约束输出风格，实现权威知识与模型补充的双层翻译体系。"
          ]
        },
        {
          title: "遇到的第二个问题：如何识别美国市场关注的过敏原？",
          paragraphs: [
            "美国消费者对于食品过敏问题高度敏感。如果遗漏相关信息，可能直接影响用户体验。",
            "相比开放式推理，过敏原识别更适合采用标准化知识体系，因为过敏原种类相对固定，不需要模型自由发挥。"
          ]
        },
        {
          title: "我的解决方案：过敏原知识库",
          paragraphs: [
            "我整理美国食品行业重点关注的过敏原资料，建立过敏原知识库。",
            "覆盖 Milk、Egg、Fish、Shellfish、Peanut、Tree Nut、Wheat、Soy、Sesame 等常见风险原料。",
            "利用 RAG 检索进行识别与提示，提升结果稳定性。"
          ]
        },
        {
          title: "遇到的第三个问题：如何生成符合美国市场的营销文案？",
          paragraphs: [
            "很多华人餐厅老板习惯从原料、做法和工艺介绍菜品。",
            "但美国消费者更容易被场景、体验和情绪价值打动。",
            "营销文案不应该仅描述菜品，而应该帮助用户理解为什么值得尝试这道菜。"
          ]
        },
        {
          title: "我的解决方案：从产品视角转向用户视角",
          paragraphs: [
            "结合菜品信息、翻译结果和美国市场表达习惯，自动生成菜品卖点、社交媒体标题、TikTok 文案和 Instagram 文案。",
            "帮助餐厅老板从产品视角转向用户视角。"
          ]
        },
        {
          title: "遇到的第四个问题：如何设计适合华人老板使用的界面？",
          paragraphs: [
            "功能逐渐增加后，我发现另一个问题：很多餐厅老板并不熟悉复杂软件。",
            "如果界面过于技术化，学习成本会很高。",
            "目标用户真正需要的不是更多功能，而是更容易理解、更容易复制、更容易直接使用。"
          ]
        },
        {
          title: "我的解决方案：中英双语工作界面",
          paragraphs: [
            "我设计了中英双语工作界面。",
            "中文模式采用双栏结构：左侧展示全部中文内容，方便老板理解；右侧标题为中文，具体内容直接输出英文，方便复制到菜单、网站或社交媒体。",
            "英文模式则全部内容采用英文输出，适用于直接面向海外团队协作场景。"
          ]
        }
      ]
    }
  ];

  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const selectedProject = selectedProjectIndex === null ? null : projects[selectedProjectIndex];
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="relative min-h-screen font-sans text-slate-800">
      <CursorFollower />
      {/* Background Magic */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="blob bg-teal-200 w-[500px] h-[500px] top-[-10%] left-[-10%] animation-delay-2000" />
        <div className="blob bg-orange-200 w-[500px] h-[500px] bottom-[-10%] right-[-10%] animation-delay-4000" />
        <div className="blob bg-cyan-200 w-[400px] h-[400px] top-[20%] right-[10%] animation-delay-1000" />
        <div className="blob bg-emerald-100 w-[300px] h-[300px] bottom-[20%] left-[10%] animation-delay-3000" />
        <div className="absolute inset-0 sunlight-pattern opacity-50" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] text-4xl opacity-20"
        >
          🍋
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] right-[5%] text-4xl opacity-20"
        >
          🌿
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] left-[20%] text-4xl opacity-20"
        >
          ☀️
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-teal-400 origin-left z-[60]" style={{ scaleX }} />

      {/* Navigation */}
      <nav className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 px-4`}>
        <div className="max-w-5xl mx-auto">
          <div className={`nav-glass px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
            <div className="text-3xl font-black text-teal-600 tracking-tighter ml-2">LX.</div>
            <div className="hidden md:flex items-center gap-2 relative">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`relative px-6 py-3 rounded-2xl text-base font-black transition-all duration-300 ${
                    activeTab === item.id ? 'text-teal-700' : 'text-slate-500 hover:text-teal-600'
                  }`}
                >
                  {activeTab === item.id && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-teal-100/50 rounded-2xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="flex items-center gap-2">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-2.5 text-slate-500 hover:text-teal-600 transition-colors"><Github size={23} /></motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-2.5 text-slate-500 hover:text-teal-600 transition-colors"><Linkedin size={23} /></motion.a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-20">
        
        {/* Hero Section */}
        <section id="home" className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12 mb-40">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter">
                <span className="text-3xl sm:text-4xl md:text-5xl block mb-4 opacity-80">你好，我是</span>
                <span className="text-6xl sm:text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500">孙晓云</span> 👋
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-slate-700 mb-10 tracking-tight leading-tight">
                英语专业八级（TEM-8） | <span className="text-teal-600">美国外企 SaaS 运营经验</span> | AI 产品实践者
              </p>
              <p className="text-base md:text-lg text-slate-500 max-w-2xl mb-12 leading-relaxed space-y-4">
                <span className="block">
                  英语专业毕业，TEM-8（专业八级）。
                </span>
                <span className="block">
                  拥有美国外企 SaaS 运营经验，长期负责海外客户沟通与需求反馈工作。
                </span>
                <span className="block">
                  持续探索 AI 产品方向，独立完成多个 AI 项目实践，关注用户需求、产品价值与 AI 应用落地。
                </span>
                <span className="block">
                  熟练使用 <span className="text-teal-600 font-bold">Codex</span>、<span className="text-teal-600 font-bold">Claude Code</span> 等 AI 工具，致力于通过技术创造真实价值。
                </span>
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
          >
            {/* Green Glow Ring */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 border-4 border-emerald-400/40 rounded-full z-0" 
            />
            <motion.div 
              animate={{ scale: [1.1, 1.2, 1.1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -inset-8 border-2 border-emerald-300/20 rounded-full z-0" 
            />
            
            {/* Ripple Glow Effect */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-emerald-300/30 rounded-full blur-3xl" 
            />
            <motion.div 
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute inset-0 bg-orange-200/30 rounded-full blur-3xl" 
            />
            <motion.button
              type="button"
              aria-label="点击头像领取奶茶问候"
              onClick={handleAvatarClick}
              whileTap={{ scale: 0.96 }}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-white/80 shadow-2xl overflow-hidden relative z-10 cursor-pointer bg-transparent p-0"
            >
              <img 
                src={isTreatActive ? smilePhoto : profilePhoto} 
                alt="Avatar" 
                className="w-full h-full object-cover bg-teal-50"
                referrerPolicy="no-referrer"
              />
            </motion.button>
            <AnimatePresence>
              {isTreatActive && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.9 }}
                    animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.94 }}
                    transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.25 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
                    className="absolute -top-20 left-1/2 z-30 w-64 -translate-x-1/2 rounded-[1.75rem] border border-white/60 bg-teal-500/75 px-6 py-4 text-center shadow-2xl shadow-teal-300/30 backdrop-blur-xl md:-top-24"
                  >
                    <div className="absolute -bottom-2 left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 border-b border-r border-white/60 bg-teal-500/75" />
                    <p className="relative text-sm font-black leading-relaxed text-emerald-50 md:text-base">
                      您辛苦了，喝杯奶茶
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.78, rotate: -6 }}
                    animate={{ opacity: 1, y: [0, -5, 0], scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, y: 18, scale: 0.82 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute -bottom-16 left-1/2 z-30 h-36 w-48 -translate-x-1/2 rounded-full bg-white/20 p-2 backdrop-blur-[1px] md:-bottom-14 md:h-40 md:w-56"
                  >
                    <MilkTeaHands />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl z-20 border border-white"
            >
              <Sun className="text-orange-400" size={32} />
            </motion.div>
          </motion.div>
        </section>

        <KnowledgeGraph />

        {/* Experience Section */}
        <section id="experience" className="mb-40 scroll-mt-32">
          <SectionHeading icon="☀️">工作经历</SectionHeading>
          
          <div className="relative pl-8 border-l-4 border-teal-100 space-y-16">
            {[
              {
                company: "成都牙米科技",
                role: "海外运营（SaaS方向）",
                period: "2025.03 - 2026.06",
                desc: [
                  "负责海外客户沟通、需求反馈收集与业务支持工作，长期服务北美餐饮行业客户。",
                  "工作期间持续关注生成式 AI 发展，并主动探索 AI 在内容营销、市场研究与业务流程中的应用场景。"
                ],
                coreWork: [
                  "与海外客户进行日常沟通，收集用户反馈与业务需求",
                  "协助分析客户问题与使用场景，为产品优化提供参考",
                  "研究 AI 工具在营销内容生成、市场信息收集等场景中的落地方式",
                  "利用业余时间独立完成多个 AI 产品原型与自动化项目实践"
                ],
                gains: [
                  "长期接触真实用户需求，培养了从用户视角理解问题的习惯。",
                  "在探索 AI 应用过程中，逐渐形成了从需求发现、方案设计到产品验证的思维方式，并最终确定向 AI 产品方向发展。"
                ]
              }
            ].map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Bubble Node */}
                <div className="absolute -left-[42px] top-0 w-6 h-6 bg-white border-4 border-teal-400 rounded-full shadow-lg shadow-teal-200" />
                
                <GlassCard className="hover:border-teal-300 transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-teal-100/50 transition-colors" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{exp.role}</h3>
                      <p className="text-teal-600 font-bold text-lg">{exp.company}</p>
                    </div>
                    <div className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2">
                      <Calendar size={16} /> {exp.period}
                    </div>
                  </div>
                  <div className="mb-8 space-y-4">
                    {exp.desc.map((item) => (
                      <p key={item} className="text-slate-600 leading-relaxed text-lg font-bold">{item}</p>
                    ))}
                  </div>

                  <div className="mb-8">
                    <p className="mb-4 text-sm font-black tracking-[0.16em] uppercase text-teal-500">核心工作</p>
                    <ul className="space-y-4">
                      {exp.coreWork.map((item) => (
                        <li key={item} className="flex items-start gap-4 text-slate-600 leading-relaxed font-bold">
                          <div className="w-2 h-2 bg-teal-400 rounded-full mt-3 shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-black tracking-[0.16em] uppercase text-teal-500">主要收获</p>
                    <ul className="space-y-4">
                      {exp.gains.map((item) => (
                        <li key={item} className="flex items-start gap-4 text-slate-600 leading-relaxed font-bold">
                        <div className="w-2 h-2 bg-teal-400 rounded-full mt-3 shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                        <span className="text-lg">{item}</span>
                      </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-40 scroll-mt-32">
          <SectionHeading icon="🍋">项目作品</SectionHeading>
          
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-0 overflow-hidden group h-full flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <RippleButton onClick={() => setSelectedProjectIndex(index)} className="bg-white/90 text-teal-600 backdrop-blur-sm px-6 py-2">
                        查看详情
                      </RippleButton>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{project.title}</h3>
                    <p className="mb-4 text-sm font-black tracking-[0.14em] uppercase text-teal-500">{project.subtitle}</p>
                    <div className="text-slate-600 mb-8 leading-relaxed space-y-3 font-bold">
                      {project.desc.map((item) => (
                        <p key={item} className="line-clamp-3">{item}</p>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-white/50 border border-white text-teal-700 text-xs font-black rounded-full shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-40 scroll-mt-32">
          <SectionHeading icon="🌿">专业技能</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <GlassCard>
              <div className="flex items-center gap-3 mb-8">
                <Zap className="text-teal-500" />
                <h3 className="text-2xl font-black text-slate-900">专业工具 (Pro Tools)</h3>
              </div>
              <div className="flex flex-wrap gap-6">
                {[
                  { name: "Cursor (Vibe Coding)", level: 95 },
                  { name: "Claude 3.5", level: 98 },
                  { name: "Gemini (AI Studio)", level: 92 },
                  { name: "Arena.ai", level: 85 },
                  { name: "DeepSeek", level: 88 },
                  { name: "Coze (Agentic)", level: 90 }
                ].map((skill, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-teal-50/50" />
                        <motion.circle 
                          cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" 
                          strokeDasharray={251.2}
                          initial={{ strokeDashoffset: 251.2 }}
                          whileInView={{ strokeDashoffset: 251.2 - (251.2 * skill.level) / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="text-teal-500"
                        />
                      </svg>
                      <span className="absolute text-sm font-black text-slate-700">{skill.level}%</span>
                    </div>
                    <span className="font-bold text-slate-600 text-center text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard>
              <div className="flex items-center gap-3 mb-8">
                <Heart className="text-orange-400" />
                <h3 className="text-2xl font-black text-slate-900">软技能与语言</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "英语专业八级 (TEM-8)", icon: "🎓", delay: 0 },
                  { name: "跨文化商业谈判", icon: "🤝", delay: 0.1 },
                  { name: "痛点挖掘", icon: "🔍", delay: 0.2 },
                  { name: "RAG & Function Calling", icon: "⚙️", delay: 0.3 }
                ].map((skill, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: skill.delay, type: "spring" }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(255,255,255,0.8)",
                      boxShadow: "0 10px 30px -10px rgba(20, 184, 166, 0.3)"
                    }}
                    className="p-6 bg-white/40 rounded-2xl border border-white/60 flex items-center gap-4 shadow-sm group transition-all"
                  >
                    <span className="text-3xl group-hover:rotate-12 transition-transform">{skill.icon}</span>
                    <span className="font-black text-slate-700">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-40 scroll-mt-32">
          <SectionHeading icon="🎓">教育背景</SectionHeading>
          
          <GlassCard className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 bg-teal-100 rounded-3xl flex items-center justify-center text-5xl">
                🏫
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">成都外国语学院</h3>
                <p className="text-xl text-teal-600 font-bold">翻译专业 · 本科 (25 届)</p>
                <p className="text-slate-500 mt-2 font-medium">秉持“好奇心与共情力驱动创造力”的跨界理念。</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="bg-white/80 px-6 py-3 rounded-2xl shadow-sm border border-white mb-3">
                <span className="text-slate-500 font-bold">2021 - 2025</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                {["TEM-8", "TEM-4", "CET-6"].map(cert => (
                  <span key={cert} className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black border border-emerald-100">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* About & Contact Section */}
        <section id="contact" className="mb-20 scroll-mt-32">
          <SectionHeading icon="☀️">关于与联系</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <GlassCard className="lg:col-span-1">
              <h3 className="text-2xl font-black text-slate-900 mb-8">个性标签</h3>
              <div className="flex flex-wrap gap-4">
                {["AI Native 🚀", "重度 Vibe Coder 💻", "英语大拿 🎓", "咖啡探索者 ☕", "猫奴 🐈"].map(tag => (
                  <span key={tag} className="px-5 py-2 bg-white/80 rounded-full text-sm font-bold shadow-sm border border-white">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="lg:col-span-2">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-black text-slate-900 mb-6">向我打招呼 👋</h3>
                  <p className="text-slate-500 mb-10 leading-relaxed text-lg">
                    我目前正在寻找新的机会。如果你有任何有趣的项目或想法，欢迎随时联系我！让我们一起通过 AI 创造清透且有生命力的数字产品。
                  </p>
                  
                  <div className="flex gap-6">
                    <motion.a 
                      whileHover={{ y: -8, scale: 1.1 }} 
                      href="https://github.com" 
                      target="_blank"
                      className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-teal-500 border border-white hover:shadow-teal-200/50 transition-all"
                    >
                      <Github size={32} />
                    </motion.a>
                    <motion.a 
                      whileHover={{ y: -8, scale: 1.1 }} 
                      href="https://linkedin.com" 
                      target="_blank"
                      className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-teal-600 border border-white hover:shadow-teal-200/50 transition-all"
                    >
                      <Linkedin size={32} />
                    </motion.a>
                    <motion.a 
                      whileHover={{ y: -8, scale: 1.1 }} 
                      href="mailto:sunxiaoyun333@gmail.com" 
                      className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-orange-400 border border-white hover:shadow-orange-200/50 transition-all"
                    >
                      <Mail size={32} />
                    </motion.a>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <RippleButton 
                    onClick={() => window.location.href = 'mailto:sunxiaoyun333@gmail.com'}
                    className="bg-teal-500 text-white shadow-2xl shadow-teal-200 py-6 text-xl mb-6"
                  >
                    发送邮件给我 🍋
                  </RippleButton>
                  <p className="text-center text-slate-400 font-bold tracking-wider">sunxiaoyun333@gmail.com</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 px-4 py-8 backdrop-blur-md"
            onClick={() => setSelectedProjectIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl shadow-teal-950/20 backdrop-blur-2xl md:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-3 text-sm font-black tracking-[0.16em] uppercase text-teal-500">{selectedProject.subtitle}</p>
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">{selectedProject.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProjectIndex(null)}
                  className="shrink-0 rounded-2xl border border-white/70 bg-white/80 p-3 text-slate-500 shadow-sm transition-colors hover:text-teal-600"
                  aria-label="关闭项目详情"
                >
                  <X size={22} />
                </button>
              </div>

              {selectedProject.gallery ? (
                <div className="mb-8 grid gap-4 md:grid-cols-2">
                  {selectedProject.gallery.map((image, index) => (
                    <figure
                      key={image.src}
                      className={`${index === 4 ? 'md:col-span-2' : ''} overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-sm`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className="block w-full cursor-zoom-in text-left"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-56 w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02] md:h-64"
                        />
                      </button>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setSelectedImage({ src: selectedProject.img, alt: selectedProject.title })}
                    className="block w-full cursor-zoom-in text-left"
                  >
                    <img src={selectedProject.img} alt={selectedProject.title} className="h-64 w-full object-cover transition-transform duration-500 hover:scale-[1.02]" />
                  </button>
                </div>
              )}

              <div className="mb-8 flex flex-wrap gap-3">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-xs font-black text-teal-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-5">
                {selectedProject.sections.map((section) => (
                  <section key={section.title} className="rounded-2xl border border-white/70 bg-white/65 p-5 shadow-sm">
                    <h4 className="mb-3 text-lg font-black text-slate-900">{section.title}</h4>
                    {section.body && <p className="text-base font-bold leading-relaxed text-slate-600">{section.body}</p>}
                    {section.paragraphs && (
                      <div className="space-y-3">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-base font-bold leading-relaxed text-slate-600">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                    {section.items && (
                      <ul className="flex flex-wrap gap-2">
                        {section.items.map((item) => (
                          <li key={item} className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative max-h-[92vh] w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 z-10 rounded-2xl border border-white/20 bg-slate-950/55 p-3 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-slate-900"
                aria-label="关闭图片预览"
              >
                <X size={22} />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[92vh] w-full rounded-3xl object-contain shadow-2xl shadow-black/30"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 z-[60] w-14 h-14 bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-xl flex items-center justify-center text-teal-500 hover:text-teal-600 transition-colors"
          >
            <ChevronRight className="-rotate-90" size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="pt-20 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 font-bold">
          <p>© 2026 孙晓云. 保持清透，保持热爱。🌿</p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 hover:text-teal-500 transition-colors cursor-pointer"><Coffee size={18} /> 请我喝咖啡</div>
            <div className="flex items-center gap-2 hover:text-rose-400 transition-colors cursor-pointer"><Heart size={18} /> 开放合作</div>
          </div>
        </footer>

      </main>
    </div>
  );
}
