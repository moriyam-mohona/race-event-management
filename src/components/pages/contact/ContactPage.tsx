"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-montserrat font-semibold mb-6">
              Contact Us
            </h2>
            <p className="mb-8 text-gray-700">
              Feel free to reach out via the form below, or contact us directly
              through email or phone. We look forward to connecting with you and
              ensuring your next race experience is nothing short of delightful!
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-secondary" />
                <span className="text-gray-700">example@teamwebflow.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-secondary" />
                <span className="text-gray-700">
                  The Race Shop · New York, NY 10001
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-secondary" />
                <span className="text-gray-700">124 214 4521</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-medium  mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-100 text-gray-600 text-[15px] rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block font-medium  mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-100 text-gray-600 text-[15px] rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium  mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-100 text-gray-600 text-[15px] rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-medium  mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-100 text-gray-600 text-[15px] rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-medium  mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-100 text-gray-600 text-[15px] rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-fit bg-primary text-white py-2.5 px-20 rounded-md hover:bg-primary/80 transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
