'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { Formik, Form } from 'formik'
import { Icon } from '@iconify/react'
import Button from '../common/Buttons/Button'
import InputField from "../common/inputs/InputField";
import FadeUpCard from "@/src/animations/FadeButtomUp";
import { feedbackSchema, FeedbackFormValues } from '@/src/utils/validations/FormValidation';
import { useCreateFeedback, submitFeedbackForm } from '@/src/hooks/useFeedback';

const initialValues: FeedbackFormValues = {
  name: '',
  designation: '',
  feedback: '',
  rating: 0,
  image: '' as any
}

const FormComponent = ({ onClose }: { onClose: () => void }) => {
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [imageName, setImageName] = React.useState<string>('')
  const [toast, setToast] = React.useState<{ type: 'success' | 'error', message: string } | null>(null)
  
  // Initialize the mutation hook
  const createFeedbackMutation = useCreateFeedback()

  // Lock body scroll when form is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Auto-hide toast after 3 seconds
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const handleSubmit = async (values: FeedbackFormValues, { resetForm, setSubmitting }: any) => {
    console.log('🚀 Feedback Form Submitted!');
    console.log('📝 Form Values:', values);
    console.log('🖼️ Image File:', values.image);
    console.log('⭐ Rating:', values.rating);
    console.log('👤 Name:', values.name);
    console.log('💼 Designation:', values.designation);
    console.log('💬 Feedback:', values.feedback);
    
    submitFeedbackForm(
      values,
      createFeedbackMutation,
      resetForm,
      setSubmitting,
      onClose
    )
  }

  const modalContent = (
    <div 
      className="bg-black/50 flex items-center justify-center z-[9999] p-4" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        transform: 'translateZ(0)',
        overflow: 'hidden',
        willChange: 'transform',
        margin: 0,
        padding: '1rem'
      }}
    >
      <div className="bg-teal-800 rounded-lg shadow-2xl max-w-xl w-full mx-2 sm:mx-4 md:mx-0 relative">
        {/* Toast Notification - Inside Form */}
        {toast && (
          <div 
            className={`absolute top-2 left-2 z-[10001] p-3 sm:p-4 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 max-w-xs sm:max-w-sm ${
              toast.type === 'success' 
                ? 'bg-green text-white' 
                : 'bg-red text-white'
            }`}
            style={{
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            <Icon 
              icon={toast.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'} 
              className="text-lg sm:text-xl flex-shrink-0"
            />
            <span className="font-medium text-sm sm:text-base">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-1 sm:ml-2 hover:opacity-70 flex-shrink-0"
            >
              <Icon icon="mdi:close" className="text-lg sm:text-xl" />
            </button>
          </div>
        )}
        
        <div className="p-3 sm:p-4 md:p-5">
          {/* Header */}
          <div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6">
            <div className="flex-1 pr-2">
              <FadeUpCard delay={0.3}>
                <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3 mb-2 sm:mb-3">
                  <Icon icon={"mdi:hand-heart"} className="text-lg sm:text-xl text-yellow" />
                  <span className="text-yellow font-caveat font-extrabold text-sm sm:text-lg md:text-xl">
                    Start Donating Poor People
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-nunito font-extrabold text-white leading-tight">
                  Share Your <span className="text-yellow">Experience!</span>
                </h2>
              </FadeUpCard>
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white text-xl sm:text-2xl ml-2 sm:ml-4 flex-shrink-0"
            >
              <Icon icon="mdi:close" />
            </button>
          </div>



          <FadeUpCard>
            <Formik initialValues={initialValues} validationSchema={feedbackSchema} onSubmit={handleSubmit}>
              {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                <Form className="space-y-4 sm:space-y-5 px-2 sm:px-3 py-2 sm:py-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative">
                      <InputField
                        name="name"
                        placeholder="Your name..."
                        icon={"mdi:account"}
                        textSize="text-base"
                        errorTextSize="text-sm"
                        iconClassName="text-yellow text-base font-bold size-5 mt-[2px]"
                        className="w-full rounded-md flex border border-gray-green text-sm sm:text-base bg-foreground/18 h-[44px] sm:h-[48px] px-3 sm:px-4 py-2 sm:py-3 
                   text-white focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <InputField
                        name="designation"
                        textSize="text-base"
                        errorTextSize="text-sm"
                        placeholder="Your designation..."
                        icon="mdi:briefcase"
                        iconClassName="text-yellow text-base font-bold size-5 mt-[2px]"
                        className="w-full rounded-md border flex border-gray-green h-[44px] sm:h-[48px] bg-foreground/18 px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="relative">
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                      Rating * (1-5)
                    </label>
                    <div className="flex gap-1 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFieldValue('rating', star)}
                          className={`text-lg sm:text-xl ${
                            star <= values.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          } hover:text-yellow-400 transition-colors`}
                        >
                          <Icon icon="mdi:star" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative text-white">
                    <InputField
                      as="textarea"
                      name="feedback"
                      textSize="text-base"
                      errorTextSize="text-sm"
                      placeholder="Your feedback..."
                      icon={"mdi:message-text"}
                      iconClassName="text-yellow text-base font-bold size-5 mt-[2px]"
                      className="w-full rounded-md border border-gray-green flex h-[80px] sm:h-[96px] bg-foreground/18 px-3 sm:px-4 py-2 sm:py-3 focus:outline-none resize-none"
                    />
                    <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 text-xs text-gray-400">
                      {values.feedback ? `${values.feedback.length}/275` : '0/275'}
                    </div>
                  </div>

                  <div className="relative text-white">
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                      Profile Image *
                    </label>
                    <div className="relative">
                      {imagePreview ? (
                        <div className="w-full rounded-md border-2 border-yellow bg-foreground/18 p-3 sm:p-4">
                          <div className="flex items-center gap-2 sm:gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-blue text-xs sm:text-sm font-medium mb-1 truncate">
                                {imageName}
                              </div>
                              <div className="text-gray-400 text-xs sm:text-sm">
                                Uploaded successfully
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null)
                                setImageName('')
                                setFieldValue('image', null)
                              }}
                              className="text-red-400 hover:text-red-300 text-lg sm:text-xl flex-shrink-0"
                            >
                              <Icon icon="mdi:close" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full rounded-md border-2 border-dashed border-yellow bg-foreground/18 h-24 sm:h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-foreground/25 transition-colors">
                          <Icon 
                            icon="mdi:image-plus" 
                            className="text-yellow text-2xl sm:text-4xl mb-1 sm:mb-2"
                          />
                          <div className="text-center px-2">
                            <span className="text-gray-400 text-xs sm:text-sm font-base">Drag & Drop your images here or </span>
                            <span className="text-yellow text-xs sm:text-sm font-semibold cursor-pointer">browse files</span>
                          </div>
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  setImagePreview(e.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                                setImageName(file.name);
                              }
                              setFieldValue('image', file);
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                    {errors.image && touched.image && (
                      <div className="text-red-400 text-xs mt-1">
                        {typeof errors.image === 'string' ? errors.image : 'Image is required'}
                      </div>
                    )}
                  </div>

                  <div className="py-2 sm:py-3 text-center">
                    <div className="inline-block">
                      <Button
                      type="submit"
                      bgColor="bg-yellow"
                      textColor="text-black"
                      hoverTextColor="group-hover:text-white"
                      hoverBg="before:bg-foreground"
                      paddingx="px-6 sm:px-10"
                      paddingy="py-3 sm:py-4"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </FadeUpCard>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default FormComponent
