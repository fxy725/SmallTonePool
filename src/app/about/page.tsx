"use client";

import { Header } from "@/components/layout/Header";
import { CopyButton } from "@/components/CopyButton";
import Link from "next/link";
import Image from 'next/image';


export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 about-container">




                {/* About Me — replaced by centered avatar + caption */}
                <section className="p-6 md:p-8 bg-transparent rounded-none shadow-none">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#8B5E3C] dark:border-[#8B5E3C] relative about-avatar-container">
                            <Image src="/assets/Profile.png" alt="头像" fill className="object-cover" />
                        </div>
                        <p className="mt-4 text-lg text-gray-900 dark:text-white font-hero">小石潭记博客主 — AI爱好者 · 游戏开发者</p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-content">记录学习笔记与项目展示，分享技术与思考</p>

                        <div className="mt-6 flex flex-col items-center gap-6">
                            {/* QQ Contact */}
                            <div className="flex items-center justify-center gap-2">
                                <span
                                    className="text-lg text-gray-600 dark:text-gray-300"
                                    style={{ fontFamily: 'var(--font-tech-stack)' }}
                                >
                                    联系邮箱
                                </span>
                                <CopyButton
                                    text="849517015@qq.com"
                                    successMessage="已复制邮箱地址"
                                    className="flex items-center gap-1 px-3 py-2 bg-white hover:bg-gray-100 transition-colors rounded-lg about-email-button"
                                    style={{ outline: 'none', boxShadow: 'none' }}
                                >
                                    <Image src="/logos/QQ.svg" alt="QQ" width={20} height={20} className="flex-shrink-0" />
                                    <span className="font-pixel text-lg text-gray-800 leading-none">849517015@qq.com</span>
                                </CopyButton>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-3 about-social-buttons about-social-vertical">
                                <a href="https://space.bilibili.com/2045320027?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 bg-[#fb7299] hover:bg-[#ff6b9d] transition-colors rounded-lg" style={{ outline: 'none', boxShadow: 'none' }}>
                                    <Image src="/logos/bilibili.svg" alt="Bilibili" width={20} height={20} className="flex-shrink-0 filter brightness-0 invert" />
                                    <span className="font-pixel text-lg text-white leading-none">Bilibili</span>
                                </a>

                                <a href="https://github.com/fxy725" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 bg-[#24292e] hover:bg-[#33363a] transition-colors rounded-lg" style={{ outline: 'none', boxShadow: 'none' }}>
                                    <Image src="/logos/GitHub.svg" alt="GitHub" width={20} height={20} className="flex-shrink-0 filter brightness-0 invert" />
                                    <span className="font-pixel text-lg text-white leading-none">Github</span>
                                </a>

                                <a href="https://www.zhihu.com/people/39-64-49-19-97" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 bg-[#1E3A8A] hover:bg-[#1E40AF] transition-colors rounded-lg" style={{ outline: 'none', boxShadow: 'none' }}>
                                    <Image src="/logos/zhihu.svg" alt="Zhihu" width={20} height={20} className="flex-shrink-0 filter brightness-0 invert" />
                                    <span className="font-pixel text-lg text-white leading-none">ZhiHu</span>
                                </a>

                                <a href="https://linux.do/u/kakaa/summary" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 bg-[#ff8c00] hover:bg-[#ff9f33] transition-colors rounded-lg" style={{ outline: 'none', boxShadow: 'none' }}>
                                    <Image src="/logos/linux-do.svg" alt="Linux.do" width={20} height={20} className="flex-shrink-0" />
                                    <span className="font-pixel text-lg text-white leading-none">Linux.do</span>
                                </a>

                            </div>
                        </div>
                        {/* Skills Section */}
                        <div className="flex items-center justify-center mt-8 gap-4 about-skills-container">
                            <span
                                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 sm:mr-4"
                                style={{ fontFamily: 'var(--font-tech-stack)' }}
                            >
                                技术栈
                            </span>
                            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-0">
                                {/* Unity */}
                                <div className="skill-tag skill-tag-unity bg-[#2c2c2c] hover:bg-[#3c3c3c]">
                                    <Image src="/logos/unity.svg" alt="Unity" width={14} height={14} className="flex-shrink-0 filter brightness-0 invert" />
                                    <span className="font-pixel text-base text-white leading-none">Unity</span>
                                </div>

                                {/* C++ */}
                                <div className="skill-tag skill-tag-cpp bg-[#13227a] hover:bg-[#1a2f8f]">
                                    <Image src="/logos/c++.svg" alt="C++" width={16} height={16} className="flex-shrink-0 filter brightness-0 invert" />
                                    <span className="font-pixel text-base text-white leading-none">C++</span>
                                </div>

                                {/* C# */}
                                <div className="skill-tag skill-tag-csharp bg-[#12b921] hover:bg-[#1dd626]">
                                    <Image
                                        src="/logos/csharp.svg"
                                        alt="C#"
                                        width={16}
                                        height={16}
                                        className="flex-shrink-0 filter brightness-0 invert"
                                    />
                                    <span className="font-pixel text-base text-white leading-none">C#</span>
                                </div>

                                {/* Lua */}
                                <div className="skill-tag skill-tag-lua bg-[#1D88E5] hover:bg-[#2a96f0]">
                                    <Image src="/logos/lua.svg" alt="Lua" width={16} height={16} className="flex-shrink-0 filter brightness-0 invert" />
                                    <span className="font-pixel text-base text-white leading-none">Lua</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Projects Section */}
                <div className="p-6 md:p-8 bg-transparent rounded-none shadow-none">
                    {/* 项目展示分割线 */}
                    <div className="relative mb-12">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                            {/* 虚线上的小球装饰 */}
                            <div className="absolute inset-0 flex items-center justify-between px-8">
                                {/* 左侧小球群 */}
                                <div className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-80"></div>
                                    <div className="w-1 h-1 bg-indigo-300 rounded-full opacity-60"></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full opacity-70"></div>
                                    <div className="w-1 h-1 bg-indigo-400 rounded-full opacity-50"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full opacity-80"></div>
                                </div>

                                {/* 右侧小球群 */}
                                <div className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-80"></div>
                                    <div className="w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full opacity-70"></div>
                                    <div className="w-1 h-1 bg-blue-300 rounded-full opacity-50"></div>
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-80"></div>
                                </div>
                            </div>

                            {/* 额外散布的小球 */}
                            <div className="absolute left-20 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-40"></div>
                            <div className="absolute left-32 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-30"></div>
                            <div className="absolute right-20 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-indigo-400 rounded-full opacity-40"></div>
                            <div className="absolute right-32 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-30"></div>
                        </div>

                        <div className="relative flex justify-center items-center">
                            {/* 左侧装饰 */}
                            <div className="flex items-center gap-2 mr-4">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                            </div>

                            <span className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-white dark:bg-gray-900 shadow-lg rounded-full border-2 border-blue-200 dark:border-blue-800">
                                <span
                                    className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400 bg-clip-text text-transparent whitespace-nowrap about-project-title"
                                    style={{ fontFamily: 'LXGW Marker Gothic' }}
                                >
                                    项目展示
                                </span>
                            </span>

                            {/* 右侧装饰 */}
                            <div className="flex items-center gap-2 ml-4">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* 远处装饰性元素 */}
                        <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
                        <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-indigo-300 rounded-full opacity-60"></div>

                        {/* 更多散布的小球 */}
                        <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-blue-500 rounded-full opacity-50"></div>
                        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-indigo-500 rounded-full opacity-50"></div>
                        <div className="absolute left-40 top-1/2 transform -translate-y-1/2 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-30"></div>
                        <div className="absolute right-40 top-1/2 transform -translate-y-1/2 w-0.5 h-0.5 bg-indigo-400 rounded-full opacity-30"></div>
                    </div>
                    <div className="grid md:grid-cols-1 gap-6">
                        <div className="p-4 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent rounded-none shadow-none about-project-card" style={{ fontFamily: 'LXGW WenKai Mono TC' }}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">FarmingRPG</h3>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <a href="https://github.com/fxy725/FarmingRPG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-sm">源码</span>
                                    </a>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 cursor-not-allowed">
                                        <Image src="/logos/bilibili.svg" alt="演示" width={16} height={16} className="flex-shrink-0" />
                                        <span className="text-sm">演示</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                基于Unity开发的农场模拟RPG游戏，包含完整的种植系统、养殖系统、季节变化和经济系统。玩家可以种植作物、养殖动物、制作物品，体验农场生活的乐趣。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">Unity</span>
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">C#</span>
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">2D游戏</span>
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">RPG</span>
                            </div>
                        </div>

                        <div className="p-4 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent rounded-none shadow-none about-project-card" style={{ fontFamily: 'LXGW WenKai Mono TC' }}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">SpaceSurvivor</h3>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <a href="https://github.com/fxy725/SpaceSurvivor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-sm">源码</span>
                                    </a>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 cursor-not-allowed">
                                        <Image src="/logos/bilibili.svg" alt="演示" width={16} height={16} className="flex-shrink-0" />
                                        <span className="text-sm">演示</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                太空主题的生存游戏，玩家在外太空环境中收集资源、建造基地、对抗外星生物。包含飞船升级、武器系统、科技树等深度玩法，提供紧张刺激的生存体验。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">Unity</span>
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">C#</span>
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">3D游戏</span>
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">生存游戏</span>
                            </div>
                        </div>

                        <div className="p-4 bg-transparent rounded-none shadow-none about-project-card" style={{ fontFamily: 'LXGW WenKai Mono TC' }}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">SmallPoolTone</h3>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <a href="https://github.com/fxy725/SmallPoolTone" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-sm">源码</span>
                                    </a>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 cursor-not-allowed">
                                        <Image src="/logos/bilibili.svg" alt="演示" width={16} height={16} className="flex-shrink-0" />
                                        <span className="text-sm">演示</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                基于Next.js构建的现代化个人博客系统，采用小石潭主题设计，支持MDX文章管理、深色模式、搜索功能、标签系统等特性。专注于技术文章分享，具有优秀的SEO优化和响应式设计。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">Next.js</span>
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">TypeScript</span>
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">Tailwind CSS</span>
                                <span className="skill-badge-sm about-skill-badge px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">MDX</span>
                            </div>
                        </div>
                    </div>

                    {/* Simple Contact CTA */}
                    <div className="text-center mt-8">
                        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-[2px] text-gray-700 dark:text-gray-300">
                            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400" style={{ fontFamily: 'var(--font-tech-stack)' }}>
                                查看近期文章
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
