"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomCheckbox from "@/components/forms/elements/CustomCheckbox";
import CustomFileInput from "@/components/forms/elements/CustomFileInput";
import CustomRadioGroup from "@/components/forms/elements/CustomRadioGroup";
import CustomSelect from "@/components/forms/elements/CustomSelect";
import CustomSwitch from "@/components/forms/elements/CustomSwitch";
import CustomTextArea from "@/components/forms/elements/CustomTextArea";
import MultipleSelector from "@/components/forms/elements/MultipleSelector";
import SubmitButton from "@/components/forms/elements/SubmitButton";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableOfContents from "./TableOfContents";
import { formSchema, FormValues } from "./schema";
import CustomInput from "@/components/forms/elements/CustomInput";

const FormPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            frameworks: [],
            skills: [],
            languages: [],
            newsletter: false,
            notifications: true,
            darkMode: false,
            terms: false,
            marketing: false,
            updates: false,
        },
    });

    const onSubmit = (data: FormValues) => {
        setIsLoading(true);
        console.log(data);
        setSubmittedData(data);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="p-8 container mx-auto">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Comprehensive Form Elements Showcase</h1>
                <p className="text-lg text-gray-600 mb-6">
                    A complete showcase of all custom form elements with multiple examples, built with ShadCN UI, React Hook Form, and Zod validation.
                </p>

                {/* Table of Contents */}
                <TableOfContents onNavigate={scrollToSection} />
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

                {/* Section 1: Personal Information */}
                <section id="personal-info">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-2xl">👤</span>
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📝 Basic Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CustomInput
                                    {...register("name")}
                                    label="Full Name"
                                    placeholder="John Doe Smith"
                                    error={errors.name?.message}
                                    disabled={isLoading}
                                    hint="Enter your complete legal name"
                                    showHint
                                    required
                                />
                                <CustomInput
                                    {...register("email")}
                                    label="Email Address (Optional)"
                                    placeholder="john.doe@company.com"
                                    type="email"
                                    error={errors.email?.message}
                                    disabled={isLoading}
                                />
                                <CustomInput
                                    {...register("phone")}
                                    label="Phone Number (Optional)"
                                    placeholder="+1 (555) 123-4567"
                                    type="tel"
                                    error={errors.phone?.message}
                                    disabled={isLoading}
                                />
                            </CardContent>
                        </Card>

                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📄 Biography
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CustomTextArea
                                    {...register("bio")}
                                    label="Professional Bio (Optional)"
                                    placeholder="Write a brief professional biography about yourself..."
                                    error={errors.bio?.message}
                                    disabled={isLoading}
                                    rows={6}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Section 2: Account & File Upload */}
                <section id="account-file-upload">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-2xl">🔐</span>
                        Account & File Upload
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🔑 Login Credentials
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CustomInput
                                    {...register("username")}
                                    label="Username"
                                    placeholder="johndoe123"
                                    error={errors.username?.message}
                                    disabled={isLoading}
                                    hint="Must be at least 3 characters long"
                                    showHint
                                    required
                                />
                                <CustomInput
                                    {...register("password")}
                                    label="Password"
                                    placeholder="Create a strong password"
                                    type="password"
                                    error={errors.password?.message}
                                    disabled={isLoading}
                                    hint="Minimum 8 characters required"
                                    showHint
                                    required
                                />
                            </CardContent>
                        </Card>
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📤 Document Upload
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CustomFileInput
                                    {...register("profile")}
                                    label="Profile Picture"
                                    disabled={isLoading}
                                    hint="Upload a professional headshot (JPG, PNG, max 5MB)"
                                    showHint
                                    required
                                />
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Section 3: Location & Identity */}
                <section id="location-identity">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-2xl">🌍</span>
                        Location & Identity
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🗺️ Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CustomSelect
                                    {...register("country")}
                                    className="w-full"
                                    label="Country of Residence"
                                    onValueChange={(val) => setValue("country", val)}
                                    placeholder="Select your country"
                                    options={[
                                        { value: "us", label: "United States" },
                                        { value: "ca", label: "Canada" },
                                        { value: "uk", label: "United Kingdom" },
                                        { value: "in", label: "India" },
                                        { value: "au", label: "Australia" },
                                    ]}
                                    error={errors.country?.message}
                                    disabled={isLoading}
                                    required
                                />
                            </CardContent>
                        </Card>

                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    👥 Identity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CustomRadioGroup
                                    {...register("gender")}
                                    label="Gender Identity"
                                    onValueChange={val => setValue("gender", val as "male" | "female" | "other")}
                                    options={[
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                        { value: "other", label: "Other / Prefer not to say" },
                                    ]}
                                    error={errors.gender?.message}
                                    disabled={isLoading}
                                    required
                                />
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Section 4: Professional Information */}
                <section id="professional">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-2xl">💼</span>
                        Professional Information
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📊 Experience & Work Mode
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <CustomRadioGroup
                                    {...register("experience")}
                                    label="Experience Level"
                                    onValueChange={val => setValue("experience", val as "junior" | "mid" | "senior")}
                                    options={[
                                        { value: "junior", label: "Junior (0-2 years)", description: "New to the field with basic skills" },
                                        { value: "mid", label: "Mid-level (3-5 years)", description: "Experienced with proven track record" },
                                        { value: "senior", label: "Senior (6+ years)", description: "Expert level with leadership experience" },
                                    ]}
                                    error={errors.experience?.message}
                                    disabled={isLoading}
                                    required
                                />
                                <CustomRadioGroup
                                    {...register("workMode")}
                                    label="Preferred Work Mode"
                                    onValueChange={val => setValue("workMode", val as "remote" | "hybrid" | "onsite")}
                                    options={[
                                        { value: "remote", label: "Remote Only", description: "Work from anywhere" },
                                        { value: "hybrid", label: "Hybrid", description: "Mix of remote and office work" },
                                        { value: "onsite", label: "On-site", description: "Traditional office environment" },
                                    ]}
                                    error={errors.workMode?.message}
                                    disabled={isLoading}
                                    orientation="horizontal"
                                    required
                                />
                            </CardContent>
                        </Card>

                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🛠️ Technical Skills
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CustomSelect
                                    {...register("framework")}
                                    className="w-full"
                                    label="Primary Framework"
                                    onValueChange={(val) => setValue("framework", val)}
                                    placeholder="Choose your main framework"
                                    options={[
                                        { value: "react", label: "React" },
                                        { value: "vue", label: "Vue.js" },
                                        { value: "angular", label: "Angular" },
                                        { value: "svelte", label: "Svelte" },
                                    ]}
                                    error={errors.framework?.message}
                                    disabled={isLoading}
                                    required
                                />
                                <MultipleSelector
                                    label="Additional Frameworks"
                                    placeholder="Select frameworks you work with"
                                    onValueChange={(val) => setValue("frameworks", val)}
                                    options={[
                                        { value: "react", label: "React" },
                                        { value: "vue", label: "Vue.js" },
                                        { value: "angular", label: "Angular" },
                                        { value: "svelte", label: "Svelte" },
                                        { value: "nextjs", label: "Next.js" },
                                        { value: "nuxt", label: "Nuxt.js" },
                                    ]}
                                    error={errors.frameworks?.message}
                                    disabled={isLoading}
                                    required
                                />
                                <MultipleSelector
                                    label="Technical Skills (Optional)"
                                    placeholder="Select your technical skills"
                                    onValueChange={(val) => setValue("skills", val)}
                                    options={[
                                        { value: "javascript", label: "JavaScript" },
                                        { value: "typescript", label: "TypeScript" },
                                        { value: "python", label: "Python" },
                                        { value: "java", label: "Java" },
                                        { value: "csharp", label: "C#" },
                                        { value: "go", label: "Go" },
                                    ]}
                                    error={errors.skills?.message}
                                    disabled={isLoading}
                                />
                                <MultipleSelector
                                    label="Spoken Languages"
                                    placeholder="Select languages you speak"
                                    onValueChange={(val) => setValue("languages", val)}
                                    options={[
                                        { value: "english", label: "English" },
                                        { value: "spanish", label: "Spanish" },
                                        { value: "french", label: "French" },
                                        { value: "german", label: "German" },
                                        { value: "mandarin", label: "Mandarin" },
                                        { value: "hindi", label: "Hindi" },
                                    ]}
                                    error={errors.languages?.message}
                                    disabled={isLoading}
                                    required
                                />
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Section 5: Communication */}
                <section id="communication">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-2xl">💬</span>
                        Communication
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    ✍️ Messages & Feedback
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CustomTextArea
                                    {...register("message")}
                                    label="Your Message"
                                    placeholder="Tell us about your project requirements, goals, and any specific details..."
                                    error={errors.message?.message}
                                    disabled={isLoading}
                                    rows={4}
                                    hint="Minimum 10 characters required"
                                    showHint
                                    required
                                />
                                <CustomTextArea
                                    {...register("feedback")}
                                    label="Feedback & Suggestions"
                                    placeholder="Share your thoughts, suggestions, or feedback about our service..."
                                    error={errors.feedback?.message}
                                    disabled={isLoading}
                                    rows={3}
                                    resize={false}
                                    required
                                />
                            </CardContent>
                        </Card>

                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📋 Priority Level
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CustomSelect
                                    {...register("priority")}
                                    className="w-full"
                                    label="Priority Level"
                                    onValueChange={(val) => setValue("priority", val)}
                                    placeholder="Select priority level"
                                    options={[
                                        { value: "low", label: "Low Priority" },
                                        { value: "medium", label: "Medium Priority" },
                                        { value: "high", label: "High Priority" },
                                        { value: "urgent", label: "Urgent" },
                                    ]}
                                    error={errors.priority?.message}
                                    disabled={isLoading}
                                    required
                                />
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Section 6: Preferences & Settings */}
                <section id="preferences">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-2xl">⚙️</span>
                        Preferences & Settings
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    ☑️ Agreements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CustomCheckbox
                                    {...register("terms")}
                                    label="I accept the Terms and Conditions and Privacy Policy"
                                    error={errors.terms?.message}
                                    disabled={isLoading}
                                    checked={watch("terms")}
                                    onCheckedChange={(checked) => setValue("terms", checked)}
                                    required
                                />
                                <CustomCheckbox
                                    {...register("marketing")}
                                    label="I would like to receive marketing emails and promotional offers"
                                    error={errors.marketing?.message}
                                    disabled={isLoading}
                                    checked={watch("marketing")}
                                    onCheckedChange={(checked) => setValue("marketing", checked)}
                                />
                                <CustomCheckbox
                                    {...register("updates")}
                                    label="Send me product updates and feature announcements"
                                    error={errors.updates?.message}
                                    disabled={isLoading}
                                    checked={watch("updates")}
                                    onCheckedChange={(checked) => setValue("updates", checked)}
                                />
                            </CardContent>
                        </Card>

                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🔘 Notification Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CustomSwitch
                                    {...register("newsletter")}
                                    label="Subscribe to Newsletter"
                                    error={errors.newsletter?.message}
                                    disabled={isLoading}
                                    checked={watch("newsletter")}
                                    onCheckedChange={(checked) => setValue("newsletter", checked)}
                                />
                                <CustomSwitch
                                    {...register("notifications")}
                                    label="Enable Push Notifications"
                                    error={errors.notifications?.message}
                                    disabled={isLoading}
                                    checked={watch("notifications")}
                                    onCheckedChange={(checked) => setValue("notifications", checked)}
                                />
                                <CustomSwitch
                                    {...register("darkMode")}
                                    label="Dark Mode Theme"
                                    error={errors.darkMode?.message}
                                    disabled={isLoading}
                                    checked={watch("darkMode")}
                                    onCheckedChange={(checked) => setValue("darkMode", checked)}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                    <SubmitButton
                        isLoading={isLoading}
                        className="w-full py-4 text-lg font-semibold"
                    >
                        {isLoading ? "Processing Your Application..." : "Submit Complete Application"}
                    </SubmitButton>
                </div>
            </form>

            {/* Success Display */}
            {submittedData && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="text-green-600">✅ Application Submitted Successfully</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-6 bg-gray-50 rounded-lg border">
                            <h3 className="font-semibold mb-4">Submitted Data:</h3>
                            <pre className="whitespace-pre-wrap break-all text-sm overflow-auto max-h-96 bg-white p-4 rounded border">
                                {JSON.stringify(submittedData, null, 2)}
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default FormPage;
