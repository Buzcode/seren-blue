import React, { useState } from 'react';

const FAQSection = () => {
    const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(null);

    const faqData = [
        {
            question: "What is Serenblue.com?",
            answer: "Serenblue.com is your online healthcare platform in Bangladesh, connecting you with qualified doctors, ambulance services, and health checkup facilities. We aim to make healthcare accessible and convenient for everyone."
        },
        {
            question: "What Services does Serenblue Provide?",
            answer: "Serenblue offers a range of healthcare services including online doctor appointments, ambulance booking (AC, ICU, and Air Ambulance), and booking for various health checkups and diagnostic tests like X-rays, ultrasounds, blood tests, and more."
        },
        {
            question: "How much do doctors' consultations on Serenblue cost?",
            answer: "The cost of doctor consultations varies depending on the doctor's specialization and experience. You can view the consultation fees on each doctor's profile before booking an appointment."
        },
        {
            question: "I don't know a lot about technology. What shall I do to get a doctor's appointment?",
            answer: "Don't worry! Our platform is designed to be user-friendly. You can easily browse doctors, select a time slot, and book an appointment in just a few clicks. If you need assistance, our customer support team is always ready to help you via phone or email."
        },
        {
            question: "What type of ambulance does Serenblue Provide?",
            answer: "Serenblue offers three types of ambulance services to cater to different needs: AC Ambulance for general patient transport, ICU Ambulance for critical patients requiring intensive care during transport, and Air Ambulance for emergency situations needing rapid transportation over long distances."
        },
        {
            question: "Do you offer a free home sample collection for health checkups?",
            answer: "Yes, for many of our health checkup packages and diagnostic tests, we offer free home sample collection within Dhaka city. Please check the details of your chosen package or test to see if home sample collection is available and applicable to your location."
        },
        {
            question: "Can physiotherapy treatment be performed at home?",
            answer: "Yes, we have partnered with qualified physiotherapists who offer home-based physiotherapy sessions. You can book a physiotherapy consultation and arrange for sessions to be conducted in the comfort of your home."
        },
        {
            question: "Do you have registered physiotherapists and doctors?",
            answer: "Absolutely. All doctors, specialists, and physiotherapists listed on Serenblue are fully registered and qualified professionals with valid licenses and credentials. We prioritize your safety and ensure you receive care from verified healthcare providers."
        },
        {
            question: "Why Reserve A Doctor Appointment At Serenblue?",
            answer: "Serenblue provides a seamless and reliable platform to book doctor appointments. You can choose from a wide range of specialists, view their availability, read patient reviews, and book appointments at your convenience. We also offer appointment reminders and easy rescheduling options."
        },
        {
            question: "What are the benefits of booking Doctor Appointment at Serenblue?", 
            answer: "Booking doctor appointments at Serenblue offers numerous benefits: convenience of online booking, access to a wide network of doctors, transparent pricing, appointment reminders, secure platform, and reliable customer support. We simplify your healthcare journey."
        }
    ];

    const toggleQuestion = (index) => {
        if (expandedQuestionIndex === index) {
            setExpandedQuestionIndex(null); 
        } else {
            setExpandedQuestionIndex(index); 
        }
    };

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Frequently asked questions</h2>
                <div className="mt-6">
                    <dl className="space-y-6">
                        {faqData.map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                                <dt className="text-lg">
                                    <button
                                        className="bg-white w-full text-left p-4 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 flex items-center justify-between"
                                        onClick={() => toggleQuestion(index)}
                                        aria-expanded={expandedQuestionIndex === index}
                                    >
                                        <span className="font-medium text-gray-900">{item.question}</span>
                                        <span className="ml-6 flex items-center">
                                            {expandedQuestionIndex === index ? (
                                                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10 10.586l2.707 2.707a1 1 0 01-1.414 1.414L10 11.414l-2.707 2.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </span>
                                    </button>
                                </dt>
                                {expandedQuestionIndex === index && (
                                    <dd className="mt-0 p-4 bg-gray-50">
                                        <p className="text-base text-gray-700">{item.answer}</p>
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;