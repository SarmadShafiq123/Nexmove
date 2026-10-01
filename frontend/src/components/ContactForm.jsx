import { memo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { submitLead } from '../services/leadService';
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaTruck, FaIdCard, FaComment } from 'react-icons/fa';
import { SectionHeader } from './shared/SectionHeader';
import { Input, Select, TextArea } from './shared/Input';
import { Button } from './shared/Button';
import { useFormState } from '../hooks/useFormState';
import { TRUCK_TYPES, ANIMATION_VARIANTS } from '../config/constants';

const INITIAL_FORM_STATE = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  truckType: '',
  mcNumber: '',
  dotNumber: '',
  message: ''
};

const ContactForm = () => {
  const { formData, isSubmitting, setIsSubmitting, handleChange, resetForm } = useFormState(INITIAL_FORM_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLead(formData);
      
      toast.success('Thank you! We will contact you soon.', {
        position: 'top-right',
        autoClose: 5000,
      });

      resetForm();
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Partner With Us Today"
          subtitle="Fill out the form below and our dispatch team will contact you within 24 hours"
        />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 md:p-10 rounded-2xl shadow-xl">
            <PersonalInfo formData={formData} onChange={handleChange} />
            <TruckInfo formData={formData} onChange={handleChange} />
            <MessageField formData={formData} onChange={handleChange} />
            <SubmitButton isSubmitting={isSubmitting} />
            <PrivacyNotice />
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const PersonalInfo = memo(({ formData, onChange }) => (
  <div className="grid md:grid-cols-2 gap-5 mb-5">
    <FormField label="Full Name" required>
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

    <FormField label="Company Name" required>
      <Input
        type="text"
        id="companyName"
        name="companyName"
        value={formData.companyName}
        onChange={onChange}
        required
        icon={FaBuilding}
        placeholder="ABC Trucking LLC"
        aria-label="Company Name"
      />
    </FormField>

    <FormField label="Email Address" required>
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

    <FormField label="Phone Number" required>
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
));

PersonalInfo.displayName = 'PersonalInfo';

const TruckInfo = memo(({ formData, onChange }) => (
  <div className="grid md:grid-cols-3 gap-5 mb-5">
    <FormField label="Truck Type" required>
      <Select
        id="truckType"
        name="truckType"
        value={formData.truckType}
        onChange={onChange}
        required
        icon={FaTruck}
        options={[{ value: '', label: 'Select Type' }, ...TRUCK_TYPES]}
        aria-label="Truck Type"
      />
    </FormField>

    <FormField label="MC Number" required>
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

    <FormField label="DOT Number" required>
      <Input
        type="text"
        id="dotNumber"
        name="dotNumber"
        value={formData.dotNumber}
        onChange={onChange}
        required
        icon={FaIdCard}
        placeholder="DOT123456"
        aria-label="DOT Number"
      />
    </FormField>
  </div>
));

TruckInfo.displayName = 'TruckInfo';

const MessageField = memo(({ formData, onChange }) => (
  <div className="mb-5">
    <FormField label="Message" required>
      <TextArea
        id="message"
        name="message"
        value={formData.message}
        onChange={onChange}
        required
        rows="4"
        icon={FaComment}
        placeholder="Tell us about your trucking business and dispatch needs..."
        aria-label="Message"
      />
    </FormField>
  </div>
));

MessageField.displayName = 'MessageField';

const FormField = memo(({ label, required, children }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
));

FormField.displayName = 'FormField';

const SubmitButton = memo(({ isSubmitting }) => (
  <Button
    type="submit"
    disabled={isSubmitting}
    className={`w-full ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : ''}`}
    size="lg"
    aria-label={isSubmitting ? 'Submitting application' : 'Submit application'}
  >
    {isSubmitting ? 'Submitting...' : 'Submit Application'}
  </Button>
));

SubmitButton.displayName = 'SubmitButton';

const PrivacyNotice = memo(() => (
  <p className="text-center text-gray-600 mt-4 text-sm">
    By submitting this form, you agree to be contacted by our dispatch team.
  </p>
));

PrivacyNotice.displayName = 'PrivacyNotice';

export default memo(ContactForm);
