import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const TripWizard = ({ onComplete, loading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState({
    destination: '',
    dateRange: { startDate: '', endDate: '' },
    budget: 'moderate',
    numberOfTravelers: 1,
    preferences: {
      travelStyle: 'balanced',
      foodPreferences: [],
      activities: [],
      pace: 'moderate',
    },
    constraints: {
      mustVisit: [],
      avoid: [],
      specialNotes: '',
    },
  });

  const handleNext = (stepData) => {
    setTripData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleComplete = (stepData) => {
    const finalData = { ...tripData, ...stepData };
    onComplete(finalData);
  };

  const steps = [
    { number: 1, title: 'Basic Info', component: StepOne },
    { number: 2, title: 'Preferences', component: StepTwo },
    { number: 3, title: 'Constraints', component: StepThree },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Compact Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    currentStep >= step.number
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-xs font-medium mt-1 ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 rounded transition-all ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent
            data={tripData}
            onNext={handleNext}
            onBack={handleBack}
            onComplete={handleComplete}
            loading={loading}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === steps.length}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TripWizard;
