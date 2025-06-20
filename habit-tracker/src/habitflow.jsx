import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, Calendar, Target, BarChart3, Settings, User, Bell, ChevronRight, Flame, Award, Clock } from 'lucide-react';

const HabitFlow = () => {
  const [habits, setHabits] = useState([
    { 
      id: 1, 
      name: 'Meditation', 
      streak: 12, 
      completed: false, 
      category: 'Wellness',
      target: 30,
      completionRate: 85,
      lastCompleted: '2025-06-19'
    },
    { 
      id: 2, 
      name: 'Daily Exercise', 
      streak: 8, 
      completed: true, 
      category: 'Fitness',
      target: 45,
      completionRate: 72,
      lastCompleted: '2025-06-20'
    },
    { 
      id: 3, 
      name: 'Read', 
      streak: 15, 
      completed: false, 
      category: 'Learning',
      target: 30,
      completionRate: 91,
      lastCompleted: '2025-06-19'
    }
  ]);
  
  const [newHabit, setNewHabit] = useState('');
  const [newCategory, setNewCategory] = useState('Personal');
  const [showForm, setShowForm] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  const categories = ['Personal', 'Wellness', 'Fitness', 'Learning', 'Productivity', 'Social'];
  
  const addHabit = () => {
    if (newHabit.trim()) {
      const newHabitObj = {
        id: Date.now(),
        name: newHabit,
        streak: 0,
        completed: false,
        category: newCategory,
        target: 30,
        completionRate: 0,
        lastCompleted: null
      };
      setHabits([...habits, newHabitObj]);
      setNewHabit('');
      setShowForm(false);
    }
  };

  const toggleHabit = (id) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            completed: !habit.completed,
            streak: !habit.completed ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            lastCompleted: !habit.completed ? today : habit.lastCompleted,
            completionRate: !habit.completed ? 
              Math.min(100, habit.completionRate + 2) : 
              Math.max(0, habit.completionRate - 1)
          }
        : habit
    ));
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => habit.completed).length;
  const avgCompletionRate = habits.reduce((sum, habit) => sum + habit.completionRate, 0) / habits.length || 0;
  const longestStreak = Math.max(...habits.map(habit => habit.streak), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">HabitFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
          {['overview', 'habits', 'analytics'].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === view
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed Today</p>
                    <p className="text-3xl font-bold text-gray-900">{completedToday}/{totalHabits}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {Math.round((completedToday / totalHabits) * 100) || 0}% completion rate
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Longest Streak</p>
                    <p className="text-3xl font-bold text-gray-900">{longestStreak}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Days in a row
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Success Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{Math.round(avgCompletionRate)}%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-blue-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Across all habits
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Habits</p>
                    <p className="text-3xl font-bold text-gray-900">{totalHabits}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Being tracked
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Habits */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Today's Habits</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {habits.map(habit => (
                  <div key={habit.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            habit.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {habit.completed && (
                            <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                        <div>
                          <h3 className={`font-medium ${habit.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {habit.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">{habit.category}</span>
                            <span className="text-sm text-orange-600 font-medium">{habit.streak} day streak</span>
                            <span className="text-sm text-gray-500">{habit.completionRate}% success rate</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'habits' && (
          <div className="space-y-6">
            {/* Add Habit Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Habits</h2>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Habit</span>
                </button>
              )}
            </div>

            {/* Add Habit Form */}
            {showForm && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Habit</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Habit name</label>
                    <input
                      type="text"
                      value={newHabit}
                      onChange={(e) => setNewHabit(e.target.value)}
                      placeholder="e.g., Drink 8 glasses of water"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={addHabit}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Create Habit
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setNewHabit('');
                      }}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Habits List */}
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
              {habits.map(habit => (
                <div key={habit.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleHabit(habit.id)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          habit.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        {habit.completed && (
                          <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <div>
                        <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {habit.category}
                          </span>
                          <span className="text-sm text-orange-600 font-medium flex items-center">
                            <Flame className="w-4 h-4 mr-1" />
                            {habit.streak} days
                          </span>
                          <span className="text-sm text-gray-500">
                            {habit.completionRate}% success rate
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${habit.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
              <p className="text-gray-600">
                Get detailed insights into your habit patterns, weekly trends, and performance metrics.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitFlow;