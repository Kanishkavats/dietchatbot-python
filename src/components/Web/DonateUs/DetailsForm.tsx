 "use client";
import { Formik, Form } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";





import { DetailsformSchema, DetailsFormValues } from "@/src/utils/validations/FormValidation";
import { DetailsInformationForm } from "@/src/services/web";
import toast from "react-hot-toast";
import InputField from "../../UI/web/InputField";
import Button from "../../UI/web/Buttons/Button";
import ButtonLoader from "../../UI/web/Loader/ButtonLoader";
const initialValues: DetailsFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
};
const DetailsForm = () => {
    const { t } = useTranslation();
    const mutation = useMutation({
        mutationFn: DetailsInformationForm,
        onSuccess: () => {
            toast.success(t("Form submitted successfully!"));
        },
        onError: (error: any) => {
            toast.error(t("Something went wrong. Try again."));
            console.error("Submission error:", error);
        },
    });
    const handleSubmit = (
        values: DetailsFormValues,
        { resetForm }: { resetForm: () => void }
    ) => {
        mutation.mutate(values, {
            onSuccess: () => {
                resetForm();
            },
        });
    };
    return (
        <div className="w-full mx-auto bg-white">
            <h2 className="text-2xl font-bold mb-6">{t("Details Information")}</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={DetailsformSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField name="firstName" placeholder={t("First Name")} icon="mdi:account" />
                            <InputField name="lastName" placeholder={t("Last Name")} icon="mdi:account" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField name="email" placeholder={t("Your Email")} icon="mdi:email" />
                            <InputField name="phone" placeholder={t("Your Number")} icon="mdi:phone" />
                        </div>
                        <InputField name="address" placeholder={t("Your Address")} icon="mdi:map-marker" />
                        <InputField
                            name="message"
                            placeholder={t("Your message...")}
                            icon="mdi:email-outline"
                            as="textarea"
                        />
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            hoverBg="before:bg-foreground"
                        >
                            {isSubmitting || mutation.isPending ? <ButtonLoader /> : t("Save Information")}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
export default DetailsForm; 