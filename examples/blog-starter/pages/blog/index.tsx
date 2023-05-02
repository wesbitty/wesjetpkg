import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'wesjet/static'

export async function getStaticProps() {
  const blog: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { blog } }
}

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link href={post.url} className="text-blue-700 hover:text-blue-900" legacyBehavior>
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="block text-xs text-gray-600 mb-2">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className="text-sm" dangerouslySetInnerHTML={{ __html: post.body.code }} />
    </div>
  )
}

export default function Home({ blog }: { blog: Post[] }) {
  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Wesjet Starter</h1>

      {blog.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
