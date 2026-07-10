
import { Link } from 'react-router-dom';
import { 
  Activity, Search, Globe, Bot, Stethoscope, 
  CheckCircle, Truck, Lock, Pill, BookOpen 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col">
      {/* TopNavBar component */}
      <nav className="bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline w-full z-50 sticky top-0">
        <div className="flex justify-between items-center w-full px-margin py-base max-w-max-width mx-auto">
          <div className="flex items-center gap-2">
            <Activity className="text-primary w-8 h-8" />
            <span className="text-title-lg font-title-lg font-bold text-primary dark:text-primary-fixed">HomeoAssist AI</span>
          </div>
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant w-5 h-5" />
            <input className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-container-lowest font-body-sm text-body-sm text-on-surface placeholder-on-surface-variant" placeholder="Search doctors, medicines, or symptoms..." type="text"/>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4">
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-md text-label-md" to="#">Consult</Link>
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-md text-label-md" to="/triage">AI Triage</Link>
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-md text-label-md" to="/checkout">Order</Link>
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-label-md text-label-md" to="#">Library</Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md flex items-center gap-1">
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline">Language</span>
              </button>
              <Link to="/login" className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-6 py-2 rounded-lg font-label-md text-label-md transition-colors shadow-sm inline-block">
                  Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content Canvas */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-max-width mx-auto px-margin py-xl flex flex-col lg:flex-row items-center gap-lg">
          <div className="flex-1 space-y-6">
            <h1 className="text-display-lg font-display-lg text-on-surface">
                Intelligent Homeopathic Care, <br/><span className="text-primary">In Your Language.</span>
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
                Consult verified homeopathic specialists powered by AI clinical intelligence and get medicines delivered instantly. Experience precise, personalized care at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/triage" className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-8 py-3 rounded-lg font-label-md text-label-md transition-colors shadow-sm flex items-center justify-center gap-2">
                <Bot className="w-5 h-5" />
                Start AI Symptom Checker
              </Link>
              <button className="border border-primary text-primary hover:bg-surface-container-low px-8 py-3 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Are you a Doctor? Join Practice
              </button>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg border border-outline-variant">
            <img alt="Modern Doctor with Tablet" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApsHpd-YlR_Em1CvxQ7jmZbyzfZhLShGwTuh-DhJa6M2tV69rVHgZbSDXr3ENB5h1TrUqb6Nr5eS_bwAxVeWtKhxpJFHRG0kMC1t26psuPDadORRZejptKRqoUE110Ed_blfOlJu4y8XHSMwSQ3UfViYeroi9lj0kLbwsBDdyG9j6D_rA_JgDaH4OWmMCDzgC0lNjWg00Dkl6nk6uJugSEZrayTqvEHaOqNd-phM0vAAnsXjS7FqLFlXo1giRJ83JhGdiM7ZM8K8-W"/>
          </div>
        </section>
        {/* Trust Banner */}
        <div className="w-full bg-surface-container-low border-y border-outline-variant py-md">
          <div className="max-w-max-width mx-auto px-margin flex flex-wrap justify-center md:justify-between items-center gap-6 text-on-surface-variant">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-secondary w-5 h-5" />
              <span className="font-label-md text-label-md">10k+ Verified Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="text-secondary w-5 h-5" />
              <span className="font-label-md text-label-md">50k+ Prescriptions Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="text-secondary w-5 h-5" />
              <span className="font-label-md text-label-md">100% Secure &amp; Private</span>
            </div>
          </div>
        </div>
        {/* Service Grid */}
        <section className="max-w-max-width mx-auto px-margin py-xl">
          <div className="mb-lg text-center">
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">Comprehensive Care Services</h2>
            <p className="text-body-md font-body-md text-on-surface-variant">Everything you need for your homeopathic healthcare journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                <Stethoscope className="text-primary group-hover:text-on-primary-container w-6 h-6" />
              </div>
              <h3 className="text-title-lg font-title-lg text-on-surface mb-2">Consult Doctors</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Connect with experienced homeopathic practitioners for personalized treatment plans.</p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                <Bot className="text-primary group-hover:text-on-primary-container w-6 h-6" />
              </div>
              <h3 className="text-title-lg font-title-lg text-on-surface mb-2">AI Symptom Triage</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Use our advanced AI to analyze your symptoms and get preliminary clinical guidance.</p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                <Pill className="text-primary group-hover:text-on-primary-container w-6 h-6" />
              </div>
              <h3 className="text-title-lg font-title-lg text-on-surface mb-2">Order Medicines</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Purchase authentic homeopathic remedies directly from our verified pharmacy network.</p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                <BookOpen className="text-primary group-hover:text-on-primary-container w-6 h-6" />
              </div>
              <h3 className="text-title-lg font-title-lg text-on-surface mb-2">Research Library</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Access a comprehensive Materia Medica and clinical research database for learning.</p>
            </div>
          </div>
        </section>
      </main>
      {/* Footer component */}
      <footer className="bg-surface-container-highest dark:bg-inverse-surface w-full mt-auto">
        <div className="w-full py-lg px-margin flex flex-col md:flex-row justify-between items-center max-w-max-width mx-auto">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-label-md font-label-md font-bold text-primary dark:text-primary-fixed">HomeoAssist AI</span>
            <span className="text-body-sm font-body-sm text-on-surface dark:text-inverse-on-surface ml-2">
                © 2024 HomeoAssist AI. Clinical Grade Homeopathy.
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Privacy Policy</Link>
            <Link className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Terms of Service</Link>
            <Link className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Healthcare Ethics</Link>
            <Link className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
