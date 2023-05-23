import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="mb-8 py-4 ">
        <nav className="container justify-center flex flex-row space-x-10 font-mono mx-auto">
          <Link href="/">
            DirezioneVerso
          </Link>
          <Link href="/poesie/poesie">
            Poesie
          </Link>
          <Link href="/about">
            About me
          </Link>
        </nav>
      </header>
      
      <main className="container mx-auto flex flex-auto justify-center">{children}</main>
      
      <footer className="mt-8 py-4">
        <div className="container mx-auto flex font-mono justify-center">
          &copy; 2022 Informatropico
        </div>
      </footer>
    </div>
  );
}
