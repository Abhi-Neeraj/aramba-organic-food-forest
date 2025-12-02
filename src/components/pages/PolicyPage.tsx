import { motion } from 'framer-motion';
import { CheckCircle, FileText } from 'lucide-react';

export default function PolicyPage() {
  const sections = [
    {
      title: 'Farmer Guidelines & MOU Framework',
      icon: FileText,
      content: [
        {
          heading: '1. Partnership Overview',
          text: 'ARAMBA is committed to building sustainable partnerships with organic farmers. This Memorandum of Understanding (MOU) outlines the framework for collaboration, ensuring mutual growth and transparency.'
        },
        {
          heading: '2. Farmer Eligibility Criteria',
          text: 'Farmers must be certified organic producers with valid certifications. They should maintain quality standards and provide regular product updates. All farmers must comply with food safety regulations and provide necessary documentation.'
        },
        {
          heading: '3. Product Quality Standards',
          text: 'All products must meet ARAMBA quality benchmarks. Products should be fresh, pesticide-free, and properly packaged. Regular quality audits will be conducted to ensure compliance.'
        },
        {
          heading: '4. Pricing & Payment Terms',
          text: 'Prices are determined based on market rates and product quality. Payments are processed within 7-10 business days of delivery. Farmers receive detailed payment statements with each transaction.'
        },
        {
          heading: '5. Delivery & Logistics',
          text: 'Farmers are responsible for timely delivery to designated collection points. ARAMBA provides logistics support for bulk orders. Delivery schedules are coordinated in advance.'
        },
        {
          heading: '6. Seasonal Availability',
          text: 'Farmers must provide seasonal availability calendars. Advance notice is required for any changes in production capacity. ARAMBA helps farmers plan for off-season alternatives.'
        },
        {
          heading: '7. Communication & Support',
          text: 'Regular communication channels are maintained through our farmer portal. Dedicated support team assists with queries and issues. Monthly farmer meetings are conducted for feedback and improvements.'
        },
        {
          heading: '8. Dispute Resolution',
          text: 'Any disputes are resolved through mutual discussion and negotiation. A formal grievance mechanism is in place for unresolved issues. Third-party mediation is available if needed.'
        },
        {
          heading: '9. Termination Clause',
          text: 'Either party can terminate the partnership with 30 days written notice. Outstanding payments will be settled within 15 days of termination. Inventory will be managed according to agreed terms.'
        },
        {
          heading: '10. Commitment to Sustainability',
          text: 'ARAMBA and farmers commit to sustainable farming practices. We support soil health, water conservation, and biodiversity. Training programs are provided for sustainable agriculture techniques.'
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-primary text-primary-foreground py-12 md:py-16"
      >
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="h-10 w-10 text-secondary" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Farmer Guidelines & MOU Framework
            </h1>
          </div>
          <p className="text-lg font-paragraph text-primary-foreground/90 max-w-2xl">
            Building sustainable partnerships with organic farmers through transparent and fair practices
          </p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-[100rem] mx-auto px-6 py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {sections[0].content.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg border border-primary/10 p-6 md:p-8 hover:border-secondary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-3">
                    {section.heading}
                  </h2>
                  <p className="font-paragraph text-primary/80 leading-relaxed">
                    {section.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-secondary/10 rounded-lg border border-secondary/20 p-8 text-center"
        >
          <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
            Ready to Partner with ARAMBA?
          </h3>
          <p className="font-paragraph text-primary/80 mb-6 max-w-2xl mx-auto">
            Join our network of organic farmers and grow your business with us. We're committed to fair practices and sustainable agriculture.
          </p>
          <a
            href="https://wa.me/9666277729?text=Hi%20ARAMBA%2C%20I%20am%20interested%20in%20becoming%20a%20farmer%20partner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-lg font-paragraph font-semibold transition-colors"
          >
            Contact Us on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
