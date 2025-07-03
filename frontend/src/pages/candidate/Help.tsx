import { Accordion } from "@/components/ui/AccordionFAQ";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

export default function HelpFAQ() {
  const faqs = [
    {
      icon: "✉️",
      question: "Como me candidato a uma vaga?",
      answer:
        "Basta acessar a página da vaga desejada e clicar no botão “Candidatar-se Agora”. Complete os dados e envie seu CV.",
    },
    {
      icon: "🚀",
      question: "Como acompanho o progresso da minha candidatura?",
      answer:
        "Acesse o seu Dashboard e confira os status das suas candidaturas, como Análise, Entrevista ou Aprovado.",
    },
    {
      icon: "🛌",
      question: "Como posso reagendar uma entrevista?",
      answer:
        'No menu de entrevistas, clique em "Reagendar" e escolha um novo horário. A empresa será notificada automaticamente.',
    },
    {
      icon: "📲",
      question: "Receberei notificações por WhatsApp ou e-mail?",
      answer:
        "Sim! Certifique-se de ter preenchido corretamente seu e-mail e número de WhatsApp no perfil para receber atualizações importantes.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-10 text-blue-700 text-center">
        Dúvidas Frequentes (FAQ)
      </h1>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} value={`faq-${index}`}>
            <Accordion.Trigger className="text-left text-lg font-medium">
              {faq.icon} {faq.question}
            </Accordion.Trigger>
            <Accordion.Content className="text-gray-600">
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>

      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-700 text-base sm:text-lg">
          Não encontrou sua resposta? Entre em contato com nosso suporte:
        </p>

        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm sm:text-base"
        >
          <a
            href="https://wa.me/258841234567"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="inline-block mr-2" size={18} />
            Falar com Suporte via WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
