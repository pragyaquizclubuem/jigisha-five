import PageWrapper from "@/components/wrappers/PageWrapper";
import ContactForm from "@/components/contact/ContactForm";
import ContactFormArea from "@/components/contact/ContactFormArea";

export default function ContactPage() {
    return (
        <PageWrapper>
            <ContactForm />
            <ContactFormArea />
        </PageWrapper>
    );
}