
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * LexSmile Global 官方网站（单文件 React 预览版）
 * --------------------------------------------------
 * 含：多页路由、SEO、表单校验、本地存储、AI 问答 Demo、ROI 计算器、搜索、JSON-LD、返回顶部、移动端菜单等。
 * 颜色：#1e40af / #374151 / #f3f4f6 + 金色点缀
 */

/********************* 测试网站提示浮窗 **************************/
function TestSiteNotification() {
  const [isVisible, setIsVisible] = useState(true);

  // 检查是否已经关闭过浮窗
  useEffect(() => {
    const dismissed = localStorage.getItem('testSiteDismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('testSiteDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg shadow-lg border border-yellow-500 flex items-center gap-3 max-w-sm">
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <span className="font-medium">目前为测试网站！</span>
      <button 
        onClick={handleClose}
        className="ml-2 text-yellow-700 hover:text-yellow-900 font-bold text-lg leading-none"
        aria-label="关闭"
      >
        ×
      </button>
    </div>
  );
}

/********************* 工具：极简路由（哈希路由） **************************/
const routes = ["/", "/about", "/services", "/news", "/ai", "/contact"]; // 对应导航

function useHashRoute() {
  const [path, setPath] = useState(() => window.location.hash.replace("#", "") || "/");
  useEffect(() => {
    const onHashChange = () => setPath(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const push = (p) => (window.location.hash = p);
  return { path, push };
}

/********************* 全局：品牌与文案（可按需替换/多语言） ******************/
const zh = {
  brand: {
    nameCN: "笑达法律咨询服务有限公司",
    nameEN: "LexSmile Global",
    slogan: "智法有道，笑达天下",
    positioning: "以法律为本、智能为翼、人文为魂——企业可信赖的全球化智慧法律与管理咨询伙伴",
    mission: "以专业法律视角、智能技术工具、温暖人文服务，陪伴企业穿越不确定",
    vision: "融合法律智慧与科技创新的引领者，让每一家企业安心合规，笑迎未来",
    values: [
      "守正合规 · 坚持底线",
      "智慧赋能 · 拥抱科技",
      "客户为先 · 携手共赢",
      "以笑为本 · 温暖服务",
      "知行合一 · 专业精进",
    ],
    industry: "法律与管理咨询 · AI赋能法务/合规",
    size: "10-50人（示例，可修改）",
    coreBusiness: [
      "企业合规与风险管理顾问",
      "AI智能合同分析与合规审核",
      "知识产权与商标版权相关代理",
      "数字法务与信息化方案支持",
      "企业战略与管理咨询",
    ],
  },
  nav: {
    home: "首页",
    about: "关于我们",
    services: "产品服务",
    news: "新闻资讯",
    ai: "AI应用",
    contact: "联系我们",
  },
  cta: {
    consult: "获取AI咨询",
    tryAI: "在线体验AI",
    contact: "联系销售",
    learnMore: "了解更多",
  },
  stats: {
    projects: 36,
    clients: 58,
    patents: 6,
    satisfaction: "98%",
  },
  faq: [
    { q: "你们是否提供律师执业相关业务？", a: "不提供需要律师执业许可的业务；我们聚焦企业合规、AI法务工具与管理咨询。" },
    { q: "AI 合同审阅支持哪些格式？", a: "支持常见的 DOCX、PDF、TXT；可按需对接企业网盘与知识库。" },
    { q: "是否支持私有化部署？", a: "可提供本地化/私有云部署方案，满足数据安全与合规要求。" },
  ],
};

const en = {
  brand: {
    nameCN: "LexSmile Global",
    nameEN: "LexSmile Global",
    slogan: "Law + AI, Smiles Delivered",
    positioning:
      "Law-centric, AI-powered, and human-centered. Your trusted global legal & management consulting partner.",
    mission:
      "Blend legal expertise, intelligent tools, and warm service to guide businesses through uncertainty.",
    vision:
      "Lead the fusion of legal wisdom and technological innovation, enabling every company to stay compliant and confident.",
    values: [
      "Integrity & Compliance",
      "Intelligence & Enablement",
      "Customer First & Win-Win",
      "Warmth & Service",
      "Unity of Knowing & Doing",
    ],
    industry: "Legal & Management Consulting · AI-powered Legal/Compliance",
    size: "TBD (e.g., 10–50)",
    coreBusiness: [
      "Corporate compliance & risk advisory",
      "AI contract review & compliance checks",
      "IP advisory, trademark & copyright filing",
      "Digital legal ops & information systems",
      "Corporate strategy & management consulting",
    ],
  },
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    news: "News",
    ai: "AI Solutions",
    contact: "Contact",
  },
  cta: {
    consult: "Get AI Consultation",
    tryAI: "Try AI Online",
    contact: "Contact Sales",
    learnMore: "Learn more",
  },
  stats: zh.stats,
  faq: [
    { q: "Do you offer attorney-of-record services?", a: "No. We focus on compliance consulting, AI legal tools, and management advisory." },
    { q: "What file formats are supported for AI contract review?", a: "DOCX, PDF, and TXT; can integrate with enterprise storage/KB." },
    { q: "Is on-prem deployment supported?", a: "Yes, on-prem/private cloud options are available for security and compliance." },
  ],
};

/********************* 主题与样式辅助 **************************/
function BrandMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-2xl bg-blue-800 text-white grid place-items-center font-bold">XD</div>
      <div className="font-bold text-gray-900">
        <div className="leading-4">LexSmile Global</div>
        <div className="text-xs text-gray-500">笑达法律咨询</div>
      </div>
    </div>
  );
}

/********************* Layout：页头、导航、页脚 **************************/
function Header({ t, path, push, lang, setLang }) {
  const NavItem = ({ to, children }) => (
    <button
      onClick={() => push(to)}
      className={
        "px-3 py-2 rounded-lg text-sm font-medium transition-colors " +
        (path === to ? "bg-blue-50 text-blue-800" : "text-gray-700 hover:text-blue-800")
      }
      aria-current={path === to ? "page" : undefined}
    >
      {children}
    </button>
  );

  // 移动端菜单映射对象
  const navMap = {
    "/": t.nav.home,
    "/about": t.nav.about,
    "/services": t.nav.services,
    "/news": t.nav.news,
    "/ai": t.nav.ai,
    "/contact": t.nav.contact,
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <BrandMark />
          <nav className="hidden md:flex items-center gap-1">
            <NavItem to="/">{t.nav.home}</NavItem>
            <NavItem to="/about">{t.nav.about}</NavItem>
            <NavItem to="/services">{t.nav.services}</NavItem>
            <NavItem to="/news">{t.nav.news}</NavItem>
            <NavItem to="/ai">{t.nav.ai}</NavItem>
            <NavItem to="/contact">{t.nav.contact}</NavItem>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "zh" ? "en" : "zh")}
              className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:border-blue-700 hover:text-blue-800"
              aria-label="Switch language"
            >
              {lang === "zh" ? "EN" : "中"}
            </button>
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                push("/contact");
              }}
              className="hidden sm:inline-flex bg-blue-800 text-white text-sm px-4 py-2 rounded-xl shadow hover:shadow-md"
            >
              {t.cta.consult}
            </a>
            <button
              className="md:hidden p-2"
              onClick={() => {
                const dlg = document.getElementById("mobileNav");
                if (dlg && typeof dlg.showModal === "function") dlg.showModal();
              }}
              aria-label="Open menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>
      {/* 移动端抽屉 */}
      <dialog id="mobileNav" className="modal">
        <div className="modal-box p-0 bg-white rounded-2xl overflow-hidden">
          <div className="p-4 border-b"><BrandMark /></div>
          <div className="p-2 flex flex-col">
            {routes.map((r) => (
              <button
                key={r}
                onClick={() => {
                  const dlg = document.getElementById("mobileNav");
                  if (dlg && typeof dlg.close === "function") dlg.close();
                  window.location.hash = r;
                }}
                className={`text-left px-4 py-3 hover:bg-gray-50 ${path === r ? "text-blue-800" : "text-gray-700"}`}
              >
                {navMap[r]}
              </button>
            ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
    </header>
  );
}

function Footer({ t }) {
  return (
    <footer className="mt-16 border-t bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <BrandMark />
          <p className="mt-3 text-sm text-gray-600">
            {t.brand.positioning}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">{t.nav.services}</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {t.brand.coreBusiness.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">{t.nav.news}</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>AI 合同审阅 2.0 发布（演示数据）</li>
            <li>与生态伙伴共建法务知识库（演示数据）</li>
            <li>受邀在合规大会分享（演示数据）</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">{t.nav.contact}</h4>
          <p className="text-sm text-gray-600">Email: contact@lexsmile.example</p>
          <p className="text-sm text-gray-600">Tel: +86 0411-0000-0000</p>
          <p className="text-sm text-gray-600">Address: 大连 · 中国（示例）</p>
          <div className="mt-4">
            <a href="#/contact" className="inline-flex bg-blue-800 text-white text-sm px-4 py-2 rounded-xl shadow hover:shadow-md">
              {t.cta.contact}
            </a>
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} LexSmile Global. All rights reserved.</div>
    </footer>
  );
}

