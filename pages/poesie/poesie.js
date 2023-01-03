import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

export async function getStaticProps() {
  // Get all our posts
  const files = fs.readdirSync("posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", ""); // define the slug (URL) for the page, which is the filename without the .md part
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8"); // read the file by using the fs module again
    const { data: frontmatter } = matter(readFile); // use the matter package to read the file and extract the data object, but we destructure it as the variable frontmatter.

    return {
      slug,
      frontmatter,
    };
  });

  posts.sort((a, b) => a.frontmatter.date < b.frontmatter.date ? 1 : -1);

  return {
    props: {
      posts,
    },
  };
}

function LinkPoesia(props) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xs border-b">{props.data}</h3>
      <h1 className="text-xl">{props.titolo}</h1>
    </div>
  )
}

export default function Poesie({ posts }) {
  return (
    <ul className="items-center mx-auto">
      {posts.map(({ slug, frontmatter }) => (
        <li
          key={slug}
          className="m-4 flex flex-col items-center font-mono hover:bg-gray-200 p-3 rounded-lg"
        >
          <Link href={`/poesie/${slug}`} className="no-underline ">
            <LinkPoesia data={frontmatter.date} titolo={frontmatter.title} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
