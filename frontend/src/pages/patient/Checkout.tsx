import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BadgeCheck, FileText, ChevronDown, ShoppingCart, Lock, ShieldCheck
} from 'lucide-react';

export default function Checkout() {
  return (
    <div className="font-body-md text-on-surface antialiased min-h-screen flex flex-col bg-slate-50">
      {/* TopNavBar */}
      <header className="bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin py-base max-w-max-width mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-title-lg font-title-lg font-bold text-primary dark:text-primary-fixed tracking-tight">HomeoAssist AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant text-label-md font-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Consult</Link>
            <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant text-label-md font-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/triage">AI Triage</Link>
            <Link className="text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 text-label-md font-label-md opacity-80 transition-opacity" to="/checkout">Order</Link>
            <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant text-label-md font-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Library</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary text-label-md font-label-md hidden md:block">Language</button>
            <Link to="/login" className="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-md font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm inline-block">Login</Link>
          </div>
        </div>
      </header>
      {/* Main Canvas */}
      <main className="flex-grow w-full max-w-max-width mx-auto px-4 md:px-margin py-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Header */}
        <div className="col-span-1 md:col-span-12 mb-md">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface">Your Prescription is Ready</h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-2">Please review your consultation details and proceed to order your prescribed medication.</p>
        </div>
        {/* Left Column: Prescription Details */}
        <div className="col-span-1 md:col-span-7 flex flex-col gap-md">
          {/* Doctor Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md flex items-center gap-md">
            <img className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-high" alt="Doctor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU_E0VPiOo60ySn9pUYGRoQkJfbB7XM0QOLOEO86wqwhEcbGnjgPNM2UN1tc8e8ZlsrEEQ2xojRbsYrch2xK-GFxxLJocIJm-5XBlk6lHHgeWq9jLS0n5IetuiNlM5uczEBu3bb32MF6Q043GcH-G-A24Ao_NKCDEwQEJQl5SwGz0BCmxhzoTvUcHtq6BwwRqwQsJMb-5MDvyEbMPgW9jMy0WObTkedQhBwyGWYQuGj4uSIzSjvdu4CMBvzNGRoSjU7ijIi5onwjiL" />
            <div>
              <h2 className="text-title-lg font-title-lg text-on-surface flex items-center gap-2">
                Dr. Sarah Jenkins 
                <BadgeCheck className="text-secondary w-5 h-5 fill-secondary text-surface-container-lowest" />
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant">Homeopathic Consultant</p>
              <span className="inline-block mt-2 bg-secondary-container text-on-secondary-container text-label-sm font-label-sm px-2 py-1 rounded-full uppercase tracking-wider">Verified Specialist</span>
            </div>
          </div>
          {/* Prescription Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
            <div className="flex items-center gap-2 mb-4 border-b border-outline-variant pb-2">
              <FileText className="text-primary w-5 h-5" />
              <h3 className="text-title-lg font-title-lg text-on-surface">Digital Prescription</h3>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-headline-md font-headline-md text-primary">Belladonna 30C</h4>
                <span className="bg-surface-container-highest text-on-surface-variant text-label-sm font-label-sm px-2 py-1 rounded-full">Pellets</span>
              </div>
              <p className="text-body-md font-body-md text-on-surface"><strong>Dosage:</strong> 4 pills, 3 times a day for 3 days</p>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-2"><strong>Notes:</strong> Dissolve under the tongue. Avoid eating or drinking 15 minutes before and after taking the remedy.</p>
            </div>
          </div>
        </div>
        {/* Right Column: Checkout */}
        <div className="col-span-1 md:col-span-5">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-[0px_4px_12px_rgba(15,23,42,0.05)] sticky top-32">
            <h3 className="text-title-lg font-title-lg text-on-surface mb-6 border-b border-outline-variant pb-2">Order from Partner Pharmacy</h3>
            {/* Delivery Address */}
            <div className="mb-6">
              <label className="block text-label-md font-label-md text-on-surface-variant mb-2">Delivery Address</label>
              <div className="relative">
                <select className="w-full appearance-none bg-surface border border-outline-variant text-on-surface text-body-md font-body-md rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all">
                  <option>Home - 123 Wellness Ave, Suite 4B</option>
                  <option>Office - 456 Clinical Blvd</option>
                  <option>+ Add New Address</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-outline pointer-events-none w-5 h-5" />
              </div>
            </div>
            {/* Cost Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-body-md font-body-md text-on-surface">
                <span>Medicine Cost</span>
                <span>₹120.00</span>
              </div>
              <div className="flex justify-between items-center text-body-md font-body-md text-on-surface">
                <span>Delivery Fee</span>
                <span>₹40.00</span>
              </div>
              <div className="border-t border-outline-variant pt-3 mt-3 flex justify-between items-center">
                <span className="text-title-lg font-title-lg text-on-surface">Total</span>
                <span className="text-headline-md font-headline-md text-primary">₹160.00</span>
              </div>
            </div>
            {/* Action */}
            <button className="w-full bg-primary text-on-primary text-title-lg font-title-lg py-4 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-[0px_4px_12px_rgba(15,23,42,0.05)] flex justify-center items-center gap-2 mb-6">
              <ShoppingCart className="w-6 h-6" />
              Pay &amp; Order Medicine Now
            </button>
            {/* Trust Badges */}
            <div className="flex justify-center gap-6 pt-4 border-t border-outline-variant">
              <div className="flex items-center gap-1 text-on-surface-variant text-label-sm font-label-sm">
                <Lock className="text-secondary w-4 h-4" />
                Secure Checkout
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant text-label-sm font-label-sm">
                <ShieldCheck className="text-secondary w-4 h-4" />
                100% Authentic
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface-container-highest dark:bg-inverse-surface mt-auto">
        <div className="w-full py-lg px-margin flex flex-col md:flex-row justify-between items-center max-w-max-width mx-auto">
          <div className="text-label-md font-label-md font-bold text-primary dark:text-primary-fixed mb-4 md:mb-0">
              © 2024 HomeoAssist AI. Clinical Grade Homeopathy.
          </div>
          <div className="flex gap-6">
            <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Privacy Policy</Link>
            <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Terms of Service</Link>
            <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Healthcare Ethics</Link>
            <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" to="#">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