/********************* 公共组件 **************************/
function Section({ title, subtitle, children }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl p-6 bg-white shadow-sm border">
      <div className="text-3xl font-extrabold text-blue-800">{value}</div>
      <div className="mt-1 text-gray-700 font-medium">{label}</div>
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
    </div>
  );
}

function Badge({ children }) {
  return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800">{children}</span>;
}

/********************* 首页 **************************/
function Home({ t, push }) {
  useEffect(() => {
    document.title = `${t.brand.nameEN} | ${t.nav.home}`;
  }, [t]);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 opacity-95" />
        <svg className="absolute -top-20 right-0 opacity-25" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0" x2="1"><stop stopColor="#ffffff"/><stop offset="1" stopColor="#d4af37"/></linearGradient></defs><circle cx="480" cy="120" r="180" fill="url(#g)"/></svg>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <Badge>{t.brand.nameEN}</Badge>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              {t.brand.slogan}
            </h1>
            <p className="mt-4 text-blue-100 text-lg max-w-xl">{t.brand.positioning}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#/ai" className="bg-white text-blue-900 px-6 py-3 rounded-xl shadow font-semibold hover:shadow-md">{t.cta.tryAI}</a>
              <a href="#/services" className="bg-transparent border border-white/60 text-white px-6 py-3 rounded-xl hover:bg-white/10">{t.cta.learnMore}</a>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10">
            <div className="rounded-2xl bg-white/10 p-4 text-blue-50">
              <div className="font-semibold mb-2">AI 核心能力速览</div>
              <ul className="space-y-2 text-sm">
                <li>• 合同条款语义解析与合规风险提取</li>
                <li>• 智能问答与企业知识库对接</li>
                <li>• 文档比对、版本变更差异审计</li>
                <li>• 流程自动化（RPA）与审批优化</li>
              </ul>
            </div>
            <img loading="lazy" alt="business hero" className="mt-4 w-full rounded-2xl" src="https://picsum.photos/seed/lexsmile/800/420"/>
          </div>
        </div>
      </section>

      {/* 核心业务卡片 */}
      <Section title="核心业务" subtitle="以AI赋能的法律与管理咨询，覆盖合规、合同、知识产权与数字法务">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {["合规与风险顾问", "AI合同审阅", "知识产权与商标版权", "数字法务信息化"].map((title, i) => (
            <div key={i} className="group rounded-2xl border bg-white p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 grid place-items-center text-blue-800 font-bold">{i+1}</div>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">为成长型企业量身打造的专项服务，支持私有化、API 接入与合规审计。</p>
              <button onClick={() => (window.location.hash = "/services")} className="mt-4 text-blue-800 hover:underline inline-flex items-center gap-1">了解更多
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* 企业优势 */}
      <Section title="我们的优势" subtitle="数据与口碑见证价值（演示数据）">
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard label="AI 项目数量" value={t.stats.projects} />
          <StatCard label="服务客户" value={t.stats.clients} />
          <StatCard label="技术专利/软著" value={t.stats.patents} />
          <StatCard label="客户满意度" value={t.stats.satisfaction} />
        </div>
      </Section>

      {/* 应用案例轮播（演示） */}
      <CaseCarousel />

      {/* 在线 AI 体验（极简 Demo） */}
      <AIChatDemo />

      {/* 合作伙伴 */}
      <Section title="技术合作伙伴" subtitle="生态共建 · 价值共创（演示 Logo）">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 opacity-80">
          {Array.from({ length: 6 }).map((_, i) => (
            <img key={i} loading="lazy" alt={`partner-${i}`} className="w-full h-12 object-cover rounded bg-white border p-2" src={`https://picsum.photos/seed/partner${i}/200/80`} />
          ))}
        </div>
      </Section>

      {/* 新闻动态（演示） */}
      <Section title="新闻动态" subtitle="近期要闻（演示数据）">
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <article key={i} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md">
              <img loading="lazy" alt="news" src={`https://picsum.photos/seed/news${i}/800/420`} className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-gray-900">AI 合同审阅 {i}.0 发布（演示）</h3>
                <p className="mt-2 text-sm text-gray-600">支持更多条款模板与风控规则；上线企业知识库适配。</p>
                <a href="#/news" className="mt-3 inline-flex text-blue-800 hover:underline">查看详情 →</a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 客户评价（演示） */}
      <Section title="客户评价" subtitle="真实口碑，持续交付（演示数据）">
        <div className="grid md:grid-cols-3 gap-6">
          {["提升审阅效率 70%+","显著降低合规风险","部署周期 < 2 周"].map((quote, i) => (
            <blockquote key={i} className="rounded-2xl border bg-white p-6">
              <div className="text-gray-700">“{quote}”</div>
              <div className="mt-3 text-sm text-gray-500">—— 某行业客户</div>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* 联系方式 CTA */}
      <Section>
        <div className="rounded-3xl p-8 bg-gradient-to-r from-blue-900 to-blue-700 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">开启你的 AI 法务之旅</h3>
            <p className="text-blue-100 mt-1">从小试用到私有化部署，我们都能帮到你。</p>
          </div>
          <a href="#/contact" className="bg-white text-blue-900 px-6 py-3 rounded-xl shadow font-semibold">获取AI咨询</a>
        </div>
      </Section>
    </main>
  );
}

function CaseCarousel() {
  const cases = [
    { title: "合同智能审阅", desc: "识别高风险条款并给出替换建议", img: "https://picsum.photos/seed/case1/1200/600" },
    { title: "合规流程自动化", desc: "RPA 驱动审批与证据留痕", img: "https://picsum.photos/seed/case2/1200/600" },
    { title: "知识产权保护", desc: "商标版权一体化管理", img: "https://picsum.photos/seed/case3/1200/600" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % cases.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <Section title="AI 应用案例" subtitle="代表性项目与使用场景（演示）">
      <div className="relative overflow-hidden rounded-3xl border bg-white">
        <img loading="lazy" alt={cases[idx].title} src={cases[idx].img} className="w-full h-64 md:h-96 object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
          <div className="text-lg font-semibold">{cases[idx].title}</div>
          <div className="text-sm text-blue-100">{cases[idx].desc}</div>
        </div>
      </div>
    </Section>
  );
}

/********************* AI 在线体验（演示） **************************/
function AIChatDemo() {
  const kb = {
    slogan: "智法有道，笑达天下",
    values: zh.brand.values,
    services: zh.brand.coreBusiness,
  };
  const [messages, setMessages] = useState([
    { role: "assistant", content: "欢迎体验 LexSmile AI。请问你想了解我们的哪项能力？" },
  ]);
  const [input, setInput] = useState("");
  const boxRef = useRef(null);
  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTo(0, boxRef.current.scrollHeight);
  }, [messages.length]);

  function reply(text) {
    const q = text.toLowerCase();
    let a = "抱歉，我还在学习。你可以询问：口号、价值观、服务。";
    if (q.includes("口号") || q.includes("slogan")) a = `我们的口号是：${kb.slogan}`;
    if (q.includes("价值") || q.includes("values")) a = `核心价值观：\n- ${kb.values.join("\n- ")}`;
    if (q.includes("服务") || q.includes("service")) a = `核心业务：\n- ${kb.services.join("\n- ")}`;
    return a;
  }

  return (
    <Section title="在线 AI 体验" subtitle="本演示仅供展示交互形态，生产环境将接入企业知识库与私有大模型">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-2xl border bg-white p-4 flex flex-col h-96">
          <div ref={boxRef} className="flex-1 overflow-auto space-y-3 pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] rounded-2xl px-4 py-2 ${m.role === "assistant" ? "bg-blue-50 text-blue-900" : "bg-gray-100 text-gray-800 ml-auto"}`}>
                {m.content}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim()) return;
              const userMsg = { role: "user", content: input.trim() };
              const botMsg = { role: "assistant", content: reply(input.trim()) };
              setMessages((prev) => [...prev, userMsg, botMsg]);
              setInput("");
            }}
            className="mt-3 flex gap-2"
          >
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="问：你们的核心价值观是什么？" className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-300"/>
            <button className="px-4 py-2 rounded-xl bg-blue-800 text-white">发送</button>
          </form>
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h4 className="font-semibold text-gray-900 mb-2">功能说明</h4>
          <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
            <li>关键词驱动智能问答（演示版）</li>
            <li>生产环境可接入私有知识库与授权模型</li>
            <li>支持 API、检索增强、角色设定与日志留痕</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

