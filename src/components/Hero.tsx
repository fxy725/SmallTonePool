import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          小石潭记
        </h1>
        <p className="text-xl mb-8 text-blue-100">
          技术心得 · 经验总结 · 学习笔记
        </p>
        <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
          分享编程路上的点点滴滴，记录技术成长的心路历程，
          让每一次学习都有迹可循，让每个经验都能帮助他人。
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/blog"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            浏览文章
          </Link>
          <Link 
            href="/tags"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            按标签查看
          </Link>
        </div>
      </div>
    </section>
  );
}