import { useEffect, useState } from "react";
import Accordion from "../components/Accordion";
import SubmitQuestionForm from "../components/SubmitQuestionForm";
const ContactPage = () => {
  const [FAQs, setFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const faqs = document.querySelectorAll(".FAQ");
  const splitFAQs = (arr) => {
    const half = arr.length / 2;
    const column1 = FAQs.slice(0, half);
    const column2 = FAQs.slice(half);

    return [column1, column2];
  };
  const FAQsArr = splitFAQs(FAQs);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:4000/getFAQs");

        const data = await res.json();
        setFAQs(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      e.stopPropagation();
      const currentClickedAnswer = e.currentTarget.querySelector(".answer");
      const currentClickedArrow = e.currentTarget.querySelector(".label");
      faqs.forEach((faq) => {
        const otherClickedAnswer = faq.querySelector(".answer");
        const otherClickedArrow = faq.querySelector(".label");

        if (
          otherClickedAnswer !== currentClickedAnswer &&
          otherClickedAnswer.classList.contains("active") &&
          otherClickedArrow !== currentClickedArrow &&
          otherClickedArrow.classList.contains("active")
        ) {
          otherClickedAnswer.classList.remove("active");
          otherClickedArrow.classList.remove("active");
        }
      });
      currentClickedAnswer.classList.toggle("active");
      currentClickedArrow.classList.toggle("active");
    };

    faqs.forEach((faq) =>
      faq.addEventListener("click", handleClick.bind(this))
    );

    return () => {
      faqs.forEach((faq) =>
        faq.removeEventListener("click", handleClick.bind(this))
      );
    };
  }, [faqs]);
  return (
    <div className="contacts-container">
      <header>
        <h1>Frequently asked questions</h1>
        <p>
          Find clarity and convenience with our comprehensive list of frequently
          asked questions. We&apos;ve compiled insightful answers to address
          your concerns, ensuring a seamless experience from inquiry to booking.
          Discover all you need to know about our villas, amenities, and booking
          process in one convenient space.
        </p>
      </header>
      <div className="accordions-wrapper">
        {FAQsArr.map((FAQs, i) => (
          <Accordion key={i} FAQs={FAQs} isLoading={isLoading} error={error} />
        ))}
      </div>

      <div className="support-wrapper">
        <div className="support-image"></div>
        <SubmitQuestionForm />
      </div>
    </div>
  );
};

export default ContactPage;
