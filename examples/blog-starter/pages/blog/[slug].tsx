import Head from 'next/head'
import { format, parseISO } from 'date-fns'
import { allPosts, Post } from 'wesjet/static'
import { MakeMdx } from 'wesjet/hooks'
import styles from '~/styles/main.module.css'

export async function getStaticPaths() {
  const paths: string[] = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post: Post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  return {
    props: {
      post,
    },
  }
}

const PostLayout = ({ post }: { post: Post }) => {
  const PostContent = MakeMdx(post.body.code)

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <p>{post.title}</p>
          <time dateTime={post.date} className={styles.description}>
            {format(parseISO(post.date), 'MMMM d, yyyy')}
          </time>
          <PostContent />
        </div>
      </main>
    </>
  )
}

export default PostLayout
