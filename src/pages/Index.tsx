import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, X, Globe, Clock, BarChart, Inbox, MapPin, Calendar, Layers, Zap, Phone, MessageCircle, Mail, Award } from "lucide-react";
const Index = () => {
  const {
    toast
  } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    business: {
      name: "",
      industry: "",
      size: "",
      locations: ""
    },
    challenges: {
      missedLeads: false,
      inconsistentService: false,
      afterHoursSupport: false,
      channelManagement: false,
      scalingChallenges: false
    },
    communication: {
      channels: {
        phone: false,
        email: false,
        sms: false,
        webChat: false,
        socialMedia: false
      },
      leadVolume: "",
      responseTime: ""
    },
    contact: {
      name: "",
      email: "",
      phone: ""
    }
  });
  const totalSteps = 4;
  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof field === 'object' ? {
        ...prev[section],
        ...field
      } : {
        ...prev[section],
        [field]: value
      }
    }));
  };
  const handleChallengeToggle = challenge => {
    setFormData(prev => ({
      ...prev,
      challenges: {
        ...prev.challenges,
        [challenge]: !prev.challenges[challenge]
      }
    }));
  };
  const handleChannelToggle = channel => {
    setFormData(prev => ({
      ...prev,
      communication: {
        ...prev.communication,
        channels: {
          ...prev.communication.channels,
          [channel]: !prev.communication.channels[channel]
        }
      }
    }));
  };
  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Validate current step
      if (currentStep === 1 && (!formData.business.name || !formData.business.industry)) {
        toast({
          title: "Please complete all required fields",
          description: "Business name and industry are required to continue.",
          variant: "destructive"
        });
        return;
      }
      if (currentStep === 3 && Object.values(formData.communication.channels).every(v => !v)) {
        toast({
          title: "Please select at least one communication channel",
          description: "We need to know how your customers reach you.",
          variant: "destructive"
        });
        return;
      }
      if (currentStep === 4 && (!formData.contact.name || !formData.contact.email)) {
        toast({
          title: "Please complete all required fields",
          description: "Your name and email are required to continue.",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Form submission logic
      handleSubmit();
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    toast({
      title: "Onboarding started!",
      description: "We'll reach out to you shortly to get you set up with Twine."
    });
    // In a real app, you would submit to your backend here
  };

  // The variants for framer-motion animations
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Feature items for the hero section
  const features = [{
    icon: <Zap className="text-twine-600" size={20} />,
    text: "Never miss a lead with instant AI responses"
  }, {
    icon: <Inbox className="text-twine-600" size={20} />,
    text: "Unified inbox for all lead sources"
  }, {
    icon: <MapPin className="text-twine-600" size={20} />,
    text: "Intelligent lead routing by location"
  }, {
    icon: <Calendar className="text-twine-600" size={20} />,
    text: "Automated appointment scheduling"
  }];
  return <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <img src="/lovable-uploads/967b2945-42b9-44db-9af7-f17c1fac7449.png" alt="Twine Logo" className="h-16 md:h-20" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Boost your business communication, never miss a lead, and deliver consistent 
            service across all channels.
          </p>
          
          {/* Feature list */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {features.map((feature, idx) => <motion.div key={idx} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2 + idx * 0.1,
            duration: 0.5
          }} className="flex items-center p-3 bg-white rounded-lg shadow-subtle">
                <div className="flex-shrink-0 p-2 bg-twine-50 rounded-full">
                  {feature.icon}
                </div>
                <p className="ml-3 text-sm font-medium text-gray-700">{feature.text}</p>
              </motion.div>)}
          </div>
        </motion.div>
        
        {/* Step Indicator */}
        <div className="step-indicator">
          {Array.from({
          length: totalSteps
        }).map((_, idx) => <div key={idx} className="flex items-center">
              <div className={`step-dot ${currentStep > idx ? 'completed' : ''} ${currentStep === idx + 1 ? 'active' : ''}`} />
              {idx < totalSteps - 1 && <div className={`step-line ${currentStep > idx + 1 ? 'active' : ''}`} />}
            </div>)}
        </div>
  
        {/* Form Container */}
        <div className="form-container">
          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-twine-50 rounded-full opacity-60 filter blur-3xl -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-100 rounded-full opacity-40 filter blur-3xl -z-10 transform -translate-x-1/4 translate-y-1/4"></div>
          
          <AnimatePresence mode="wait">
            {currentStep === 1 && <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">About Your Business</h3>
                  <p className="text-gray-600 mb-6">Let's get to know your business better so we can tailor Twine to your needs.</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-4">
                  <div>
                    <label htmlFor="businessName" className="label">Business Name <span className="text-red-500">*</span></label>
                    <input id="businessName" type="text" className="input-field" placeholder="Your business name" value={formData.business.name} onChange={e => updateFormData('business', 'name', e.target.value)} required />
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="label">Industry <span className="text-red-500">*</span></label>
                    <select id="industry" className="input-field" value={formData.business.industry} onChange={e => updateFormData('business', 'industry', e.target.value)} required>
                      <option value="">Select your industry</option>
                      <option value="homeServices">Home Services</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="automotive">Automotive</option>
                      <option value="professionalServices">Professional Services</option>
                      <option value="retail">Retail</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="businessSize" className="label">Business Size</label>
                      <select id="businessSize" className="input-field" value={formData.business.size} onChange={e => updateFormData('business', 'size', e.target.value)}>
                        <option value="">Select team size</option>
                        <option value="1-5">1-5 employees</option>
                        <option value="6-20">6-20 employees</option>
                        <option value="21-50">21-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201+">201+ employees</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="locations" className="label">Number of Locations</label>
                      <select id="locations" className="input-field" value={formData.business.locations} onChange={e => updateFormData('business', 'locations', e.target.value)}>
                        <option value="">Select number of locations</option>
                        <option value="1">1 location</option>
                        <option value="2-5">2-5 locations</option>
                        <option value="6-10">6-10 locations</option>
                        <option value="11+">11+ locations</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-end pt-6">
                  <button type="button" className="btn-primary flex items-center" onClick={nextStep}>
                    Next Step
                    <ChevronRight className="ml-2" size={20} />
                  </button>
                </motion.div>
              </motion.div>}
            
            {currentStep === 2 && <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">Business Challenges</h3>
                  <p className="text-gray-600 mb-6">What challenges are you facing with customer communications?</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    <ChallengeOption id="missedLeads" icon={<Clock size={20} />} label="Missing leads due to slow response times" isSelected={formData.challenges.missedLeads} onClick={() => handleChallengeToggle('missedLeads')} />
                    
                    <ChallengeOption id="inconsistentService" icon={<Layers size={20} />} label="Inconsistent customer service across locations" isSelected={formData.challenges.inconsistentService} onClick={() => handleChallengeToggle('inconsistentService')} />
                    
                    <ChallengeOption id="afterHoursSupport" icon={<Clock size={20} />} label="After-hours customer support challenges" isSelected={formData.challenges.afterHoursSupport} onClick={() => handleChallengeToggle('afterHoursSupport')} />
                    
                    <ChallengeOption id="channelManagement" icon={<Globe size={20} />} label="Complex lead management across multiple channels" isSelected={formData.challenges.channelManagement} onClick={() => handleChallengeToggle('channelManagement')} />
                    
                    <ChallengeOption id="scalingChallenges" icon={<BarChart size={20} />} label="Difficulty scaling customer service with growth" isSelected={formData.challenges.scalingChallenges} onClick={() => handleChallengeToggle('scalingChallenges')} />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between pt-6">
                  <button type="button" className="btn-secondary" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="btn-primary flex items-center" onClick={nextStep}>
                    Next Step
                    <ChevronRight className="ml-2" size={20} />
                  </button>
                </motion.div>
              </motion.div>}
            
            {currentStep === 3 && <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">Communication Channels</h3>
                  <p className="text-gray-600 mb-6">How do your customers reach you? Select all that apply.</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ChannelOption id="phone" icon={<Phone size={20} />} label="Phone Calls" isSelected={formData.communication.channels.phone} onClick={() => handleChannelToggle('phone')} />
                    
                    <ChannelOption id="email" icon={<Mail size={20} />} label="Email" isSelected={formData.communication.channels.email} onClick={() => handleChannelToggle('email')} />
                    
                    <ChannelOption id="sms" icon={<MessageCircle size={20} />} label="SMS/Text Messages" isSelected={formData.communication.channels.sms} onClick={() => handleChannelToggle('sms')} />
                    
                    <ChannelOption id="webChat" icon={<Inbox size={20} />} label="Website Chat" isSelected={formData.communication.channels.webChat} onClick={() => handleChannelToggle('webChat')} />
                    
                    <ChannelOption id="socialMedia" icon={<Globe size={20} />} label="Social Media" isSelected={formData.communication.channels.socialMedia} onClick={() => handleChannelToggle('socialMedia')} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <label htmlFor="leadVolume" className="label">Approximate Lead Volume (Monthly)</label>
                      <select id="leadVolume" className="input-field" value={formData.communication.leadVolume} onChange={e => updateFormData('communication', 'leadVolume', e.target.value)}>
                        <option value="">Select volume</option>
                        <option value="1-50">1-50 leads</option>
                        <option value="51-200">51-200 leads</option>
                        <option value="201-500">201-500 leads</option>
                        <option value="501-1000">501-1000 leads</option>
                        <option value="1000+">1000+ leads</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="responseTime" className="label">Current Average Response Time</label>
                      <select id="responseTime" className="input-field" value={formData.communication.responseTime} onChange={e => updateFormData('communication', 'responseTime', e.target.value)}>
                        <option value="">Select response time</option>
                        <option value="minutes">Within minutes</option>
                        <option value="hours">Within hours</option>
                        <option value="sameDay">Same day</option>
                        <option value="nextDay">Next day or later</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between pt-6">
                  <button type="button" className="btn-secondary" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="btn-primary flex items-center" onClick={nextStep}>
                    Next Step
                    <ChevronRight className="ml-2" size={20} />
                  </button>
                </motion.div>
              </motion.div>}
            
            {currentStep === 4 && <motion.div key="step4" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">Your Information</h3>
                  <p className="text-gray-600 mb-6">Tell us how to reach you to complete your Twine setup.</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="label">Full Name <span className="text-red-500">*</span></label>
                    <input id="name" type="text" className="input-field" placeholder="Your full name" value={formData.contact.name} onChange={e => updateFormData('contact', 'name', e.target.value)} required />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="label">Email Address <span className="text-red-500">*</span></label>
                    <input id="email" type="email" className="input-field" placeholder="you@example.com" value={formData.contact.email} onChange={e => updateFormData('contact', 'email', e.target.value)} required />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="label">Phone Number</label>
                    <input id="phone" type="tel" className="input-field" placeholder="(555) 123-4567" value={formData.contact.phone} onChange={e => updateFormData('contact', 'phone', e.target.value)} />
                  </div>
                  
                  <div className="bg-twine-50 p-4 rounded-lg mt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Award className="text-twine-600" size={20} />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-twine-900">
                          Ready to transform your customer communications
                        </p>
                        <p className="text-sm text-twine-700 mt-1">
                          By submitting this form, you'll get Twine's AI-powered platform tailored to your specific needs, 
                          a dedicated onboarding specialist, and priority support.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between pt-6">
                  <button type="button" className="btn-secondary" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="btn-primary flex items-center" onClick={nextStep}>
                    Complete Setup
                    <CheckCircle className="ml-2" size={20} />
                  </button>
                </motion.div>
              </motion.div>}
          </AnimatePresence>
          
          {/* Step completion screen */}
          {currentStep > totalSteps && <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5
        }} className="text-center py-6">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h3>
              <p className="text-gray-600 mb-6">
                Thanks for your interest in Twine. One of our onboarding specialists will contact you shortly 
                to get your account set up and tailored to your needs.
              </p>
              <div className="bg-twine-50 p-5 rounded-lg text-left mb-6 max-w-lg mx-auto">
                <h4 className="font-semibold text-twine-900 mb-2">What happens next?</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-twine-200 text-twine-700 text-xs font-bold">1</span>
                    <span className="ml-2 text-sm text-twine-800">Our team will review your information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-twine-200 text-twine-700 text-xs font-bold">2</span>
                    <span className="ml-2 text-sm text-twine-800">You'll get a call to discuss your specific needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-twine-200 text-twine-700 text-xs font-bold">3</span>
                    <span className="ml-2 text-sm text-twine-800">We'll help you set up Twine for your business</span>
                  </li>
                </ul>
              </div>
              <button className="btn-secondary" onClick={() => setCurrentStep(1)}>
                Start Over
              </button>
            </motion.div>}
        </div>
      </div>
    </div>;
};

