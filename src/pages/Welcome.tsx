import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-28 h-28 mb-6 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-3 border-4 border-blue-100">
            <img src="/logo.png" alt="ShreeGuruCool" className="w-full h-full object-contain" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3">ShreeGuruCool</h1>
          <p className="text-gray-600 text-lg mb-12 max-w-sm">
            Your gateway to knowledge. Learn anytime, anywhere.
          </p>

          {/* Features */}
          <div className="w-full max-w-md space-y-4 mb-12">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Rich Course Content</h3>
                <p className="text-sm text-gray-500">Videos, PDFs, and live classes</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Expert Mentors</h3>
                <p className="text-sm text-gray-500">Learn from industry professionals</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Track Progress</h3>
                <p className="text-sm text-gray-500">Monitor your learning journey</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="w-full max-w-md space-y-3">
            <Link to="/login" className="block w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg shadow-lg shadow-blue-500/30">
                Login to Your Account
              </Button>
            </Link>

            <Link to="/signup" className="block w-full">
              <Button variant="outline" className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 h-14 text-lg">
                Create New Account
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 text-center">
        <p className="text-sm text-gray-500">
          © 2024 ShreeGuruCool. All rights reserved.
        </p>
      </div>
    </div>
  );
}
