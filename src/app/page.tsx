'use client'

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Github,
  ExternalLink,
  MapPin,
  Code,
  Database,
  Cloud,
  Zap,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

// 型定義
interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
  category: 'automation' | 'blockchain' | 'web' | 'ai';
  featured: boolean;
}

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'infrastructure' | 'database' | 'tools';
  years: number;
}

// データ
const profileData = {
  name: 'Shuhei HIROSHIMA',
  title: '自動化・効率化エンジニア',
  location: '新潟県',
  description: 'ビジネス課題を技術で解決し、業務効率化を実現するフリーランスエンジニア。ECサイト運営自動化から、ブロックチェーン技術まで幅広い技術領域での開発経験を持つ。',
  email: 'tumutrading2020@gmail.com'
};

const skills: Skill[] = [
  // Backend
  { name: 'Java', level: 4, category: 'backend', years: 4 },
  { name: 'Spring Boot', level: 4, category: 'backend', years: 4 },
  { name: 'Node.js', level: 4, category: 'backend', years: 4 },
  { name: 'Python', level: 3, category: 'backend', years: 3 },
  
  // Frontend
  { name: 'JavaScript', level: 4, category: 'frontend', years: 4 },
  { name: 'Vue.js', level: 4, category: 'frontend', years: 3 },
  { name: 'HTML5', level: 3, category: 'frontend', years: 3 },
  { name: 'CSS3', level: 3, category: 'frontend', years: 3 },
  
  // Infrastructure
  { name: 'AWS', level: 3, category: 'infrastructure', years: 3 },
  { name: 'Docker', level: 3, category: 'infrastructure', years: 2 },
  { name: 'Linux', level: 3, category: 'infrastructure', years: 3 },
  
  // Database
  { name: 'MySQL', level: 4, category: 'database', years: 4 },
  { name: 'DynamoDB', level: 3, category: 'database', years: 2 },
  
  // Tools
  { name: 'Git', level: 4, category: 'tools', years: 4 },
  { name: 'GitHub', level: 4, category: 'tools', years: 4 },
  { name: 'Slack', level: 4, category: 'tools', years: 4 }
];

const projects: Project[] = [
  {
    id: 'crypto-wallet',
    title: '仮想通貨ウォレットシステム',
    description: 'AWS Lambda上で動作するサーバーレス仮想通貨ウォレット。Bitcoin・Ethereum両通貨対応のマルチウォレット機能。ブロックチェーン取引監視、アドレス管理、残高管理を自動化。',
    tech: ['Node.js', 'AWS Lambda', 'DynamoDB', 'Bitcoin Core RPC', 'Web3.js'],
    category: 'blockchain',
    featured: true
  },
  {
    id: 'academic-db',
    title: '学術向け画像解析データベース',
    description: '学術研究用の画像解析データベースシステム。外部DB連携、データ整合性向上、UI改善を担当。研究者の効率的なデータ活用を支援。',
    tech: ['Java', 'Spring Boot', 'Vue.js', 'MySQL', 'Docker'],
    category: 'web',
    featured: true
  },
  {
  id: 'dr-teals-epsom-salt-lp',
  title: 'Dr.Teal\'s エプソムソルトLP',
  description: 'A8.netアフィリエイト向けランディングページ。医薬部外品の効能訴求と感情に訴えるデザインでCVR向上を実現。',
  tech: ['Astro', 'Tailwind CSS', 'TypeScript', 'Cloudflare Pages'],
  url: 'https://epsom-salt.pages.dev/',
  category: 'web',
  featured: true
},
    ,
  {
    id: 'ec-automation',
    title: 'ECサイト運営自動化ツール',
    description: '自身が運営するAmazon、Yahoo Shopping、au PAYマーケット向けの業務自動化システム。商品リサーチ、出品、価格管理、在庫管理を完全自動化し、大幅な工数削減を実現。',
    tech: ['Node.js', 'Python', 'Amazon MWS API', 'Yahoo Shopping API', 'Puppeteer'],
    category: 'automation',
    featured: false
  },
  {
    id: 'shooting-game',
    title: 'シューティングゲーム',
    description: 'Claude Codeを活用したブラウザゲーム開発。最新のAI開発ツールを実際のプロジェクトで活用し、効率的な開発フローを実証。',
    tech: ['JavaScript', 'HTML5 Canvas', 'Claude Code'],
    url: 'https://shupopo.github.io/shooting/',
    github: 'https://github.com/shupopo',
    category: 'ai',
    featured: false
  },
  {
    id: 'tennis-game',
    title: 'テニスゲーム',
    description: 'Claude Codeによるインタラクティブなテニスゲーム。AI支援開発ツールの可能性を探求した実験的プロジェクト。',
    tech: ['JavaScript', 'HTML5 Canvas', 'Claude Code'],
    url: 'https://shupopo.github.io/testfolder/',
    github: 'https://github.com/shupopo',
    category: 'ai',
    featured: false
  },
  {
    id: 'sns-app',
    title: 'Twitter風SNSアプリ',
    description: 'Bubbleを使用したノーコード開発によるSNSアプリ。従来の開発手法との比較検証を通じて、適切な技術選択の重要性を実証。',
    tech: ['Bubble', 'NoCode'],
    url: 'https://sns-84536.bubbleapps.io/version-test',
    category: 'ai',
    featured: false
  },
  {
    id: 'youtube-channel',
    title: 'YouTube音楽チャンネル',
    description: 'Suno AI + Runwayを活用した音楽コンテンツ制作。AI技術を活用したクリエイティブワークフローの構築と運営。',
    tech: ['Suno AI', 'Runway', 'YouTube API'],
    url: 'https://www.youtube.com/@truSands',
    category: 'ai',
    featured: false
  }
];

