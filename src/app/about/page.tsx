"use client";

import { Header } from "@/components/layout/Header";
import Link from "next/link";
import Image from 'next/image';


export default function AboutPage() {
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
                <section className="p-6 md:p-8 bg-transparent rounded-none shadow-none -mt-16">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center">
                            <span
                                className="mr-4 text-lg text-gray-600 dark:text-gray-300"
                                style={{ fontFamily: 'var(--font-tech-stack)' }}
                            >
                                技术栈
                            </span>
                            {/* Unity */}
                            <div
                                className="relative flex items-center gap-1.5 pl-4 pr-5 py-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] transition-colors z-40"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)' }}
                            >
                                <Image src="/logos/unity.svg" alt="Unity" width={16} height={16} className="flex-shrink-0 filter brightness-0 invert" />
                                <span className="font-pixel text-lg text-white leading-none">Unity</span>
                            </div>

                            {/* C++ */}
                            <div
                                className="relative flex items-center gap-1.5 pl-4 pr-5 py-2 bg-[#13227a] hover:bg-[#1a2f8f] transition-colors -ml-3.5 z-30"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)' }}
                            >
                                <Image src="/logos/c++.svg" alt="C++" width={16} height={16} className="flex-shrink-0 filter brightness-0 invert" />
                                <span className="font-pixel text-lg text-white leading-none">C++</span>
                            </div>

                            {/* C# */}
                            <div
                                className="relative flex items-center gap-1.5 pl-4 pr-5 py-2 bg-[#12b921] hover:bg-[#1dd626] transition-colors -ml-3.5 z-20"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)' }}
                            >
                                <Image
                                    src="/logos/csharp.svg"
                                    alt="C#"
                                    width={16}
                                    height={16}
                                    className="flex-shrink-0 filter brightness-0 invert"
                                />
                                <span className="font-pixel text-lg text-white leading-none">C#</span>
                            </div>

                            {/* Lua */}
                            <div
                                className="relative flex items-center gap-1.5 pl-4 pr-5 py-2 bg-[#1D88E5] hover:bg-[#2a96f0] transition-colors -ml-3.5 z-10"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)' }}
                            >
                                <Image src="/logos/lua.svg" alt="Lua" width={16} height={16} className="flex-shrink-0 filter brightness-0 invert" />
                                <span className="font-pixel text-lg text-white leading-none">Lua</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="p-6 md:p-8 bg-transparent rounded-none shadow-none">
                    <div className="grid md:grid-cols-1 gap-6">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-transparent rounded-none shadow-none">
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">FarmingRPG</h3>
                                <div className="ml-auto flex items-center gap-4">
                                    <a href="https://github.com/fxy725/FarmingRPG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-sm">源码</span>
                                    </a>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 cursor-not-allowed">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.507 2.246 1.56 3.773v7.286c-.054 1.51-.578 2.769-1.574 3.773-.995 1.003-2.247 1.506-3.773 1.56H5.333c-1.51-.054-2.769-.578-3.773-1.574C.556 19.043.053 17.79 0 16.267V8.98c.054-1.51.578-2.769 1.574-3.773C2.57 4.203 3.822 3.7 5.333 3.647h12.48zm.854 1.514H5.333c-.976.036-1.775.336-2.397.899-.622.562-.936 1.345-.942 2.347v7.286c.036.976.336 1.775.899 2.397.562.622 1.345.936 2.347.942h13.286c.976-.036 1.775-.336 2.397-.899.622-.562.936-1.345.942-2.347V8.98c-.036-.976-.336-1.775-.899-2.397-.622-.622-1.372-.936-2.347-.942zM12 7.893c.876 0 1.726.165 2.548.493.822.329 1.527.793 2.117 1.393.59.599 1.05 1.305 1.38 2.118.329.813.493 1.663.493 2.548 0 .893-.165 1.743-.493 2.548-.329.804-.793 1.5-1.38 2.083-.59.583-1.295 1.038-2.117 1.367-.822.329-1.672.493-2.548.493-.876 0-1.726-.165-2.548-.493-.822-.329-1.527-.793-2.117-1.393-.59-.599-1.05-1.305-1.38-2.118-.329-.813-.493-1.663-.493-2.548 0-.893.165-1.743.493-2.548.329-.804.793-1.5 1.38-2.083.59-.583 1.295-1.038 2.117-1.367.822-.329 1.672-.493 2.548-.493zm0 1.514c-.711 0-1.39.13-2.037.393-.647.262-1.207.626-1.68 1.093-.473.466-.844 1.025-1.113 1.676-.27.65-.404 1.343-.404 2.08 0 .72.135 1.41.404 2.07.27.66.64 1.225 1.113 1.693.473.468 1.033.831 1.68 1.093.647.262 1.326.393 2.037.393.711 0 1.39-.13 2.037-.393.647-.262 1.207-.626 1.68-1.093.473-.466.844-1.025 1.113-1.676.27-.65.404-1.343.404-2.08 0-.72-.135-1.41-.404-2.07-.27-.66-.64-1.225-1.113-1.693-.473-.468-1.033-.831-1.68-1.093-.647-.262-1.326-.393-2.037-.393zm8.893-1.333c.329 0 .604.109.827.327.222.218.333.493.333.827 0 .334-.111.61-.333.827-.223.218-.498.327-.827.327-.334 0-.61-.109-.827-.327-.218-.218-.327-.493-.327-.827 0-.334.109-.61.327-.827.218-.218.493-.327.827-.327z"/>
                                        </svg>
                                        <span className="text-sm">演示</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                基于Unity开发的农场模拟RPG游戏，包含完整的种植系统、养殖系统、季节变化和经济系统。玩家可以种植作物、养殖动物、制作物品，体验农场生活的乐趣。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="skill-badge-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">Unity</span>
                                <span className="skill-badge-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">C#</span>
                                <span className="skill-badge-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">2D游戏</span>
                                <span className="skill-badge-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">RPG</span>
                            </div>
                        </div>

                        <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-transparent rounded-none shadow-none">
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">SpaceSurvivor</h3>
                                <div className="ml-auto flex items-center gap-4">
                                    <a href="https://github.com/fxy725/SpaceSurvivor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-sm">源码</span>
                                    </a>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 cursor-not-allowed">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.507 2.246 1.56 3.773v7.286c-.054 1.51-.578 2.769-1.574 3.773-.995 1.003-2.247 1.506-3.773 1.56H5.333c-1.51-.054-2.769-.578-3.773-1.574C.556 19.043.053 17.79 0 16.267V8.98c.054-1.51.578-2.769 1.574-3.773C2.57 4.203 3.822 3.7 5.333 3.647h12.48zm.854 1.514H5.333c-.976.036-1.775.336-2.397.899-.622.562-.936 1.345-.942 2.347v7.286c.036.976.336 1.775.899 2.397.562.622 1.345.936 2.347.942h13.286c.976-.036 1.775-.336 2.397-.899.622-.562.936-1.345.942-2.347V8.98c-.036-.976-.336-1.775-.899-2.397-.622-.622-1.372-.936-2.347-.942zM12 7.893c.876 0 1.726.165 2.548.493.822.329 1.527.793 2.117 1.393.59.599 1.05 1.305 1.38 2.118.329.813.493 1.663.493 2.548 0 .893-.165 1.743-.493 2.548-.329.804-.793 1.5-1.38 2.083-.59.583-1.295 1.038-2.117 1.367-.822.329-1.672.493-2.548.493-.876 0-1.726-.165-2.548-.493-.822-.329-1.527-.793-2.117-1.393-.59-.599-1.05-1.305-1.38-2.118-.329-.813-.493-1.663-.493-2.548 0-.72.165-1.41.493-2.07.329-.66.793-1.225 1.38-2.083.59-.583 1.295-1.038 2.117-1.367.822-.329 1.672-.493 2.548-.493zm0 1.514c-.711 0-1.39.13-2.037.393-.647.262-1.207.626-1.68 1.093-.473.466-.844 1.025-1.113 1.676-.27.65-.404 1.343-.404 2.08 0 .72.135 1.41.404 2.07.27.66.64 1.225 1.113 1.693.473.468 1.033.831 1.68 1.093.647.262 1.326.393 2.037.393.711 0 1.39-.13 2.037-.393.647-.262 1.207-.626 1.68-1.093.473-.466.844-1.025 1.113-1.676.27-.65.404-1.343.404-2.08 0-.72-.135-1.41-.404-2.07-.27-.66-.64-1.225-1.113-1.693-.473-.468-1.033-.831-1.68-1.093-.647-.262-1.326-.393-2.037-.393zm8.893-1.333c.329 0 .604.109.827.327.222.218.333.493.333.827 0 .334-.111.61-.333.827-.223.218-.498.327-.827.327-.334 0-.61-.109-.827-.327-.218-.218-.327-.493-.327-.827 0-.334.109-.61.327-.827.218-.218.493-.327.827-.327z"/>
                                        </svg>
                                        <span className="text-sm">演示</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                太空主题的生存游戏，玩家在外太空环境中收集资源、建造基地、对抗外星生物。包含飞船升级、武器系统、科技树等深度玩法，提供紧张刺激的生存体验。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="skill-badge-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">Unity</span>
                                <span className="skill-badge-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">C#</span>
                                <span className="skill-badge-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">3D游戏</span>
                                <span className="skill-badge-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">生存游戏</span>
                            </div>
                        </div>

                        <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-transparent rounded-none shadow-none">
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">SmallPoolTone</h3>
                                <div className="ml-auto flex items-center gap-4">
                                    <a href="https://github.com/fxy725/SmallPoolTone" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-sm">源码</span>
                                    </a>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 cursor-not-allowed">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.507 2.246 1.56 3.773v7.286c-.054 1.51-.578 2.769-1.574 3.773-.995 1.003-2.247 1.506-3.773 1.56H5.333c-1.51-.054-2.769-.578-3.773-1.574C.556 19.043.053 17.79 0 16.267V8.98c.054-1.51.578-2.769 1.574-3.773C2.57 4.203 3.822 3.7 5.333 3.647h12.48zm.854 1.514H5.333c-.976.036-1.775.336-2.397.899-.622.562-.936 1.345-.942 2.347v7.286c.036.976.336 1.775.899 2.397.562.622 1.345.936 2.347.942h13.286c.976-.036 1.775-.336 2.397-.899.622-.562.936-1.345.942-2.347V8.98c-.036-.976-.336-1.775-.899-2.397-.622-.622-1.372-.936-2.347-.942zM12 7.893c.876 0 1.726.165 2.548.493.822.329 1.527.793 2.117 1.393.59.599 1.05 1.305 1.38 2.118.329.813.493 1.663.493 2.548 0 .893-.165 1.743-.493 2.548-.329.804-.793 1.5-1.38 2.083-.59.583-1.295 1.038-2.117 1.367-.822.329-1.672.493-2.548.493-.876 0-1.726-.165-2.548-.493-.822-.329-1.527-.793-2.117-1.393-.59-.599-1.05-1.305-1.38-2.118-.329-.813-.493-1.663-.493-2.548 0-.72.165-1.41.493-2.07.329-.66.793-1.225 1.38-2.083.59-.583 1.295-1.038 2.117-1.367.822-.329 1.672-.493 2.548-.493zm0 1.514c-.711 0-1.39.13-2.037.393-.647.262-1.207.626-1.68 1.093-.473.466-.844 1.025-1.113 1.676-.27.65-.404 1.343-.404 2.08 0 .72.135 1.41.404 2.07.27.66.64 1.225 1.113 1.693.473.468 1.033.831 1.68 1.093.647.262 1.326.393 2.037.393.711 0 1.39-.13 2.037-.393.647-.262 1.207-.626 1.68-1.093.473.466.844 1.025 1.113 1.676.27.65.404 1.343.404 2.08 0-.72-.135-1.41-.404-2.07-.27-.66-.64-1.225-1.113-1.693-.473-.468-1.033-.831-1.68-1.093-.647-.262-1.326-.393-2.037-.393zm8.893-1.333c.329 0 .604.109.827.327.222.218.333.493.333.827 0 .334-.111.61-.333.827-.223.218-.498.327-.827.327-.334 0-.61-.109-.827-.327-.218-.218-.327-.493-.327-.827 0-.334.109-.61.327-.827.218-.218.493-.327.827-.327z"/>
                                        </svg>
                                        <span className="text-sm">演示</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                基于Next.js构建的现代化个人博客系统，采用小石潭主题设计，支持MDX文章管理、深色模式、搜索功能、标签系统等特性。专注于技术文章分享，具有优秀的SEO优化和响应式设计。
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="skill-badge-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">Next.js</span>
                                <span className="skill-badge-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">TypeScript</span>
                                <span className="skill-badge-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">Tailwind CSS</span>
                                <span className="skill-badge-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">MDX</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="p-6 md:p-8 bg-transparent rounded-none shadow-none">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            有任何问题或想要交流技术话题，欢迎通过邮箱联系我：
                        </p>
                        <a href="mailto:849517015@qq.com" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            849517015@qq.com
                        </a>
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
