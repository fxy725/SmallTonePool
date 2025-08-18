import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import Link from "next/link";
import Image from 'next/image';

export const metadata: Metadata = {
    title: "关于我 - 小石潭记",
    description: "了解小石潭记博主的技术背景和分享理念",
};

export default async function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">




                {/* About Me — replaced by centered avatar + caption */}
                <section className="p-6 md:p-8 bg-transparent rounded-none shadow-none">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#8B5E3C] dark:border-[#8B5E3C] relative">
                            <Image src="/assets/Profile.png" alt="头像" fill className="object-cover" />
                        </div>
                        <p className="mt-4 text-lg text-gray-900 dark:text-white font-hero">小石潭记博客主 — AI爱好者 · 游戏开发者</p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-content">记录学习笔记与项目展示，分享技术与思考</p>

                        <div className="mt-6 flex items-center justify-center gap-1">
                            <a href="https://space.bilibili.com/2045320027?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-4 py-2 bg-[#fb7299] hover:bg-[#ff6b9d] transition-colors" style={{ outline: 'none', boxShadow: 'none' }}>
                                <Image src="/logos/bilibili.svg" alt="Bilibili" width={20} height={20} className="flex-shrink-0 filter brightness-0 invert" />
                                <span className="font-pixel text-xl text-white leading-none">Bilibili</span>
                            </a>

                            <a href="https://github.com/fxy725" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-4 py-2 bg-[#24292e] hover:bg-[#33363a] transition-colors" style={{ outline: 'none', boxShadow: 'none' }}>
                                <Image src="/logos/GitHub.svg" alt="GitHub" width={20} height={20} className="flex-shrink-0 filter brightness-0 invert" />
                                <span className="font-pixel text-xl text-white leading-none">Github</span>
                            </a>

                            <a href="https://www.zhihu.com/people/39-64-49-19-97" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-4 py-2 bg-[#49C0FB] hover:bg-[#5cc8ff] transition-colors" style={{ outline: 'none', boxShadow: 'none' }}>
                                <Image src="/logos/zhihu.svg" alt="Zhihu" width={20} height={20} className="flex-shrink-0 filter brightness-0 invert" />
                                <span className="font-pixel text-xl text-white leading-none">ZhiHu</span>
                            </a>
                        </div>
                    </div>
                </section>
                {/* Skills Section */}
                <section className="p-6 md:p-8 bg-transparent rounded-none shadow-none">
                    <div className="flex flex-col items-center text-center">
                        <div className="mt-6 flex items-center justify-center gap-1">
                            <div className="flex items-center gap-1 px-4 py-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] transition-colors">
                                <Image src="/logos/unity.svg" alt="Unity" width={20} height={20} className="flex-shrink-0 filter brightness-0 invert" />
                                <span className="font-pixel text-xl text-white leading-none">Unity</span>
                            </div>

                            <div className="flex items-center gap-1 px-4 py-2 bg-[#13227a] hover:bg-[#1a2f8f] transition-colors">
                                <Image src="/logos/c++.svg" alt="C++" width={20} height={20} className="flex-shrink-0 filter brightness-0 invert" />
                                <span className="font-pixel text-xl text-white leading-none">C++</span>
                            </div>

                            <div className="flex items-center gap-1 px-4 py-2 bg-[#1afa29] hover:bg-[#1dd626] transition-colors">
                                <Image src="/logos/csharp.svg" alt="C#" width={20} height={20} className="flex-shrink-0" />
                                <span className="font-pixel text-xl text-white leading-none">C#</span>
                            </div>

                            <div className="flex items-center gap-1 px-4 py-2 bg-[#1D88E5] hover:bg-[#2a96f0] transition-colors">
                                <Image src="/logos/lua.svg" alt="Lua" width={20} height={20} className="flex-shrink-0 filter brightness-0 invert" />
                                <span className="font-pixel text-xl text-white leading-none">Lua</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700 bg-transparent rounded-none shadow-none">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">项目展示</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-transparent rounded-none shadow-none">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">小石潭记博客</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                基于 Next.js 构建的现代化个人博客，支持 MDX、深色模式、响应式设计等特性。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">Next.js</span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">TypeScript</span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">Tailwind CSS</span>
                            </div>
                        </div>

                        <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-transparent rounded-none shadow-none">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">全栈Web应用</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                企业级Web应用开发，包含用户管理、数据分析、实时通信等功能模块。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">React</span>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">Node.js</span>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">PostgreSQL</span>
                            </div>
                        </div>

                        <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-transparent rounded-none shadow-none">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Unity游戏项目</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                2D/3D游戏开发，包含角色控制、物理系统、UI界面、音效管理等完整游戏功能。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">Unity</span>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">C#</span>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">Shader</span>
                            </div>
                        </div>

                        <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-transparent rounded-none shadow-none">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">移动应用开发</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                跨平台移动应用开发，提供原生体验的用户界面和流畅的交互效果。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs">React Native</span>
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs">Flutter</span>
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs">Firebase</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700 bg-transparent rounded-none shadow-none">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">联系我</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            如果你对我的文章有任何疑问，或者想要交流技术话题，欢迎通过以下方式联系我：
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-4 p-3 bg-transparent border-b border-gray-200 dark:border-gray-600 rounded-none">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">邮箱</p>
                                    <p className="text-gray-600 dark:text-gray-400">contact@smalltone.dev</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-3 bg-transparent border-b border-gray-200 dark:border-gray-600 rounded-none">
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">GitHub</p>
                                    <p className="text-gray-600 dark:text-gray-400">github.com/smalltone</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-3 bg-transparent border-b border-gray-200 dark:border-gray-600 rounded-none">
                                <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Twitter</p>
                                    <p className="text-gray-600 dark:text-gray-400">@smalltone_dev</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-3 bg-transparent border-b border-gray-200 dark:border-gray-600 rounded-none">
                                <svg className="w-6 h-6 text-blue-700 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">LinkedIn</p>
                                    <p className="text-gray-600 dark:text-gray-400">linkedin.com/in/smalltone</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>


                {/* Simple Contact CTA */}
                <section className="py-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-[2px] text-gray-700 dark:text-gray-300">
                            <span>想进一步交流？</span>
                            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                查看近期文章
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
