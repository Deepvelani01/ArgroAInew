import React, { useState } from "react";
import AnimalInventory from "./AnimalInventory";
import {MilkProduction} from "./MilkProduction";
import {Reproduction} from "./Reproduction";
// import { FeedNutrition } from "./FeedNutrition";
import  HealthAndVet  from "./HealthAndVet";
import ExpenseIncome from "./ExpenseIncome";
import MilkSales from "./MilkSales";
import StockManagement from "./StockManagement";
import Tasks from "./Tasks";

const DairyDashboard = () => {
  const tabs = [
    "Animals",
    "Milk Production",
    "Reproduction",
    // "Feed & Nutrition",
    "Health Records",
    "Expense & Income",
    "Milk Sales",
    "Stock",
    "Tasks",
  ];

  const [activeTab, setActiveTab] = useState("Animals");

  const renderTab = () => {
    switch (activeTab) {
      case "Animals": return <AnimalInventory />;
      case "Milk Production": return <MilkProduction />;
      case "Reproduction": return <Reproduction />;
    //   case "Feed & Nutrition": return <FeedNutrition />;
      case "Health Records": return <HealthAndVet />;
      case "Expense & Income": return <ExpenseIncome />;
      case "Milk Sales": return <MilkSales />;
      case "Stock": return <StockManagement />;
      case "Tasks": return <Tasks />;
      default: return null;
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Dairy Farm Management
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg shadow-sm ${
              activeTab === tab
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {renderTab()}
      </div>
    </div>
  );
};

export default DairyDashboard;
