import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Target, Heart, Lightbulb, Award } from 'lucide-react';
import { ImageWithFallback } from './functions/ImageWithFallback';
import conslingImage from '../assets/consling.jpg';


interface MissionSectionProps {
  language: string;
}

export function MissionSection({ language }: MissionSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const translations = {
    'English': {
      'Our Mission & Values': 'Our Mission & Values',
      'Institution Overview': 'EPCC Mirpurkhas, also known as Education Polytechnic Community College Mirpurkhas, is a community college and polytechnic institute. Our primary tagline is: \'Earn without limits, succeed without hesitation!\'',
      'Mission Statement': 'Education For All',
      'School Leadership Team': 'School Leadership Team',
      'Accessibility': 'Accessibility',
      'Education available to all community members.': 'Education available to all community members.',
      'Practical Focus': 'Practical Focus',
      'Emphasis on employable skills.': 'Emphasis on employable skills.',
      'Success Orientation': 'Success Orientation',
      'Confidence building.': 'Confidence building.',
      'Community Service': 'Community Service',
      'Local education provider for Mirpurkhas region.': 'Local education provider for Mirpurkhas region.',
    },
    'Sindhi': {
      'Our Mission & Values': 'اسان جو مشن ۽ قدر',
      'Institution Overview': 'اي پي سي سي ميرپورخاص، جنهن کي ايجوڪيشن پولي ٽيڪنڪ ڪميونٽي ڪاليج ميرپورخاص پڻ چيو وڃي ٿو، هڪ ڪميونٽي ڪاليج ۽ پولي ٽيڪنڪ ادارو آهي. اسان جو بنيادي نعرو آهي: \'حد کان سواءِ ڪمايو، بغير ڪنهن هٻڪ جي ڪامياب ٿيو!\'',
      'Mission Statement': 'سڀني لاءِ تعليم',
      'School Leadership Team': 'اسڪول قيادت ٽيم',
      'Accessibility': 'پهچ',
      'Education available to all community members.': 'سڀني برادري جي ميمبرن لاءِ تعليم موجود آهي.',
      'Practical Focus': 'عملي توجهه',
      'Emphasis on employable skills.': 'ملازمت جي قابل صلاحيتن تي زور.',
      'Success Orientation': 'ڪاميابي جي رخ',
      'Confidence building.': 'اعتماد پيدا ڪرڻ.',
      'Community Service': 'برادري جي خدمت',
      'Local education provider for Mirpurkhas region.': 'ميرپورخاص علائقي لاءِ مقامي تعليم فراهم ڪندڙ.',
    },
    'Urdu': {
      'Our Mission & Values': 'ہمارا مشن اور اقدار',
      'Institution Overview': 'ای پی سی سی میرپورخاص، جسے ایجوکیشن پولی ٹیکنک کمیونٹی کالج میرپورخاص بھی کہا جاتا ہے، ایک کمیونٹی کالج اور پولی ٹیکنک ادارہ ہے۔ ہمارا بنیادی نعرہ ہے: \'حدود کے بغیر کمائیں، بلا جھجھک کامیاب ہوں!\'',
      'Mission Statement': 'سب کے لیے تعلیم',
      'School Leadership Team': 'اسکول کی قیادت کی ٹیم',
      'Accessibility': 'رسائی',
      'Education available to all community members.': 'تمام کمیونٹی ممبران کے لیے تعلیم دستیاب ہے۔',
      'Practical Focus': 'عملی توجہ',
      'Emphasis on employable skills.': 'قابل ملازمت مہارتوں پر زور۔',
      'Success Orientation': 'کامیابی کی سمت',
      'Confidence building.': 'اعتماد پیدا کرنا۔',
      'Community Service': 'کمیونٹی سروس',
      'Local education provider for Mirpurkhas region.': 'میرپورخاص علاقے کے لیے مقامی تعلیمی فراہم کنندہ۔',
    },
  };

  const t = translations[language as keyof typeof translations];

  const values = [
    {
      icon: Target,
      title: t.Accessibility,
      description: t['Education available to all community members.']
    },
    {
      icon: Heart,
      title: t['Practical Focus'],
      description: t['Emphasis on employable skills.']
    },
    {
      icon: Lightbulb,
      title: t['Success Orientation'],
      description: t['Confidence building.']
    },
    {
      icon: Award,
      title: t['Community Service'],
      description: t['Local education provider for Mirpurkhas region.']
    }
  ];

  return (
    <section id="mission" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Textured background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.1) 2px,
                rgba(0,0,0,0.1) 4px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.05) 2px,
                rgba(0,0,0,0.05) 4px
              )
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
              {t['Our Mission & Values']}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t['Institution Overview']}
            </p>
          </motion.div>
        </div>

        {/* Mission statement with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-border/50 relative overflow-hidden"
          >
            {/* Decorative texture overlay */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
                backgroundSize: '16px 16px'
              }}
            />
            
            <div className="relative z-10 text-center lg:text-left">
              <motion.blockquote 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-xl lg:text-2xl font-medium text-foreground leading-relaxed"
              >
                "{t['Mission Statement']}"
              </motion.blockquote>
              <motion.cite 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="block mt-6 text-muted-foreground text-lg"
              >
                — {t['School Leadership Team']}
              </motion.cite>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src={conslingImage}
              alt="Diverse students learning in classroom"
              className="w-full h-64 lg:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </motion.div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-background/70 backdrop-blur-sm rounded-xl p-6 border border-border/50 text-center relative overflow-hidden group"
            >
              {/* Hover effect background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId={`bg-${index}`}
              />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
                >
                  <value.icon size={32} className="text-primary" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}