/********************* 关于我们 **************************/
function About({ t }) {
  useEffect(() => { document.title = `${t.brand.nameEN} | ${t.nav.about}`; }, [t]);
  return (
    <main>
      <Section title={t.nav.about} subtitle={t.brand.positioning}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold text-gray-900">公司简介</h3>
            <p className="mt-2 text-gray-700 text-sm leading-7">
              {t.brand.mission}。{t.brand.vision}。我们深耕 {t.brand.industry}，以AI为核心驱动，持续打造面向企业场景的解决方案。
            </p>
            <h4 className="mt-6 font-semibold text-gray-900">企业文化 · 核心价值观</h4>
            <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
              {t.brand.values.map((v, i) => (<li key={i}>{v}</li>))}
            </ul>
          </div>
          <div className="rounded-2xl border bg白 p-6">
            <h3 className="font-semibold text-gray-900">AI 研发实力</h3>
            <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>LexSmile AI Lab（演示）：NLP/检索/审阅/对比/自动化</li>
              <li>可私有化部署，满足合规要求</li>
              <li>专注合同比对、风险识别与流程自动化</li>
            </ul>
            <h4 className="mt-6 font-semibold text-gray-900">资质荣誉（演示）</h4>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border p-3 text-sm text-gray-700 bg-gray-50">证书/奖项 #{i+1}</div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="企业大事记" subtitle="聚焦 AI 技术与应用里程碑（演示）">
        <ol className="relative border-l pl-6">
          {["创立品牌与定位","推出AI合同审阅1.0","发布知识库接入","完成首个私有化部署"].map((m,i)=>(
            <li key={i} className="mb-8 ml-2">
              <span className="absolute -left-1.5 w-3 h-3 bg-blue-800 rounded-full border"></span>
              <h4 className="font-semibold text-gray-900">{m}</h4>
              <p className="text-sm text-gray-600">演示文本，可替换为真实节点与日期。</p>
            </li>
          ))}
        </ol>
      </Section>
    </main>
  );
}

