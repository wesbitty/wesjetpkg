import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'wesjet/static'
import { MakeMdx } from 'wesjet/hooks'
import styles from '../../styles/Home.module.css'

function PostCard(post: Post) {
  const PostContent = MakeMdx(post.body.code)

  return (
    <div className={styles.grid}>
      <h2>
        <Link href={post.url} legacyBehavior>
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className={styles.description}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className={styles.center}>
        <PostContent />
      </div>
    </div>
  )
}

export default function BlogPage() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className={styles.main}>
      <h1>Blog</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
