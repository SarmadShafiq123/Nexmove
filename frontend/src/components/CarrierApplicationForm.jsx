import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaIdCard, FaTruck, 
  FaMapMarkedAlt, FaBox, FaComment, FaCheck, FaArrowRight, 
  FaArrowLeft, FaStepForward 
} from 'react-icons/fa';
import { submitLead } from '../services/leadService';
import { SectionHeader } from './shared/SectionHeader';
import { Input, Select, TextArea } from './shared/Input';
import { Button } from './shared/Button';
import { ANIMATION_VARIANTS, reducedMotion } from '../config/constants';

// Truck type options
const TRUCK_TYPE_OPTIONS = [
  { value: '', label: 'Select Truck Type' },
  { value: 'Semi Truck', label: 'Semi Truck' },
  { value: 'Dry Van', label: 'Dry Van' },
  { value: 'Reefer', label: 'Reefer' },
  { value: 'Flatbed', label: 'Flatbed' },
  { value: 'Step Deck', label: 'Step Deck' },
  { value: 'Box Truck', label: 'Box Truck' },
  { value: 'Power Only', label: 'Power Only' },
  { value: 'Hotshot', label: 'Hotshot' }
];

// Number of trucks options
const TRUCK_COUNT_OPTIONS = [
  { value: '', label: 'Select Number of Trucks' },
  { value: '1', label: '1 Truck' },
  { value: '2-3', label: '2-3 Trucks' },
  { value: '4-5', label: '4-5 Trucks' },
  { value: '6-10', label: '6-10 Trucks' },
  { value: '10+', label: '10+ Trucks' }
];

// Weekly loads options
const WEEKLY_LOADS_OPTIONS = [
  { value: '', label: 'Select Weekly Loads' },
  { value: '0-5', label: '0-5 Loads' },
  { value: '5-10', label: '5-10 Loads' },
  { value: '10-15', label: '10-15 Loads' },
  { value: '15-20', label: '15-20 Loads' },
  { value: '20+', label: '20+ Loads' }
];

// Operating states options
const STATE_OPTIONS = [
  { value: '', label: 'Select Operating Region' },
  { value: 'Regional', label: 'Regional (Single Region)' },
  { value: 'Interstate', label: 'Interstate (Multiple Regions)' },
  { value: 'Nationwide', label: 'Nationwide' }
];

// Form steps configuration
const STEPS = [
  { id: 1, title: 'Carrier Information', icon: FaUser },
  { id: 2, title: 'Authority Information', icon: FaIdCard },
  { id: 3, title: 'Equipment Information', icon: FaTruck },
  { id: 4, title: 'Dispatch Requirements', icon: FaBox },
  { id: 5, title: 'Review & Submit', icon: FaCheck }
];

const INITIAL_FORM_STATE = {
  // Step 1: Carrier Information
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  // Step 2: Authority Information
  mcNumber: '',
  dotNumber: '',
  // Step 3: Equipment Information
  truckType: '',
  numberOfTrucks: '',
  operatingStates: '',
  // Step 4: Dispatch Requirements
  preferredLanes: '',
  weeklyLoads: '',
  additionalNotes: ''
};

// Validation rules per step
const VALIDATION_RULES = {
  1: ['fullName', 'email', 'phone'],
  2: ['mcNumber', 'dotNumber'],
  3: ['truckType', 'numberOfTrucks', 'operatingStates'],
  4: ['preferredLanes', 'weeklyLoads'],
  5: []
};

const CarrierApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const validateStep = useCallback((step) => {
    const rules = VALIDATION_RULES[step];
    const newErrors = {};
    let isValid = true;

    rules.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    if (formData.phone && !/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  }, [currentStep, validateStep]);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);

    try {
      // Format data for backend - combine into message field for existing API
      const leadData = {
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        truckType: formData.truckType,
        mcNumber: formData.mcNumber,
        dotNumber: formData.dotNumber,
        message: `
=== Carrier Application ===
Company: ${formData.companyName}
Truck Type: ${formData.truckType}
Trucks: ${formData.numberOfTrucks}
Operating Region: ${formData.operatingStates}
Preferred Lanes: ${formData.preferredLanes}
Weekly Loads: ${formData.weeklyLoads}
Notes: ${formData.additionalNotes || 'N/A'}
        `.trim()
      };

      await submitLead(leadData);
      
      toast.success('Application submitted successfully! We will contact you within 24 hours.', {
        position: 'top-right',
        autoClose: 5000,
      });

      // Reset form
      setFormData(INITIAL_FORM_STATE);
      setCurrentStep(1);
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep]);

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Apply to Become a Carrier Partner"
          subtitle="Complete the multi-step application to get started with NEXMOVE dispatch services"
        />

        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} />

        {/* Form Container */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={reducedMotion() ? {} : ANIMATION_VARIANTS.fadeInScale}
          className="max-w-3xl mx-auto mt-10"
        >
          <div className="bg-gray-50 rounded-2xl shadow-xl p-6 md:p-10">
            <AnimatePresence mode="wait">
              <StepContent
                key={currentStep}
                step={currentStep}
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            </AnimatePresence>

            {/* Navigation Buttons */}
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={STEPS.length}
              isSubmitting={isSubmitting}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Progress Steps Component
const ProgressSteps = memo(({ currentStep }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={reducedMotion() ? {} : { scale: 1 }}
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isCompleted || isActive ? '#2C5F8A' : '#9ca3af'
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isCompleted || isActive ? 'border-[#2C5F8A]' : 'border-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <FaCheck className="text-white text-sm" />
                  ) : (
                    <step.icon className={`text-sm ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  )}
                </motion.div>
                <span className={`text-xs mt-2 hidden md:block ${isActive ? 'text-[#2C5F8A] font-semibold' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
              
              {index < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-[#2C5F8A]' : 'bg-gray-300'}`} />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Mobile Step Indicator */}
      <div className="md:hidden text-center mt-4">
        <span className="text-sm text-gray-600">
          Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
        </span>
      </div>
    </div>
  );
});

ProgressSteps.displayName = 'ProgressSteps';

// Step Content Component
const StepContent = memo(({ step, formData, errors, onChange }) => {
  const variants = reducedMotion() ? {} : {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const transition = reducedMotion() ? {} : { duration: 0.3 };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      {step === 1 && <Step1CarrierInfo formData={formData} errors={errors} onChange={onChange} />}
      {step === 2 && <Step2AuthorityInfo formData={formData} errors={errors} onChange={onChange} />}
      {step === 3 && <Step3EquipmentInfo formData={formData} errors={errors} onChange={onChange} />}
      {step === 4 && <Step4DispatchRequirements formData={formData} errors={errors} onChange={onChange} />}
      {step === 5 && <Step5ReviewSubmit formData={formData} />}
    </motion.div>
  );
});

StepContent.displayName = 'StepContent';

// Step 1: Carrier Information
const Step1CarrierInfo = memo(({ formData, errors, onChange }) => (
  <div className="space-y-5">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Carrier Information</h3>
    <div className="grid md:grid-cols-2 gap-5">
      <FormField label="Full Name" required error={errors.fullName}>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          required
          icon={FaUser}
          placeholder="John Doe"
          aria-label="Full Name"
        />
      </FormField>

      <FormField label="Company Name" error={errors.companyName}>
        <Input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={onChange}
          icon={FaBuilding}
          placeholder="ABC Trucking LLC"
          aria-label="Company Name"
        />
      </FormField>

      <FormField label="Email Address" required error={errors.email}>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          icon={FaEnvelope}
          placeholder="john@example.com"
          aria-label="Email Address"
        />
      </FormField>

      <FormField label="Phone Number" required error={errors.phone}>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          required
          icon={FaPhone}
          placeholder="+1 (602) 325-3303"
          aria-label="Phone Number"
        />
      </FormField>
    </div>
  </div>
));

Step1CarrierInfo.displayName = 'Step1CarrierInfo';

// Step 2: Authority Information
const Step2AuthorityInfo = memo(({ formData, errors, onChange }) => (
  <div className="space-y-5">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Authority Information</h3>
    <div className="grid md:grid-cols-2 gap-5">
      <FormField label="MC Number" required error={errors.mcNumber}>
        <Input
          type="text"
          id="mcNumber"
          name="mcNumber"
          value={formData.mcNumber}
          onChange={onChange}
          required
          icon={FaIdCard}
          placeholder="MC123456"
          aria-label="MC Number"
        />
      </FormField>

      <FormField label="DOT Number" required error={errors.dotNumber}>
        <Input
          type="text"
          id="dotNumber"
          name="dotNumber"
          value={formData.dotNumber}
          onChange={onChange}
          required
          icon={FaIdCard}
          placeholder="DOT1234567"
          aria-label="DOT Number"
        />
      </FormField>
    </div>
    <p className="text-sm text-gray-600 mt-4">
      If you don't have MC/DOT numbers yet, you can still apply. We'll help you through the process.
    </p>
  </div>
));

Step2AuthorityInfo.displayName = 'Step2AuthorityInfo';

// Step 3: Equipment Information
const Step3EquipmentInfo = memo(({ formData, errors, onChange }) => (
  <div className="space-y-5">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Equipment Information</h3>
    <div className="grid md:grid-cols-3 gap-5">
      <FormField label="Truck Type" required error={errors.truckType}>
        <Select
          id="truckType"
          name="truckType"
          value={formData.truckType}
          onChange={onChange}
          required
          icon={FaTruck}
          options={TRUCK_TYPE_OPTIONS}
          aria-label="Truck Type"
        />
      </FormField>

      <FormField label="Number of Trucks" required error={errors.numberOfTrucks}>
        <Select
          id="numberOfTrucks"
          name="numberOfTrucks"
          value={formData.numberOfTrucks}
          onChange={onChange}
          required
          icon={FaTruck}
          options={TRUCK_COUNT_OPTIONS}
          aria-label="Number of Trucks"
        />
      </FormField>

      <FormField label="Operating Region" required error={errors.operatingStates}>
        <Select
          id="operatingStates"
          name="operatingStates"
          value={formData.operatingStates}
          onChange={onChange}
          required
          icon={FaMapMarkedAlt}
          options={STATE_OPTIONS}
          aria-label="Operating Region"
        />
      </FormField>
    </div>
  </div>
));

Step3EquipmentInfo.displayName = 'Step3EquipmentInfo';

// Step 4: Dispatch Requirements
const Step4DispatchRequirements = memo(({ formData, errors, onChange }) => (
  <div className="space-y-5">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Dispatch Requirements</h3>
    <div className="grid md:grid-cols-2 gap-5">
      <FormField label="Preferred Lanes" required error={errors.preferredLanes}>
        <Input
          type="text"
          id="preferredLanes"
          name="preferredLanes"
          value={formData.preferredLanes}
          onChange={onChange}
          required
          icon={FaMapMarkedAlt}
          placeholder="e.g., Southwest, Midwest"
          aria-label="Preferred Lanes"
        />
      </FormField>

      <FormField label="Current Weekly Loads" required error={errors.weeklyLoads}>
        <Select
          id="weeklyLoads"
          name="weeklyLoads"
          value={formData.weeklyLoads}
          onChange={onChange}
          required
          icon={FaBox}
          options={WEEKLY_LOADS_OPTIONS}
          aria-label="Weekly Loads"
        />
      </FormField>
    </div>

    <FormField label="Additional Notes">
      <TextArea
        id="additionalNotes"
        name="additionalNotes"
        value={formData.additionalNotes}
        onChange={onChange}
        rows="4"
        icon={FaComment}
        placeholder="Tell us about your specific dispatch needs, preferred freight types, or any questions..."
        aria-label="Additional Notes"
      />
    </FormField>
  </div>
));

Step4DispatchRequirements.displayName = 'Step4DispatchRequirements';

// Step 5: Review & Submit
const Step5ReviewSubmit = memo(({ formData }) => (
  <div className="space-y-5">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Review Your Application</h3>
    
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <ReviewSection title="Carrier Information" icon={FaUser}>
        <ReviewItem label="Full Name" value={formData.fullName || 'Not provided'} />
        <ReviewItem label="Company Name" value={formData.companyName || 'Not provided'} />
        <ReviewItem label="Email" value={formData.email || 'Not provided'} />
        <ReviewItem label="Phone" value={formData.phone || 'Not provided'} />
      </ReviewSection>

      <ReviewSection title="Authority Information" icon={FaIdCard}>
        <ReviewItem label="MC Number" value={formData.mcNumber || 'Not provided'} />
        <ReviewItem label="DOT Number" value={formData.dotNumber || 'Not provided'} />
      </ReviewSection>

      <ReviewSection title="Equipment Information" icon={FaTruck}>
        <ReviewItem label="Truck Type" value={formData.truckType || 'Not provided'} />
        <ReviewItem label="Number of Trucks" value={formData.numberOfTrucks || 'Not provided'} />
        <ReviewItem label="Operating Region" value={formData.operatingStates || 'Not provided'} />
      </ReviewSection>

      <ReviewSection title="Dispatch Requirements" icon={FaBox}>
        <ReviewItem label="Preferred Lanes" value={formData.preferredLanes || 'Not provided'} />
        <ReviewItem label="Weekly Loads" value={formData.weeklyLoads || 'Not provided'} />
        <ReviewItem label="Additional Notes" value={formData.additionalNotes || 'None'} />
      </ReviewSection>
    </div>

    <p className="text-sm text-gray-600 text-center">
      By submitting, you agree to be contacted by our dispatch team regarding your application.
    </p>
  </div>
));

Step5ReviewSubmit.displayName = 'Step5ReviewSubmit';

// Helper Components
const FormField = memo(({ label, required, error, children }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
));

FormField.displayName = 'FormField';

const ReviewSection = memo(({ title, icon: Icon, children }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <div className="bg-gray-50 px-4 py-3 flex items-center border-b border-gray-200">
      <Icon className="text-[#2C5F8A] mr-2" />
      <h4 className="font-semibold text-gray-900">{title}</h4>
    </div>
    <div className="px-4 py-3">
      {children}
    </div>
  </div>
));

ReviewSection.displayName = 'ReviewSection';

const ReviewItem = memo(({ label, value }) => (
  <div className="grid grid-cols-3 gap-2 py-1">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="col-span-2 text-gray-900 text-sm font-medium">{value}</span>
  </div>
));

ReviewItem.displayName = 'ReviewItem';

// Navigation Buttons
const NavigationButtons = memo(({ 
  currentStep, 
  totalSteps, 
  isSubmitting, 
  onPrevious, 
  onNext, 
  onSubmit 
}) => (
  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
    <div>
      {currentStep > 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="!border-gray-300 !text-gray-700 hover!bg-gray-100"
          disabled={isSubmitting}
        >
          <FaArrowLeft className="mr-2" />
          Previous
        </Button>
      )}
    </div>
    
    <div className="flex gap-3">
      {currentStep < totalSteps ? (
        <Button
          type="button"
          variant="primary"
          onClick={onNext}
        >
          Next
          <FaArrowRight className="ml-2" />
        </Button>
      ) : (
        <Button
          type="button"
          variant="primary"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={isSubmitting ? 'opacity-70' : ''}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
          <FaCheck className="ml-2" />
        </Button>
      )}
    </div>
  </div>
));

NavigationButtons.displayName = 'NavigationButtons';

export default memo(CarrierApplicationForm);