import React from "react";
import { assets } from "../assets/assets";



const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:flex-row gap-14 my-10 mt-40 text-sm">
        {/*-----left section---- */}
        <div className="flex-1 flex flex-col justify-start">
          <img className="mb-6 w-16" src={assets.logo} alt=" " />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            We connect patients with the right doctors, making healthcare more
            accessible and efficient. Our mission is to simplify the appointment
            process, helping you find the best medical professionals to meet.
            your unique needs.
          </p>
        </div>

        {/*-----center section---- */}
        <div className="flex-1">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/*-----right section---- */}
        <div className="flex-1">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+8801762512609</li>
            <li>serenblue@gmail.com</li>
          </ul>
        </div>
      </div>
      {/*-----copyright-----*/}
      <div className="flex justify-center">
        <hr />
        <p className="py-5 text-sm text-center w-full">
          Copyright 2025@ prescription All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;