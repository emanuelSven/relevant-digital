import { FormEvent, useState } from "react";
import Markdown from "markdown-to-jsx";
import "./App.css";
import MyPieChart from "./component/PieChartComponent";

interface IMessage {
  role: "You" | "Eman-bot";
  content: string;
}

function App() {
  const [message, setMessage] = useState("So, why is Emanuel a good fit for Relevant Digital?");
  const [convo, setConvo] = useState<IMessage[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      setMessage("");
    }

    try {
      const response = await fetch(`/api/v1/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, prevConvo: convo }),
      });

      const data = await response.json();

      if (data.convo.length) {
        setConvo(data.convo);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="App">
      <main className="flex-col">
        <div className="links flex-row">
          <a rel="noreferrer" href="https://github.com/emslGit" target="_blank">GitHub</a>
          <a rel="noreferrer" href="https://www.linkedin.com/in/emanuel-slatteby/" target="_blank">LinkedIn</a>
          <a rel="noreferrer" href="https://github.com/emanuelSven/relevant-digital" target="_blank">Source Code</a>
        </div>
        <section className="chat flex-col">
          <div className="chat__convo flex-col">
            {convo.map((message, idx) => (
              <p key={idx}>
                <b>{message.role}:</b>{" "}
                <span className="chat__convo__content"><Markdown>{(message.content)}</Markdown></span>
              </p>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex-row">
            <input
              className="chat__input"
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me why I'm a good fit for Relevant Digital"
              required
            />
            <button className="chat__btn" type="submit" disabled={isButtonDisabled}>Send</button>
          </form>
        </section>
        <section className="thesis flex-col">
          <div className="thesis__text flex-col">
            <h1>Hi, I'm Emanuel. Full-stack developer and engineer.</h1>
            <p>
              And I want to work at Relevant Digital! With 4 years of experience working on and managing projects I think I could make a great addition to your team. Here is why:
            </p>
            <hr></hr>
            <b>You are an ad-tech company that works with visualizing big data.</b>
            <ul>
              <li>At my position at Burt, this is exactly what I did. Even if I was a lot more junior back then, it still gives me an understanding of what you do and why it is important.</li>
            </ul>
            <div className="chart flex-col">
              <b>Should Emanuel work at Relevant Digital?</b>
              <MyPieChart />
            </div>
            <b>You are looking for someone with a degree in computer science or similar field and around 5 years of experience...</b>
            <ul>
              <li>My education at Chalmers included courses in data structures and algorithms, machine learning and more.</li>
              <li>4 years of professional experience, but I have done frontend development as a freelancer and hobbyist for 10 years.</li>
            </ul>
            <b>Someone proficient in javascript and its various frameworks...</b>
            <ul>
              <li>At Burt, our main framework was angular. At ESSIQ and at my current employment we worked with react or handlebars (template rendering engine), and on the side I have done projects in Svelte and Vue.</li>
              <li>Because of the nature of a lot of the projects, which we had to build from scatch, for many of them we had to evaluate various frameworks not just for the frontend and backend but also for specific tasks such as game engines, etc.</li>
              <li>Additionally I have evaluated and worked with frameworks such as laravel, rails, flutter, django and asp.net.</li>
            </ul>
            <b>And also in linux and C++...</b>
            <ul>
              <li>As the 2nd line technical support I worked with a linux based system for Picadeli AB. Worked on their "intelligent" salad disks to fix network issues and control system irregularities. Since food safety was number one priority we had to work fast.</li>
              <li>Additionally, my background as a mechatronical engineer and my work on embedded projects at ESSIQ has taught me industry standard development in C and C++.</li>
              <li>Lastly, during my employment at ESSIQ we used linux as a daily driver. And before this, Linux had been my go-to platform for many years.</li>
            </ul>
            <b>Who has some hobby projects...</b>
            <ul>
              <li>Custom real time chat and event management with (flutter, node, socket.io).</li>
              <li>Spanish learning tool with AI generated example sentences and automated translations (python).</li>
              <li>Budgeting tool with monte carlo forecasting and visualization through graphs (react).</li>
              <li>Dashboard with recipes (angular).</li>
              <li>Robotic hand controlled and designed from scratch (c++/fusion-360).</li>
              <li>Automation tasks such as blocket webscraper with live alerts (python).</li>
              <li>Västtrafik custom journey planner (python).</li>
              <li>And more...</li>
            </ul>
            <b>And strong collaboration skills and a positive attitude towards teamwork...</b>
            <ul>
              <li>Having been part of and led various teams consisting of both developers, UX/designers and sometimes sales/support has helped me gain experience of working in teams.</li>
              <li>Additionally having played in bands has taught the importance of teamwork, but most importantly how fun it can be to do something with other similar people.</li>
            </ul>
            <hr></hr>
            <h3>Frequently Asked Questions:</h3>
            <p>
              <b>Q: Is this your best site?</b>
              <br></br>
              <span>A: It's a bit sloppy and overengineered, but I think sometimes you cannot spend too much time making everything perfect. In this case what I would improve is abstraction, rework the css with utility classes or tailwind and streamline the build process.</span>
            </p>
            <p>
              <b>Q: What's your main strength?</b>
              <br></br>
              <span>A: My main strength is javascript/typescript based frameworks for both backend and frontend. However I have also worked a bit with embedded in C/C++ as well as python. Working on a couple of startups we had to be organised and take on many roles.</span>
            </p>
            <p>
              <b>Q: What are you looking for in an employer?</b>
              <br></br>
              <span>
                A: A company that is not too big, to get the familiar vibes and to be able to feel like I make a difference. To work with great customers and on fun projects. The stack is less important. Lastly, even if it is a challenge with remote work great colleagues is a big plus.
              </span>
            </p>
            <p>
              <b>Q: How much will you be in Sweden?</b>
              <br></br>
              <span>A: My home, friends and family are still in Sweden, and I will be spending at the very least a couple of months each year in Sweden or even Stockholm.</span>
            </p>
            <p>
              <b>Q: What do you love to do?</b>
              <br></br>
              <span>A: I love music, exploring new places and and trying new things.</span>
            </p>
          </div>
        </section >
      </main >
    </div >
  );
}

export default App;