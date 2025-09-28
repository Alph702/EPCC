import { motion } from 'motion/react';
import { Calendar, Clock, BookOpen, Trophy, AlertCircle, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './functions/ImageWithFallback';
import { useState } from 'react';
import AnnouncementModal from './AnnouncementModal';
import useLocalStorage from '../hooks/useLocalStorage';
import { announcements as initialAnnouncements } from '../data/announcements';

const iconMap = {
  BookOpen,
  Trophy,
  AlertCircle,
  Users,
};

interface AnnouncementsPageProps {
  onBack: () => void;
  language: string;
}

export function AnnouncementsPage({ onBack, language }: AnnouncementsPageProps) {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [announcements] = useLocalStorage('announcements', initialAnnouncements);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-primary/10 text-primary border-primary/20';
      case 'Sports': return 'bg-accent/50 text-accent-foreground border-accent';
      case 'Important': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Cultural': return 'bg-secondary/50 text-secondary-foreground border-secondary';
      case 'Notice': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTranslated = (announcement: any, field: string) => {
    if (language === 'Sindhi' && announcement.translations.sindhi[field]) {
      return announcement.translations.sindhi[field];
    } else if (language === 'Urdu' && announcement.translations.urdu[field]) {
      return announcement.translations.urdu[field];
    } else {
      return announcement[field];
    }
  }

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
  };

  return (
    <>
      <div className="min-h-screen bg-background relative overflow-hidden pt-20">
        {/* Background with sandpaper texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0),
                linear-gradient(45deg, transparent 25%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 50%, transparent 50%, transparent 75%, rgba(0,0,0,0.05) 75%)
              `,
              backgroundSize: '12px 12px, 24px 24px'
            }}
          />
        </div>



        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
              School Announcements
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news, events, and important information from Ehsan Panhwer Coaching Center
            </p>
          </motion.div>

          {/* Announcements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {announcements.map((announcement, index) => {
              const Icon = iconMap[announcement.icon as keyof typeof iconMap] || BookOpen;
              const safeTagColor = announcement.tagColor || '#CCCCCC'; // Fallback to a default gray
              const rgb = hexToRgb(safeTagColor);

              return (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col backdrop-blur-sm bg-background/95 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={announcement.image}
                      alt={getTranslated(announcement, 'title')}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Priority badge */}
                    <div className="absolute top-3 right-3">
                      {announcement.priority && <Badge className={`${getPriorityColor(announcement.priority)} font-medium`}>
                        {announcement.priority.toUpperCase()}
                      </Badge>}
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-3 left-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon size={20} className="text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  <CardHeader className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="outline" 
                        style={{
                          backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`,
                          color: safeTagColor,
                          borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`,
                        }}
                      >
                        {announcement.category}
                      </Badge>
                    </div>
                    
                    <CardTitle className="line-clamp-2">{getTranslated(announcement, 'title')}</CardTitle>
                    <CardDescription className="line-clamp-3 flex-grow">
                      {getTranslated(announcement, 'content')}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={16} />
                        <span>{new Date(announcement.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={16} />
                        <span>
                          {announcement.time && announcement.time !== "All Day" ?
                            new Date(`2000-01-01T${announcement.time}`).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                            })
                            : "All Day"
                          }
                        </span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full group" onClick={() => setSelectedAnnouncement(announcement)}>
                      <span>Read More</span>
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )})
          }
          </div>

          {/* Load More Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center pb-16"
          >
            {/* <Button size="lg" variant="outline" className="px-8 py-3">
              Load More Announcements
            </Button> */}
          </motion.div>
        </div>
      </div>
      <AnnouncementModal
        isOpen={selectedAnnouncement !== null}
        onClose={() => setSelectedAnnouncement(null)}
        announcement={selectedAnnouncement}
        language={language}
      />
    </>
  );
}