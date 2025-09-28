
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { announcements as initialAnnouncements, Announcement } from '../data/announcements';
import { AnnouncementList } from './AnnouncementList';
import { AnnouncementForm } from './AnnouncementForm';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import useLocalStorage from '../hooks/useLocalStorage';

export function AdminDashboard() {
  const { logout } = useAuth();
  const [announcements, setAnnouncements] = useLocalStorage('announcements', initialAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [adminPassword, setAdminPassword] = useLocalStorage('adminPassword', 'admin');

  const handleAdd = () => {
    setSelectedAnnouncement({
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
    setIsFormOpen(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const handleSave = (announcement: Announcement) => {
    if (announcement.id) {
      setAnnouncements(announcements.map(a => a.id === announcement.id ? announcement : a));
    } else {
      const newAnnouncement = { ...announcement, id: Date.now() };
      setAnnouncements([...announcements, newAnnouncement]);
    }
    setIsFormOpen(false);
  };

  const handlePasswordChange = () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (oldPassword !== adminPassword) {
      setPasswordError('Invalid old password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setAdminPassword(newPassword);
    setPasswordSuccess('Password changed successfully!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button onClick={logout}>Logout</Button>
        </div>

        {isFormOpen ? (
          <AnnouncementForm 
            announcement={selectedAnnouncement}
            onSave={handleSave} 
            onCancel={() => setIsFormOpen(false)} 
          />
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Button onClick={handleAdd}>Add Announcement</Button>
            </div>
            <AnnouncementList 
              announcements={announcements} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {passwordError && <p className="text-red-500">{passwordError}</p>}
                  {passwordSuccess && <p className="text-green-500">{passwordSuccess}</p>}
                  <div>
                    <label>Old Password</label>
                    <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                  </div>
                  <div>
                    <label>New Password</label>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div>
                    <label>Confirm New Password</label>
                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handlePasswordChange}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
