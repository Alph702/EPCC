
import { BookOpen, Trophy, AlertCircle, Users } from 'lucide-react';
import Rabi_ul_Awal from '../assets/Rabi_ul_Awal.jpg';

export interface Announcement {
  id: number;
  title: string;
  content: string;
  translations: {
    sindhi: {
      title: string;
      content: string;
    };
    urdu: {
      title: string;
      content: string;
    };
  };
  date: string;
  time: string;
  category: string;
  priority: string;
  icon: string;
  image: string;
  tagColor: string;
}

export const announcements: Announcement[] = [
  {
    id: 1,
    title: "🌙✨ 12th Rabi-ul-Awal Day 2 Activities ✨🌙",
    content: "Alhamdulillah! On Day 2 of the Students’ Seerat-un-Nabi (SAWW) Conference at Ehsan Panhwer Coaching Center Mirpurkhas, our Girls from all classes actively participated in the Naat and Qiraat Competitions, beautifully expressing their devotion, love, and reverence for our beloved Prophet Muhammad (SAWW).\n\nAt the conclusion, all Students and Teachers joined together in heartfelt duas for our beloved country and for the progress of our school. The day ended with a blessed Niaz-e-Rasool (SAWW), shared among all with love and unity. 🌹\n\n👏 A special appreciation goes to our Female Teaching Faculty for their dedication, hard work, and disciplined organization of this memorable event.\n\n✨ May Allah bless our students with the light of Seerat-un-Nabi (SAWW), and guide them towards knowledge, success, and strong faith. Ameen.",
    translations: {
      sindhi: {
        title: "🌙✨ 12 ربيع الاول ڏينهن 2 سرگرميون ✨🌙",
        content: "الحمدالله! شاگردن جي سيرت النبي (ص) ڪانفرنس جي ٻئي ڏينهن شاهه عبداللطيف هائير سيڪنڊري اسڪول ميرپورخاص ۾، اسان جي سڀني ڪلاسن جي ڇوڪرين نعت ۽ قرآت جي مقابلن ۾ ڀرپور شرڪت ڪئي، ۽ اسان جي پياري نبي ڪريم صلي الله عليه وآله وسلم جن سان پنهنجي عقيدت، محبت ۽ احترام جو خوبصورت اظهار ڪيو.\n\nآخر ۾، سڀني شاگردن ۽ استادن گڏجي اسان جي پياري ملڪ ۽ اسان جي اسڪول جي ترقي لاءِ دل سان دعائون گهريون. ڏينهن جو اختتام نياز رسول (ص) جي برڪت سان ٿيو، جيڪو سڀني ۾ محبت ۽ اتحاد سان ورهايو ويو. 🌹\n\n👏 اسان جي عورت استادن جي انهن جي لگن، محنت ۽ هن يادگار تقريب جي منظم تنظيم لاءِ خاص تعريف ڪئي وڃي ٿي.\n\n✨ الله اسان جي شاگردن کي سيرت النبي (ص) جي روشني سان منور فرمائي، ۽ انهن کي علم، ڪاميابي ۽ مضبوط ايمان جي طرف رهنمائي فرمائي. آمين.",
      },
      urdu: {
        title: "🌙✨ ١٢ ربیع الاول دن ٢ سرگرمیاں ✨🌙",
        content: "الحمدللہ! شاہ عبداللطیف ہائر سیکنڈری اسکول میرپورخاص میں طلباء کی سیرت النبی (ص) کانفرنس کے دوسرے دن، ہماری تمام کلاسوں کی لڑکیوں نے نعت اور قرآت کے مقابلوں میں بھرپور شرکت کی، اور ہمارے پیارے نبی کریم صلی اللہ علیہ وآلہ وسلم کے ساتھ اپنی عقیدت، محبت اور احترام کا خوبصورت اظہار کیا۔\n\nآخر میں، تمام طلباء اور اساتذہ نے مل کر ہمارے پیارے ملک اور ہمارے اسکول کی ترقی کے لیے تہہ دل سے دعائیں کیں۔ دن کا اختتام نیاز رسول (ص) کی برکت سے ہوا، جو سب میں محبت اور اتحاد کے ساتھ تقسیم کیا گیا۔ 🌹\n\n👏 ہماری خواتین اساتذہ کی ان کی لگن، محنت اور اس یادگار تقریب کی منظم تنظیم کے لیے خصوصی تعریف کی جاتی ہے۔\n\n✨ اللہ ہمارے طلباء کو سیرت النبی (ص) کی روشنی سے منور فرمائے، اور انہیں علم، کامیابی اور مضبوط ایمان کی طرف رہنمائی فرمائے۔ آمین۔",
      },
    },
    date: "2025-09-05",
    time: "All Day",
    category: "Cultural",
    priority: "high",
    icon: "BookOpen",
    image: Rabi_ul_Awal,
    tagColor: "#FF0000"
  },
];
