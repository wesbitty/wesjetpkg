import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'wesjet/static'
import { MakeMdx } from 'wesjet/hooks'
import styles from '~/styles/main.module.css'
import Image from 'next/image'

function PostCard(post: Post) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <img
          alt="Thumbnail"
          src={!post.image ? `/images/blog-placeholder.png` : `/images/${post.image}`}
          width="100%"
          height="100%"
        />
        <time dateTime={post.date} className={styles.description}>
          {format(parseISO(post.date), 'MMMM d, yyyy')}
        </time>
        <p>
          <Link href={post.url}>{post.title}</Link>
        </p>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <main className={styles.main}>
      <h1>Latest Trend</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </main>
  )
}
