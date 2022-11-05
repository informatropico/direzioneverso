import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from 'remark-gfm';
import Link from "next/link";

export async function getStaticPaths() {
  // Retrieve all our slugs
  const files = fs.readdirSync("posts");

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);

  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      frontmatter,
      contentHtml,
    },
  };
}

function Navigation(props) {
  if ((props.next !== "null") && (props.prev !== "null")) {
    return (
      <div className="px-2 flex space-x-5 font-mono">
        <Link href={`/poesie/${props.prev}`} className="border border-white m-2 p-2 rounded-xl overflow-hidden">Precedente</Link>
        <Link href={`/poesie/${props.next}`} className="border border-white m-2 p-2 rounded-xl overflow-hidden">Prossima</Link>
      </div>
    );
  } else {
    if (props.next !== "null") {
      return (
        <div className="px-2 flex space-x-5 font-mono">
          <Link href={`/poesie/${props.next}`} className="border border-white m-2 p-2 rounded-xl overflow-hidden">Prossima</Link>
        </div>
      );
    } else {
      return (
        <div className="px-2 flex space-x-5 font-mono">
          <Link href={`/poesie/${props.prev}`} className="border border-white m-2 p-2 rounded-xl overflow-hidden">Precedente</Link>
        </div>
      );
    }
  }
}

export default function PoesiaPage({ frontmatter, contentHtml }) {
  return (
    <div className="prose mx-auto px-5 font-mono">
      <h1 className="text-xl">{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <h3 className="text-lg">{frontmatter.date}</h3>
      <Navigation prev={frontmatter.prev} next={frontmatter.next} />
    </div>
  );
}
