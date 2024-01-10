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
      console.log(data);
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="testimonials-container">
      <div className="testimonial-header">
        <h1>What our customers say about us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum,
          reiciendis aperiam accusantium animi odio ea facilis at assumenda est
          quae autem, pariatur maiores sed laboriosam
        </p>
      </div>
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
