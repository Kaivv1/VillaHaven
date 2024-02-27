import { useEffect, useState } from "react";
import Accordion from "../components/Accordion";
import SubmitQuestionForm from "../components/SubmitQuestionForm";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";
const ContactPage = () => {
  const [FAQs, setFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useChangeDocumentTitle(`Contacts`);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://villa-haven-api.vercel.app//get-FAQs");

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
        <Accordion FAQs={FAQs} isLoading={isLoading} error={error} />
      </div>
      <div className="support-wrapper">
        <div className="support-image"></div>
        <SubmitQuestionForm />
      </div>
    </div>
  );
};

export default ContactPage;
