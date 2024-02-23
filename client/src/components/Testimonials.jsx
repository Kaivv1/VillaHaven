import { useEffect, useState } from "react";
import { getTestimonials } from "../helpers/testimonialsHelperFunctions";
import StarRating from "../ui/stars/StarRating";
import Slider from "./Slider";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getTestimonials();
      setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="testimonials-container">
      <div className="testimonials-wrapper">
        <Slider autoSlide={true}>
          {testimonials.map((testimonial) => (
            <div className="testimonial-container" key={testimonial._id}>
              <span className="testimonial-comma"></span>
              <StarRating maxRating={5} currRating={testimonial.rating} />
              <h2>{testimonial.title}</h2>
              <p>{testimonial.text}</p>
              <div className="testimonial-customer">
                <img src={testimonial.picture} alt="" />
                <div>
                  <p>
                    {testimonial.firstName} {testimonial.lastName}
                  </p>
                  <p>{testimonial.job}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
