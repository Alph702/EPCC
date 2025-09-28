import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, School } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  language: string;
}

export function LoginPage({ language }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const translations = {
    'English': {
      'Admin Login': 'Admin Login',
      'Sign in to the admin dashboard': 'Sign in to the admin dashboard',
      'Password': 'Password',
      'Enter your password': 'Enter your password',
      'Sign In': 'Sign In',
    },
    'Sindhi': {
      'Admin Login': 'ايڊمن لاگ ان',
      'Sign in to the admin dashboard': 'ايڊمن ڊيش بورڊ ۾ سائن ان ڪريو',
      'Password': 'پاسورڊ',
      'Enter your password': 'پنهنجو پاسورڊ داخل ڪريو',
      'Sign In': 'سائن ان ڪريو',
    },
    'Urdu': {
      'Admin Login': 'ایڈمن لاگ ان',
      'Sign in to the admin dashboard': 'ایڈمن ڈیش بورڈ میں سائن ان کریں',
      'Password': 'پاس ورڈ',
      'Enter your password': 'اپنا پاس ورڈ درج کریں',
      'Sign In': 'سائن ان کریں',
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const success = login(password);
    if (!success) {
      setError('Invalid password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-md mx-auto"
        >
          <Card className="backdrop-blur-sm bg-background/95 border-border/50 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center"
              >
                <School size={32} className="text-primary-foreground" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <CardTitle className="text-2xl font-bold text-primary">{t['Admin Login']}</CardTitle>
                <CardDescription className="mt-2">
                  {t['Sign in to the admin dashboard']}
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent>
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password">{t['Password']}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t['Enter your password']}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-input-background border-border/50 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm text-center"
                  >
                    Invalid password. Please try again.
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                    ) : (
                      t['Sign In']
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}