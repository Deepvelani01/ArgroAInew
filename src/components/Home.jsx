import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/background1.jpg";
import stockManagementImage from "../assets/stock_management.png";
import taskManagementImage from "../assets/taskmanage.png";
import weatherImage from "../assets/weather.png";
import profile from "../assets/profile1.png";
import AgroaiImage from "../assets/Agroai.png";
import scanPlantImage from "../assets/scanplant.png";
import Dairyfarm from "../assets/Dairyfarm.png"

const Home = () => {
  const userName = "Farmer John";
  const userLocation = "Rajkot, Gujarat";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Top Navigation */}
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={AgroaiImage} alt="AgroAI Logo" className="h-14" />
         
        </div>

        <nav className="flex items-center space-x-10">
          <Link className="text-gray-600 hover:text-green-700 font-medium" to="/about">About</Link>
          <Link className="text-gray-600 hover:text-green-700 font-medium" to="/contact">Contact</Link>
          <Link className="text-gray-600 hover:text-green-700 font-medium" to="/weather">Weather</Link>
          <Link className="text-gray-600 hover:text-green-700 font-medium" to="/tasks">Tasks</Link>

          <Link to="/profile">
            <img src={profile} alt="Profile" className="h-12 w-12 rounded-full border" />
          </Link>
        </nav>
      </header>

      {/* Welcome Section */}
      <section className="px-10 py-8 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-b-3xl shadow-md">
        <h2 className="text-3xl font-bold mb-1">Welcome, {userName}</h2>
        <p className="opacity-90">Location: {userLocation}</p>
      </section>

      {/* Main Content */}
      <main className="px-10 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Weather Card */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200">
          <div className="flex items-center space-x-4">
            <img src={weatherImage} className="w-16 h-16" alt="Weather" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">Weather Report</h3>
              <p className="text-gray-600 text-sm">Current: 30°C, Sunny</p>
              <p className="text-gray-500 text-sm">Location: {userLocation}</p>
            </div>
          </div>
          <Link to="/weather" className="text-green-700 font-medium hover:underline mt-4 inline-block">
            View Details →
          </Link>
        </div>

        {/* Scan Plant Card */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200">
          <div className="flex items-center space-x-4">
            <img src={scanPlantImage} className="w-16 h-16" alt="Scan Plant" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">Scan Plant</h3>
              <p className="text-gray-600 text-sm">Detect diseases using AI.</p>
            </div>
          </div>
          <Link to="/SelectCrop" className="text-green-700 font-medium hover:underline mt-4 inline-block">
            Start Scan →
          </Link>
        </div>

        {/* Task Management Card */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200">
          <div className="flex items-center space-x-4">
            <img src={taskManagementImage} className="w-16 h-16" alt="Task" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">Task Management</h3>
              <p className="text-gray-600 text-sm">Upcoming: Irrigation scheduled tomorrow.</p>
            </div>
          </div>
          <Link to="/tasks" className="text-green-700 font-medium hover:underline mt-4 inline-block">
            View All Tasks →
          </Link>
        </div>

        {/* Stock Management */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200">
          <div className="flex items-center space-x-4">
            <img src={stockManagementImage} className="w-16 h-16" alt="Stock" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">Stock Management</h3>
              <p className="text-gray-600 text-sm">Fertilizer stock running low.</p>
            </div>
          </div>
          <Link to="/stock" className="text-green-700 font-medium hover:underline mt-4 inline-block">
            Manage Stock →
          </Link>
        </div>
        {/* Dairy Farm Management */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200">
          <div className="flex items-center space-x-4">
            <img src={Dairyfarm} className="w-16 h-16" alt="Stock" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">Dairy Farm Management</h3>
              <p className="text-gray-600 text-sm">Feed stock running low.</p>
            </div>
          </div>
          <Link to="/dairy" className="text-green-700 font-medium hover:underline mt-4 inline-block">
            Dairy Farm →
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-6 text-center border-t mt-6">
        <div className="mb-2">
          <img src={AgroaiImage} alt="AgroAI" className="h-14 mx-auto" />
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} AgroAI — Empowering Farmers with Smart Insights
        </p>
        <div className="flex justify-center space-x-6 mt-2 text-sm">
          <Link to="/about" className="hover:text-green-700">About</Link>
          <Link to="/contact" className="hover:text-green-700">Contact</Link>
          <Link to="/privacy" className="hover:text-green-700">Privacy</Link>
        </div>
      </footer>

    </div>
  );
};

export default Home;
