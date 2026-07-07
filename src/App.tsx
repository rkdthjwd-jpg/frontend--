import { useState } from "react";
import frogImg from "./assets/frog.png";
import "./App.css";

type HeartParticle = {
  id: number;
  left: number;
  bottom: number;
  rotate: number;
  size: number;
};

const fortuneCards = [
  {
    title: "「기회의 문」",
    message1: "평소 지나쳤던 작은 기회가 눈에 들어오는 날이에요.",
    message2: "새로운 제안이나 연락을 가볍게 넘기지 마세요.",
    document: "⭐⭐⭐⭐",
    interview: "⭐⭐⭐",
    test: "⭐⭐⭐⭐",
    keyword: "먼저 연락하기",
  },
  {
    title: "「한 번 더 수정」",
    message1: "작은 수정이 예상보다 큰 차이를 만들 수 있는 날이에요.",
    message2: "제출 전 자소서와 포트폴리오를 한 번 더 확인해보세요.",
    document: "⭐⭐⭐⭐⭐",
    interview: "⭐⭐⭐",
    test: "⭐⭐⭐⭐",
    keyword: "마지막 점검하기",
  },
  {
    title: "「준비된 답변」",
    message1: "오늘은 생각을 말로 표현하는 힘이 좋은 날이에요.",
    message2: "예상 질문 하나를 골라 직접 소리 내어 답변해보세요.",
    document: "⭐⭐⭐",
    interview: "⭐⭐⭐⭐⭐",
    test: "⭐⭐⭐⭐",
    keyword: "자신 있게 말하기",
  },
];

function App() {
  const [count, setCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isFallen, setIsFallen] = useState(false);
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  const [fortuneIndex, setFortuneIndex] = useState(0);

  const fortune = fortuneCards[fortuneIndex];

  const changeFortune = () => {
    setFortuneIndex((fortuneIndex + 1) % fortuneCards.length);
  };

  const addLike = () => {
    setIsFallen(false);
    setLikeCount((likeCount) => likeCount + 1);
    setHearts((hearts) => {
      const newHeart = {
        id: Date.now(),
        left: 6 + Math.random() * 82,
        bottom: 8 + Math.random() * 172,
        rotate: -28 + Math.random() * 56,
        size: 18 + Math.random() * 14,
      };

      return [...hearts, newHeart];
    });
  };

  return (
    <>
      <section id="center">
        <div>
          <div className="title-row">
            <h1>
              지켜보고있다 <span className="watch-eyes">👀</span>
            </h1>
          </div>
        </div>

        <div className="visitor-panel">
          <p className="visitor-count">
            방문자 숫자: {count}
          </p>

          <div className="button-row">
            <button
              type="button"
              className="counter"
              onClick={() => setCount((count) => count + 1)}
            >
              count +
            </button>

            <button
              type="button"
              className="counter"
              onClick={() =>
                setCount((count) => Math.max(0, count - 1))
              }
            >
              count -
            </button>

            <button onClick={() => setCount(0)}>
              reset
            </button>
          </div>
        </div>

        <div className="content-row">
          <div className="like-panel">
            <div className="frog-stage">
              <div className="like-post">
                <div className="post-header">
                  <img src={frogImg} className="post-avatar" alt="" />
                  <span className="post-user">frog_likey</span>
                </div>

                <button
                  type="button"
                  className="post-body"
                  onClick={addLike}
                  aria-label="개구리 좋아요 누르기"
                >
                  <span className="floating-heart floating-heart-one">♥</span>
                  <span className="floating-heart floating-heart-two">♥</span>
                  <span className="floating-heart floating-heart-three">♥</span>
                  <span className="likey-text">
                    ME
                    <br />
                    LIKEY!
                  </span>

                  <img
                    key={likeCount}
                    src={frogImg}
                    className={`frog-img ${isFallen ? "fallen" : ""}`}
                    alt="Frog"
                  />

                  <div className="heart-pile" aria-hidden="true">
                    {hearts.map((heart) => (
                      <span
                        key={heart.id}
                        className="heart-particle"
                        style={{
                          left: `${heart.left}%`,
                          bottom: `${heart.bottom}px`,
                          fontSize: `${heart.size}px`,
                          transform: `translateX(-50%) rotate(${heart.rotate}deg)`,
                        }}
                      >
                        ♥
                      </span>
                    ))}
                  </div>
                </button>

                <div className="post-footer">
                  <div className="post-actions">
                    <span className="post-heart">♥</span>
                    <strong className="post-like-count">{likeCount}</strong>
                    <button
                      type="button"
                      className="post-reset"
                      onClick={() => {
                        setLikeCount(0);
                        setIsFallen(true);
                        setHearts([]);
                      }}
                    >
                      reset
                    </button>
                  </div>
                  <p className="post-caption">
                    THANKS FOR GIVING ME HEARTS!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="fortune-heading">
              🔮 오늘의 취뽀운세
            </h2>

            <p className="card-label">
              오늘의 카드
            </p>

            <h3 className="card-title">
              {fortune.title}
            </h3>

            <p className="card-text">
              {fortune.message1}
              <br />
              {fortune.message2}
            </p>

            <div className="fortune-stars">
              <p>
                💼 <strong>서류운</strong>{" "}
                <span>{fortune.document}</span>
              </p>

              <p>
                🎤 <strong>면접운</strong>{" "}
                <span>{fortune.interview}</span>
              </p>

              <p>
                📚 <strong>시험운</strong>{" "}
                <span>{fortune.test}</span>
              </p>
            </div>

            <p className="fortune-keyword">
              🍀 <strong>행운의 키워드</strong>:
              <span className="keyword-badge">
                {fortune.keyword}
              </span>
            </p>

            <button
              type="button"
              className="fortune-button"
              onClick={changeFortune}
            >
              🎴 다른 카드 뽑기
            </button>
          </div>
        </div>

        <section className="contact-section">
          <h2 className="contact-title">Contact us</h2>
          <a
            className="kiwoom-link"
            href="https://www1.kiwoom.com/h/main"
            target="_blank"
            rel="noreferrer"
            aria-label="키움증권 사이트로 이동"
          >
            <span className="kiwoom-logo-text">키움증권</span>
            <span className="kiwoom-arrow" aria-hidden="true"></span>
          </a>
        </section>
      </section>
    </>
  );
}

export default App;