// Challenge Option Component
const ChallengeOption = ({
  id,
  icon,
  label,
  isSelected,
  onClick
}) => {
  return <div onClick={onClick} className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-twine-50 border-twine-300 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
      <div className={`p-2 rounded-full ${isSelected ? 'bg-twine-100' : 'bg-gray-100'}`}>
        {icon}
      </div>
      <span className="ml-3 font-medium text-gray-800">{label}</span>
      <div className="ml-auto">
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-twine-600 border-twine-600' : 'border-gray-300'}`}>
          {isSelected && <CheckCircle size={14} className="text-white" />}
        </div>
      </div>
    </div>;
};

// Channel Option Component
const ChannelOption = ({
  id,
  icon,
  label,
  isSelected,
  onClick
}) => {
  return <div onClick={onClick} className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-twine-50 border-twine-300 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
      <div className={`p-2 rounded-full ${isSelected ? 'bg-twine-100' : 'bg-gray-100'}`}>
        {icon}
      </div>
      <span className="ml-3 font-medium text-gray-800">{label}</span>
      <div className="ml-auto">
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-twine-600 border-twine-600' : 'border-gray-300'}`}>
          {isSelected && <CheckCircle size={14} className="text-white" />}
        </div>
      </div>
    </div>;
};
export default Index;