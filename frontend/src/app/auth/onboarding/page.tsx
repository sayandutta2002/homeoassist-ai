"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, CheckCircle2, ChevronDown, CloudUpload, Info, ArrowRight } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  medicalCouncil: z.string().min(1, { message: "Medical council is required" }),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  highestQualification: z.string().min(1, { message: "Highest qualification is required" }),
});

type FormData = z.infer<typeof schema>;

export default function OnboardingPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "Dr. Sarah Jenkins",
      registrationNumber: "e.g. CCH-12345"
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted", data);
    // Move to next step or submit
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full bg-white px-8 py-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold font-[var(--font-headline-lg)] text-gray-900">Practitioner Verification Application</h1>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto p-8">
        
        {/* Stepper */}
        <div className="relative flex items-center justify-between mb-12 max-w-3xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1 bg-[var(--color-primary)] -z-10"></div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-[var(--color-primary)]">Personal Details</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold flex items-center justify-center">
              2
            </div>
            <span className="text-sm font-semibold text-[var(--color-primary)]">Medical Credentials</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-300 text-gray-400 font-bold flex items-center justify-center">
              3
            </div>
            <span className="text-sm font-semibold text-gray-400">Identity Verification</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-outline-variant)] p-10">
          <h2 className="text-2xl font-bold mb-2">Step 2: Medical Credentials</h2>
          <p className="text-gray-600 mb-8">Please provide your official registration details and clinical qualifications to proceed with verification.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Full Name (As per Medical Records)</label>
                <input 
                  {...register("fullName")}
                  className="w-full px-4 py-3 bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
                {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">State Medical Council</label>
                <div className="relative">
                  <select 
                    {...register("medicalCouncil")}
                    className="w-full px-4 py-3 appearance-none bg-white border border-[var(--color-outline-variant)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-gray-600"
                  >
                    <option value="">Select issuing council...</option>
                    <option value="maharashtra">Maharashtra Council of Indian Medicine</option>
                    <option value="delhi">Delhi Bharatiya Chikitsa Parishad</option>
                    <option value="cch">Central Council of Homoeopathy</option>
                  </select>
                  <ChevronDown className="w-5 h-5 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                </div>
                {errors.medicalCouncil && <span className="text-red-500 text-xs">{errors.medicalCouncil.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Registration Number</label>
                <input 
                  {...register("registrationNumber")}
                  className="w-full px-4 py-3 bg-white border border-[var(--color-outline-variant)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
                {errors.registrationNumber && <span className="text-red-500 text-xs">{errors.registrationNumber.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Highest Qualification</label>
                <div className="relative">
                  <select 
                    {...register("highestQualification")}
                    className="w-full px-4 py-3 appearance-none bg-white border border-[var(--color-outline-variant)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-gray-600"
                  >
                    <option value="">Select qualification...</option>
                    <option value="bhms">BHMS</option>
                    <option value="md">MD (Hom.)</option>
                    <option value="phd">PhD</option>
                  </select>
                  <ChevronDown className="w-5 h-5 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                </div>
                {errors.highestQualification && <span className="text-red-500 text-xs">{errors.highestQualification.message}</span>}
              </div>

            </div>

            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-lg font-semibold mb-2">Document Upload</h3>
              <p className="text-sm text-gray-500 mb-6">Please upload clear, legible copies of your documents. Supported formats: PDF, JPG, PNG (Max 5MB each).</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-[var(--color-outline-variant)] rounded-xl bg-[var(--color-surface-container-low)] flex flex-col items-center justify-center p-8 hover:bg-[var(--color-surface-container)] cursor-pointer transition-colors">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-[var(--color-primary)]">
                    <CloudUpload className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-[var(--color-primary)] mb-1">Upload Medical License</span>
                  <span className="text-xs text-gray-500">Drag & drop files here or click to browse</span>
                </div>

                <div className="border-2 border-dashed border-[var(--color-outline-variant)] rounded-xl bg-[var(--color-surface-container-low)] flex flex-col items-center justify-center p-8 hover:bg-[var(--color-surface-container)] cursor-pointer transition-colors">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-[var(--color-primary)]">
                    <CloudUpload className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-[var(--color-primary)] mb-1">Upload Government ID</span>
                  <span className="text-xs text-gray-500">Drag & drop files here or click to browse</span>
                </div>
              </div>
            </div>

            <div className="bg-[#fffcf0] border border-[#f5e6c4] rounded-xl p-4 flex gap-4 mt-8">
              <Info className="w-6 h-6 text-[#d99f36] shrink-0" />
              <p className="text-sm text-[#8c6b24]">
                <strong className="font-bold">Please note:</strong> Your account will remain locked until our admin team manually verifies your credentials. This process typically takes 1-2 business days to ensure clinical safety and compliance.
              </p>
            </div>

            <div className="flex justify-end pt-6">
              <button 
                type="submit"
                className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary-container)] transition-colors"
              >
                Submit for Clinical Review
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

        </div>

      </main>

      <footer className="w-full bg-[var(--color-surface-container-highest)] py-6 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-8">
          <div className="font-bold text-[var(--color-primary)] text-lg mb-4 md:mb-0">HomeoAssist AI</div>
          <div className="flex items-center gap-6 text-sm text-gray-600 font-medium">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <a href="#" className="hover:text-gray-900">Healthcare Ethics</a>
            <a href="#" className="hover:text-gray-900">Contact Us</a>
          </div>
          <div className="text-sm text-gray-500 mt-4 md:mt-0">
            © 2024 HomeoAssist AI. Clinical Grade Homeopathy.
          </div>
        </div>
      </footer>

    </div>
  );
}
