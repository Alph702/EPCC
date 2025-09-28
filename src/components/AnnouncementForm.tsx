
import { useState, useEffect } from 'react';
import { Announcement } from '../data/announcements';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

const iconMap = {
  BookOpen: 'BookOpen',
  Trophy: 'Trophy',
  AlertCircle: 'AlertCircle',
  Users: 'Users',
};

interface AnnouncementFormProps {
  announcement: Announcement | null;
  onSave: (announcement: Announcement) => void;
  onCancel: () => void;
}

export function AnnouncementForm({ announcement, onSave, onCancel }: AnnouncementFormProps) {
  const [formData, setFormData] = useState<Announcement>({
    id: 0,
    title: '',
    content: '',
    translations: {
      sindhi: { title: '', content: '' },
      urdu: { title: '', content: '' },
    },
    date: '',
    time: '',
    category: '',
    priority: 'medium',
    icon: 'BookOpen',
    image: ''
  });
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (announcement) {
      setFormData(announcement);
    } else {
      setFormData({
        id: 0,
        title: '',
        content: '',
        translations: {
          sindhi: { title: '', content: '' },
          urdu: { title: '', content: '' },
        },
        date: '',
        time: '',
        category: '',
        priority: 'medium',
        icon: 'BookOpen',
        image: '',
        tagColor: '#000000'
      });
    }
  }, [announcement]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang?: 'sindhi' | 'urdu') => {
    const { name, value } = e.target;
    if (lang) {
      setFormData(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [lang]: {
            ...prev.translations[lang],
            [name]: value,
          },
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, image: '' })); // Clear image if no file selected
    }
  };

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const [sindhiRes, urduRes] = await Promise.all([
        fetch(`https://api.mymemory.translated.net/get?q=${formData.title}&langpair=en|sd`),
        fetch(`https://api.mymemory.translated.net/get?q=${formData.title}&langpair=en|ur`)
      ]);
      const sindhiTitle = (await sindhiRes.json()).responseData.translatedText;
      const urduTitle = (await urduRes.json()).responseData.translatedText;

      const [sindhiContentRes, urduContentRes] = await Promise.all([
        fetch(`https://api.mymemory.translated.net/get?q=${formData.content}&langpair=en|sd`),
        fetch(`https://api.mymemory.translated.net/get?q=${formData.content}&langpair=en|ur`)
      ]);
      const sindhiContent = (await sindhiContentRes.json()).responseData.translatedText;
      const urduContent = (await urduContentRes.json()).responseData.translatedText;

      setFormData(prev => ({
        ...prev,
        translations: {
          sindhi: { title: sindhiTitle, content: sindhiContent },
          urdu: { title: urduTitle, content: urduContent },
        },
      }));
    } catch (error) {
      console.error("Translation failed:", error);
    }
    setIsTranslating(false);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{announcement ? 'Edit' : 'Add'} Announcement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input name="date" type="date" value={formData.date} onChange={handleChange} />
          <Input name="time" type="time" value={formData.time} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <Select name="priority" value={formData.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="image-upload">Image</Label>
          <Input id="image-upload" name="image" type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image && (
            <div className="mt-2">
              <img src={formData.image} alt="Preview" className="max-w-full h-auto rounded-md" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select name="icon" value={formData.icon} onValueChange={(value) => handleSelectChange('icon', value)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.keys(iconMap).map(iconName => (
                <SelectItem key={iconName} value={iconName}>{iconName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>Tag Color</label>
          <Input name="tagColor" type="color" value={formData.tagColor} onChange={handleChange} />
        </div>
        <div>
          <label>Title (English)</label>
          <Input name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Content (English)</label>
          <Textarea name="content" value={formData.content} onChange={handleChange} />
        </div>
        <Button onClick={handleTranslate} disabled={isTranslating}>
          {isTranslating ? 'Translating...' : 'Translate'}
        </Button>
        <div>
          <label>Title (Sindhi)</label>
          <Input name="title" value={formData.translations.sindhi.title} onChange={(e) => handleChange(e, 'sindhi')} />
        </div>
        <div>
          <label>Content (Sindhi)</label>
          <Textarea name="content" value={formData.translations.sindhi.content} onChange={(e) => handleChange(e, 'sindhi')} />
        </div>
        <div>
          <label>Title (Urdu)</label>
          <Input name="title" value={formData.translations.urdu.title} onChange={(e) => handleChange(e, 'urdu')} />
        </div>
        <div>
          <label>Content (Urdu)</label>
          <Textarea name="content" value={formData.translations.urdu.content} onChange={(e) => handleChange(e, 'urdu')} />
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={onCancel} variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}
