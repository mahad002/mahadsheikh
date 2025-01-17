import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons library

import { fadeIn } from "../../variants";
import { useState } from "react";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => alert("Thank you. I will get back to you ASAP."))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="h-full">
      <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
        {/* text & form */}
        <div className="flex flex-col w-full max-w-[700px]">
          {/* text */}
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-12"
          >
            Let's <span className="text-accent">connect.</span>
          </motion.h2>

          <div className="flex flex-col w-full max-w-[700px] pb-10">
          {/* Co-Founders heading */}
          <motion.h2
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-12 flex justify-center items-center gap-4"
          >
            Muhammad Mahad Sheikh
          </motion.h2>

          {/* buttons for Co-Founders */}
          <motion.div
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1 flex flex-wrap gap-6 w-full mx-auto items-center justify-center"
          >
            {/* Instagram Mahad */}
            <button
              className="btn rounded-full border border-white/50 max-w-[300px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent"
              onClick={() => handleRedirect("https://www.instagram.com/mahad.08/")}
            >
              <FaInstagram className="text-[22px] text-pink-500" />
              &nbsp;Instagram
              <BsArrowRight className="ml-2 text-[22px]" />
            </button>

            {/* LinkedIn Mahad */}
            <button
              className="btn rounded-full border border-white/50 max-w-[300px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent"
              onClick={() => handleRedirect("https://www.linkedin.com/in/muhammad-mahad-sheikh-989a2924b/")}
            >
              <FaLinkedin className="text-[22px] text-blue-500" />
              &nbsp;LinkedIn
              <BsArrowRight className="ml-2 text-[22px]" />
            </button>

            {/* Email Mahad */}
            <button
              className="btn rounded-full border border-white/50 max-w-[300px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent"
              onClick={() => handleRedirect("mailto:mahad112002@gmail.com")}
            >
              <FaEnvelope className="text-[22px] text-red-500" />
              &nbsp;Email
              <BsArrowRight className="ml-2 text-[22px]" />
            </button>

            {/* WhatsApp Mahad */}
            <button
              className="btn rounded-full border border-white/50 max-w-[300px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent"
              onClick={() => handleRedirect("https://wa.me/923105589303")}
            >
              <FaWhatsapp className="text-[22px] text-green-500" />
              &nbsp;Whatsapp
              <BsArrowRight className="ml-2 text-[22px]" />
            </button>
          </motion.div>

        </div>

          {/* form */}
          {/* <motion.form
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1 flex flex-col gap-6 w-full mx-auto"
            onSubmit={handleSubmit}
            autoComplete="off"
            autoCapitalize="off"
            // only needed for production (in netlify) to accept form input
            data-netlify="true"
          >
            <div className="flex gap-x-6 w-full">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input"
                disabled={isLoading}
                aria-disabled={isLoading}
                required
                aria-required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="input"
                disabled={isLoading}
                aria-disabled={isLoading}
                required
                aria-required
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="input"
              disabled={isLoading}
              aria-disabled={isLoading}
              required
              aria-required
            />
            <textarea
              name="message"
              placeholder="Message..."
              className="textarea"
              disabled={isLoading}
              aria-disabled={isLoading}
              required
              aria-required
            />
            <button
              type="submit"
              className="btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                Let's talk
              </span>

              <BsArrowRight
                className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]"
                aria-hidden
              />
            </button>
          </motion.form> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
