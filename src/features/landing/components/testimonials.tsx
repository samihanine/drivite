"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";
import { StarIcon } from "@heroicons/react/24/solid";
import { Testimonial } from "../queries/get-testimonials";

const TestimonialCard = ({
  title,
  stars,
  age,
  testimonial,
  name,
  delay,
}: {
  title: string;
  name: string;
  stars: number;
  age: number;
  testimonial: string;
  delay: number;
}) => {
  return (
    <motion.div
      className="bg-background rounded-lg px-6 py-12 w-full flex gap-6 cursor-pointer transition-transform duration-300 hover:scale-105"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      <div className="flex flex-col items-center justify-center w-1/3 gap-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ rotate: 360 }}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.2 }}
        >
          <Image
            src={"/images/landing/user.png"}
            alt="Testimonial"
            className="w-24 h-24 rounded-full mb-3"
          />
        </motion.div>

        <Typography variant="h4" className="text-center">
          {name}
        </Typography>
        <Typography variant="paragraph" className="text-center">
          {title}
        </Typography>
        <Typography variant="small" className="text-center">
          {age} ans
        </Typography>
      </div>
      <div className="flex flex-col w-2/3 gap-6">
        <motion.div
          className="flex gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: delay + 0.4 }}
        >
          {Array.from({ length: stars }).map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3, rotate: 15 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <StarIcon className="h-7 w-7 text-yellow-400" />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: delay + 0.6 }}
        >
          <Typography variant="paragraph">{testimonial}</Typography>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Testimonials = (props: { testimonials: Testimonial[] }) => {
  return (
    <div className="py-20 bg-[#003F88]">
      <Container className="relative h-full flex flex-col gap-4 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography variant="h2" className="text-white">
            Témoignages de nos clients
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Typography
            variant="paragraph"
            className="max-w-xl text-center text-white"
          >
            Nos clients sont notre priorité, découvrez ce qu&apos;ils pensent de
            nous.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full mt-8">
          {props.testimonials.slice(0, 2).map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              title={testimonial.title}
              name={testimonial.name}
              age={testimonial.age}
              stars={testimonial.stars}
              testimonial={testimonial.testimonial}
              delay={index * 0.4}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
