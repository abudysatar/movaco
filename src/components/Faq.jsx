import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";

const faqItems = [
  {
    value: "q1",
    question: "What is Movaco?",
    answer:
      "Movaco is a movie discovery platform that helps you explore trending films, TV shows, and more.",
  },
  {
    value: "q2",
    question: "How often is content updated?",
    answer:
      "Content is updated daily to keep up with the latest releases and trends.",
  },
  {
    value: "q3",
    question: "Do I need an account to use Movaco?",
    answer:
      "No, you can browse content freely. Some features, however, may require signing in.",
  },
  {
    value: "q4",
    question: "Can I watch trailers?",
    answer:
      "Yes! Most movie and show pages include official trailers you can watch instantly.",
  },
  {
    value: "q5",
    question: "Is Movaco free to use?",
    answer:
      "Yes, Movaco is completely free with optional premium features in development.",
  },
  {
    value: "q6",
    question: "Can I save my favorite movies?",
    answer:
      "Soon! We're adding watchlist and favorite features to personalize your experience.",
  },
  {
    value: "q7",
    question: "Which regions are supported?",
    answer:
      "Movaco supports global data with localized results for most countries.",
  },
  {
    value: "q8",
    question: "How do I contact support?",
    answer:
      "You can reach us anytime through the Support section or by email at support@movaco.com.",
  },
];

const Faq = () => {
  const column1 = faqItems.slice(0, 4);
  const column2 = faqItems.slice(4, 8);

  return (
    <section className="w-full bg-black-8 text-white  mt-20 md:mt-36">
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="md:text-huge-48 text-huge-mob-28 font-semibold mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-grey60 max-w-2xl ">
          Got questions? We've got answers! Check out our FAQ section to find
          answers to the most common questions about Movaco.{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <AccordionColumn items={column1} />
        <AccordionColumn items={column2} />
      </div>
    </section>
  );
};

const AccordionColumn = ({ items }) => (
  <Accordion.Root type="single" collapsible className="space-y-4 ">
    {items.map((item) => (
      <AccordionItem key={item.value} value={item.value}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion.Root>
);

const AccordionItem = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <Accordion.Item
      ref={ref}
      {...props}
      className={classNames(
        "rounded-lg border border-black-15 bg-black-10 overflow-hidden",
        className
      )}
    >
      {children}
    </Accordion.Item>
  )
);

const AccordionTrigger = React.forwardRef(({ children, ...props }, ref) => (
  <Accordion.Header>
    <Accordion.Trigger
      ref={ref}
      {...props}
      className={classNames(
        "relative flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-medium-18 font-medium text-white transition-all hover:bg-black-15 focus:outline-none group"
      )}
    >
      <span>{children}</span>
      <span
        className={classNames(
          "text-2xl font-bold transition-all duration-300",
          "group-hover:animate-pulse",
          "group-data-[state=open]:text-white group-data-[state=open]:animate-none"
        )}
      >
        <span className="group-data-[state=open]:hidden">+</span>
        <span className="hidden group-data-[state=open]:inline">−</span>
      </span>
      <span
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-main-red to-black opacity-90"
        aria-hidden="true"
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, ...props }, ref) => (
  <Accordion.Content ref={ref} {...props} className="overflow-hidden relative">
    <div
      className={classNames(
        "px-5 py-4 transition-all duration-500 ease-in-out",
        "data-[state=open]:translate-y-0 data-[state=open]:opacity-100",
        "data-[state=closed]:-translate-y-2 data-[state=closed]:opacity-0"
      )}
    >
      {children}
    </div>
  </Accordion.Content>
));

export default Faq;