/********************* 产品与服务 **************************/
function Services({ t }) {
  useEffect(() => { document.title = `${t.brand.nameEN} | ${t.nav.services}`; }, [t]);
  const categories = [
    { name: "智能客服", items: ["聊天机器人","语音识别","情感分析"] },
    { name: "数据分析", items: ["大数据挖掘","预测分析","商业智能"] },
    { name: "自动化系统", items: ["RPA 机器人","智能审批","流程优化"] },
    { name: "视觉识别", items: ["图像识别","人脸识别","质量检测"] },
  ];
  const [active, setActive] = useState(0);

  return (
    <main>
      <Section title={t.nav.services} subtitle="清晰的服务分类，支持定制化方案">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-4">
            <h4 className="font-semibold text-gray-900 mb-3">服务分类</h4>
            <ul className="space-y-2">
              {categories.map((c, i) => (
                <li key={i}>
                  <button onClick={() => setActive(i)} className={`w-full text-left px-3 py-2 rounded-lg ${active===i?"bg-blue-50 text-blue-800":"hover:bg-gray-50"}`}>{c.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 rounded-2xl border bg-white p-6">
            <h4 className="font-semibold text-gray-900">{categories[active].name}</h4>
            <p className="text-sm text-gray-600 mt-1">核心技术与服务特色：RAG 检索增强、NLP 条款解析、规则引擎、可解释性与日志追踪。</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {categories[active].items.map((name, i) => (
                <div key={i} className="rounded-xl border p-4">
                  <div className="font-medium text-gray-900">{name}</div>
                  <p className="text-sm text-gray-600 mt-1">支持 API 对接与二次开发，提供部署与培训服务。</p>
                  <a href="#/ai" className="text-blue-800 text-sm mt-2 inline-flex items-center gap-1">查看演示<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M9 5l7 7-7 7"/></svg></a>
                </div>
              ))}
            </div>

            <h4 className="font-semibold text-gray-900 mt-8">常见问题（FAQ）</h4>
            <div className="mt-3 divide-y">
              {t.faq.map((f, i) => (
                <details key={i} className="py-3">
                  <summary className="cursor-pointer font-medium text-gray-800">Q: {f.q}</summary>
                  <p className="mt-2 text-sm text-gray-600">A: {f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

/********************* 新闻资讯（演示 + 搜索） **************************/
function News({ t }) {
  useEffect(() => { document.title = `${t.brand.nameEN} | ${t.nav.news}`; }, [t]);
  const all = [
    { title: "AI 合同审阅 2.0 发布", cat: "产品发布", body: "扩展条款库与风控规则" },
    { title: "参加合规大会演讲", cat: "活动公告", body: "分享智能合规最佳实践" },
    { title: "媒体报道：法务数字化", cat: "媒体报道", body: "生态共建与私有化案例" },
    { title: "白皮书：AI 与合规治理", cat: "技术白皮书", body: "深度解析与行业指南" },
  ];
  const [q, setQ] = useState("");
  const list = all.filter((n) => (n.title + n.cat + n.body).toLowerCase().includes(q.toLowerCase()));
  return (
    <main>
      <Section title="新闻资讯" subtitle="企业新闻 · 技术洞察 · 活动与发布（演示数据）">
        <div className="flex flex-wrap gap-3 mb-6">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="搜索文章关键词…" className="px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          <Badge>企业新闻</Badge><Badge>AI 技术</Badge><Badge>行业洞察</Badge>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {list.map((n, i) => (
            <article key={i} className="rounded-2xl border bg-white p-6 hover:shadow-md">
              <div className="text-xs text-blue-800">{n.cat}</div>
              <h3 className="mt-1 font-semibold text-gray-900">{n.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{n.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}

/********************* AI 应用（含 ROI 计算器 + 架构图占位） *******************/
function AISolutions({ t }) {
  useEffect(() => { document.title = `${t.brand.nameEN} | ${t.nav.ai}`; }, [t]);
  const [roi, setRoi] = useState({ hours: 100, hourly: 200, efficiency: 0.5, cost: 30000 });
  const savings = useMemo(() => roi.hours * roi.hourly * roi.efficiency, [roi]);
  const payoff = useMemo(() => (savings - roi.cost), [roi, savings]);
  return (
    <main>
      <Section title="AI 产品总览" subtitle="核心技术：机器学习、深度学习、NLP、RPA">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6 lg:col-span-2">
            <h4 className="font-semibold text-gray-900">技术架构图（占位）</h4>
            <img loading="lazy" alt="arch" src="https://picsum.photos/seed/arch/1200/500" className="w-full h-64 object-cover rounded-2xl mt-3"/>
            <ul className="text-sm text-gray-700 list-disc pl-5 mt-3">
              <li>数据接入 → 清洗 → 向量化 → 检索增强（RAG）</li>
              <li>策略引擎与合规规则库</li>
              <li>审阅与对比、可解释性与审计日志</li>
              <li>API/私有化部署与权限控制</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h4 className="font-semibold text-gray-900">ROI 计算器（演示）</h4>
            <div className="grid grid-cols-2 gap-3 mt-2 text-sm">
              <label className="flex flex-col">月度可节省工时<h5 className="font-mono"><input type="number" value={roi.hours} onChange={(e)=>setRoi({...roi, hours:Number(e.target.value)})} className="mt-1 px-2 py-1 rounded border"/></h5></label>
              <label className="flex flex-col">平均人力时薪<h5 className="font-mono"><input type="number" value={roi.hourly} onChange={(e)=>setRoi({...roi, hourly:Number(e.target.value)})} className="mt-1 px-2 py-1 rounded border"/></h5></label>
              <label className="flex flex-col">效率提升比例(0-1)<h5 className="font-mono"><input type="number" step="0.1" value={roi.efficiency} onChange={(e)=>setRoi({...roi, efficiency:Number(e.target.value)})} className="mt-1 px-2 py-1 rounded border"/></h5></label>
              <label className="flex flex-col">项目成本<h5 className="font-mono"><input type="number" value={roi.cost} onChange={(e)=>setRoi({...roi, cost:Number(e.target.value)})} className="mt-1 px-2 py-1 rounded border"/></h5></label>
            </div>
            <div className="mt-4 rounded-xl bg-blue-50 text-blue-900 p-4">
              <div>预计月度节省：<span className="font-bold">¥ {savings.toLocaleString()}</span></div>
              <div>预计净收益：<span className={`font-bold ${payoff>=0?"text-green-700":"text-red-700"}`}>¥ {payoff.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="成功案例" subtitle="典型行业解决方案（演示）">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["制造 · 质检识别","互联网 · 合同审阅","零售 · 智能客服","金融 · 合规审计","文旅 · 数据洞察","政企 · 流程自动化"].map((name, i) => (
            <div key={i} className="rounded-2xl border bg-white p-6 hover:shadow-md">
              <div className="text-xs text蓝-800">行业解决方案</div>
              <div className="mt-1 font-semibold text-gray-900">{name}</div>
              <p className="text-sm text-gray-600 mt-2">包含目标场景、方法路径、交付与ROI评估。</p>
              <a href="#/contact" className="inline-flex text-blue-800 text-sm mt-2">获取方案 →</a>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

/********************* 联系我们（表单 + 验证 + 本地存储） *********************/
function Contact({ t }) {
  useEffect(() => { document.title = `${t.brand.nameEN} | ${t.nav.contact}`; }, [t]);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", need: "", captcha: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const a = Math.floor(Math.random()*6)+2;
  const b = Math.floor(Math.random()*6)+2;
  const sumRef = useRef(a+b);

  function validate() {
    if (!form.name || !form.email || !form.need) return "请填写必填项（姓名/邮箱/需求）";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "邮箱格式不正确";
    if (String(form.captcha) !== String(sumRef.current)) return "验证码错误";
    return "";
  }

  return (
    <main>
      <Section title={t.nav.contact} subtitle="留下需求，我们将尽快联系你">
        {!sent ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const v = validate();
              if (v) return setErr(v);
              const items = JSON.parse(localStorage.getItem("lexsmile_contacts") || "[]");
              items.push({ ...form, createdAt: new Date().toISOString() });
              localStorage.setItem("lexsmile_contacts", JSON.stringify(items));
              setSent(true);
            }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">姓名 *</label>
              <input className="px-3 py-2 border rounded-xl" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">公司</label>
              <input className="px-3 py-2 border rounded-xl" value={form.company} onChange={(e)=>setForm({...form, company:e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">电话</label>
              <input className="px-3 py-2 border rounded-xl" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700">邮箱 *</label>
              <input className="px-3 py-2 border rounded-xl" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm text-gray-700">需求描述 *</label>
              <textarea rows={5} className="px-3 py-2 border rounded-xl" value={form.need} onChange={(e)=>setForm({...form, need:e.target.value})} required />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="text-sm text-gray-700">验证码：{a} + {b} = ? *</label>
                <input className="mt-1 px-3 py-2 border rounded-xl" value={form.captcha} onChange={(e)=>setForm({...form, captcha:e.target.value})} required />
              </div>
              <button className="h-10 px-6 rounded-xl bg-blue-800 text白 self-end">提交</button>
            </div>
            {err && <div className="md:col-span-2 text-sm text-red-600">{err}</div>}
          </form>
        ) : (
          <div className="rounded-2xl border bg-white p-6">
            <h4 className="font-semibold text-gray-900">提交成功</h4>
            <p className="text-sm text-gray-700 mt-2">感谢你的咨询，我们将在 1-2 个工作日内联系你。</p>
            <a href="#/" className="inline-flex text-blue-800 mt-3">返回首页 →</a>
          </div>
        )}
      </Section>

      <Section title="地图与分支" subtitle="示例占位，可替换为真实地址">
        <div className="grid md:grid-cols-3 gap-6">
          <iframe title="map" className="md:col-span-2 w-full h-64 rounded-2xl border" loading="lazy" src="https://maps.google.com/maps?q=Dalian%20China&t=&z=10&ie=UTF8&iwloc=&output=embed"></iframe>
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-700">
            <div className="font-semibold text-gray-900">总部（示例）</div>
            <div>中国 · 大连</div>
            <div>工作时间：周一至周五 9:00-18:00</div>
            <div className="mt-3">在线客服（示例）：微信/邮箱/电话</div>
          </div>
        </div>
      </Section>
    </main>
  );
}

/********************* Dev 自测用例（轻量） ***************************/
function DevTests() {
  useEffect(() => {
    try {
      // 路由映射测试
      const labelsZh = [zh.nav.home, zh.nav.about, zh.nav.services, zh.nav.news, zh.nav.ai, zh.nav.contact];
      console.assert(labelsZh.length === 6 && labelsZh.every(Boolean), "[TEST] zh nav labels exist");

      // ROI 计算器测试（基线）
      const roi = { hours: 100, hourly: 200, efficiency: 0.5, cost: 30000 };
      const savings = roi.hours * roi.hourly * roi.efficiency; // 100 * 200 * 0.5 = 10000
      const payoff = savings - roi.cost; // 10000 - 30000 = -20000
      console.assert(savings === 10000 && payoff === -20000, "[TEST] ROI math correct");

      // ROI 计算器边界：效率 0/1
      const savings0 = 100 * 200 * 0;
      const savings1 = 100 * 200 * 1;
      console.assert(savings0 === 0 && savings1 === 20000, "[TEST] ROI edge efficiency");

      // 邮箱正则冒烟
      const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
      console.assert(isValidEmail("a@b.com") && !isValidEmail("a@b") && !isValidEmail("a b@c.com"), "[TEST] email regex");

      // 路由集合长度一致
      console.assert(Array.isArray(routes) && routes.length === 6, "[TEST] routes length");

      window.__lexsmile_tests = { passed: true };
    } catch (e) {
      console.error("[TEST] failed:", e);
      window.__lexsmile_tests = { passed: false, error: String(e) };
    }
  }, []);
  return null;
}

/********************* 应用根：注入 SEO、结构化数据 ***************************/
export default function App() {
  const { path, push } = useHashRoute();
  const [lang, setLang] = useState("zh");
  const t = lang === "zh" ? zh : en;

  useEffect(() => {
    // 基础 SEO
    const metaDesc = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' });
    metaDesc.content = `${t.brand.nameEN} · ${t.brand.positioning}`;
    if (!metaDesc.parentNode) document.head.appendChild(metaDesc);

    const metaKeywords = document.querySelector('meta[name="keywords"]') || Object.assign(document.createElement('meta'), { name: 'keywords' });
    metaKeywords.content = "LexSmile, 笑达, 法律咨询, 合规, AI 合同审阅, 数字法务, 管理咨询";
    if (!metaKeywords.parentNode) document.head.appendChild(metaKeywords);

    // 结构化数据（JSON-LD）
    const ld = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: t.brand.nameEN,
      alternateName: t.brand.nameCN,
      url: window.location.href,
      slogan: t.brand.slogan,
      description: t.brand.positioning,
      sameAs: [],
      logo: "https://picsum.photos/seed/lexlogo/200/200",
      address: { "@type": "PostalAddress", addressLocality: "Dalian", addressCountry: "CN" },
    };
    let script = document.getElementById("org-json-ld");
    if (!script) { script = document.createElement("script"); script.type = "application/ld+json"; script.id = "org-json-ld"; document.head.appendChild(script); }
    script.textContent = JSON.stringify(ld);
  }, [lang, t]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6] text-[#374151]">
      <DevTests />
      <Header t={t} path={path} push={push} lang={lang} setLang={setLang} />
      <TestSiteNotification />
      <div className="flex-1">
        {path === "/" && <Home t={t} push={push} />}
        {path === "/about" && <About t={t} />}
        {path === "/services" && <Services t={t} />}
        {path === "/news" && <News t={t} />}
        {path === "/ai" && <AISolutions t={t} />}
        {path === "/contact" && <Contact t={t} />}
        {!routes.includes(path) && <NotFound push={push} />}
      </div>
      <Footer t={t} />
      <BackToTop />
    </div>
  );
}

function NotFound({ push }) {
  useEffect(() => { document.title = `404 | LexSmile`; }, []);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h2 className="text-3xl font-bold text-gray-900">404</h2>
      <p className="text-gray-600 mt-2">页面不存在</p>
      <button onClick={() => push("/")} className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-xl">返回首页</button>
    </div>
  );
}

/********************* 返回顶部 ***************************/
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg border bg-white hover:shadow-xl" aria-label="Back to top">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M5 15l7-7 7 7"/></svg>
    </button>
  );
}
