import React from 'react';
import Header from '../components/Header'; // 

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header /> 
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-accent mb-6">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to our store! We are dedicated to providing the best quality products 
          with fast delivery and excellent customer service. Our journey started in 2024 
          with a mission to make online shopping easier for everyone.
        </p>
      </div>
    </div>
  );
}