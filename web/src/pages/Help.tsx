import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Help = () => {
  const faqs = [
    {
      question: "How do I invite team members?",
      answer: "Go to your Dashboard, click on 'Team Management', and use the 'Invite Member' button. You can invite up to 3 members on the free tier."
    },
    {
      question: "What's included in the free tier?",
      answer: "The free tier includes booking search for flights and hotels, up to 3 team members, basic travel policy controls, and email support."
    },
    {
      question: "How does the upgrade process work?",
      answer: "When you upgrade to Pro, you'll be redirected to our secure payment processor. Your plan will be active immediately after payment confirmation."
    },
    {
      question: "Can I cancel my Pro subscription?",
      answer: "Yes, you can cancel your Pro subscription at any time. Your account will revert to the free tier at the end of your billing period."
    },
    {
      question: "How do I set travel policies?",
      answer: "Navigate to Settings from your dashboard. You can set budget caps, preferred airlines, flight class restrictions, and approval rules."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and never store your full payment details. All transactions are processed through our secure payment partner."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions about LaaSy</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary bg-primary/5">
            <CardContent className="py-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
              <p className="text-muted-foreground mb-6">
                Our support team is here to assist you
              </p>
              <Button size="lg">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
