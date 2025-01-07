import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">页面未找到</h2>
      <p className="text-gray-600 mb-4">抱歉，您访问的页面不存在</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        返回首页
      </Link>
    </div>
  );
} 