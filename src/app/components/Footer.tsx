import {AiFillLinkedin, AiFillGithub} from "react-icons/ai"

export default function Footer() {
  return (
    <footer className="mt-5">
        <section className="mx-auto max-w-3xl footer-grid-container">
            <div className="footer-grid-item flex flex-col">
                <h2 className="text-lg">
                    Follow
                </h2>
                <div className="flex gap-2  text-2xl">
                <a className="footer-link" href="https://github.com/Harman-preet-singh13" target="_blank" rel="noopener noreferrer">
                    <AiFillGithub />
                </a>
                <a className="footer-link" href="https://www.linkedin.com/in/harman-preet-singh13/" target="_blank" rel="noopener noreferrer">
                    <AiFillLinkedin />
                </a>
                </div>
            </div>
            <div className="footer-grid-item flex flex-col">
                <h2 className="text-lg">
                    Api by
                </h2>
                <a className="footer-link text-sm hover:underline" href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">
                    NewsApi
                </a>
            </div>
        </section>
    </footer>
  )
}