// コンポーネント
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"]);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ backgroundColor: headerBg }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-gray-900"
        >
          Shuhei HIROSHIMA
        </motion.div>
        
        <nav className="hidden md:flex space-x-8">
          {['About', 'Skills', 'Works'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
        >
          {['About', 'Skills', 'Works'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            {profileData.name}
          </h1>
          <p className="text-xl md:text-2xl text-blue-600 mb-8 font-medium">
            {profileData.title}
          </p>
          <div className="flex items-center justify-center space-x-2 text-gray-600 mb-8">
            <MapPin size={20} />
            <span>{profileData.location}</span>
          </div>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            {profileData.description}
          </p>
          <motion.a
            href="#about"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>詳細を見る</span>
            <ChevronDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">エンジニアとしての歩み</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                大手プログラミングスクールでのインターン経験を経て、
                上場ITコンサルティング企業にてブロックチェーン技術の
                システム開発に従事しました。
              </p>
              <p>
                現在はフリーランスエンジニアとして活動しています。
              </p>
              <p>
                Spring Bootを中心としたサーバーサイド開発から、AWS Lambda上での
                サーバーレスアプリケーション、ブロックチェーン技術まで、
                幅広い技術領域での実装経験を持ちます。
              </p>
              <p>
                最近では、Claude Code、Bubble、Cursorなどの最新開発ツールを積極的に活用し、
                従来の開発フローの改善と効率化に取り組んでいます。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">5年+</div>
              <div className="text-gray-700">ECサイト運営自動化</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
              <div className="text-gray-700">プロジェクト実績</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">3つ</div>
              <div className="text-gray-700">専門技術領域</div>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">リモート</div>
              <div className="text-gray-700">ワークスタイル</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>('backend');
  
  const categories = {
    backend: 'Backend',
    frontend: 'Frontend',
    infrastructure: 'Infrastructure',
    database: 'Database',
    tools: 'Tools'
  };

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Skills</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeCategory === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                <span className="text-sm text-gray-500">{skill.years}年</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.level / 5) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>レベル</span>
                <span>{skill.level}/5</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const categories = {
    all: 'すべて',
    automation: '自動化',
    blockchain: 'ブロックチェーン',
    web: 'Webアプリ',
    ai: 'AI・新技術'
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Works</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                project.featured ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {project.featured && (
                <div className="bg-blue-500 text-white text-xs px-3 py-1 text-center">
                  FEATURED
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <ExternalLink size={16} />
                      <span>View Project</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{profileData.name}</h3>
            <p className="text-gray-400 mb-4">{profileData.title}</p>
            <p className="text-gray-400 text-sm">
              業務効率化と自動化を通じて、<br />
              ビジネスの成長を技術で支援します。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">専門分野</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Spring Boot / Java開発</li>
              <li>AWS サーバーレス構築</li>
              <li>業務自動化ツール開発</li>
              <li>ECサイトシステム構築</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 {profileData.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://github.com/shupopo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// メインコンポーネント
const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
};

export default Portfolio;