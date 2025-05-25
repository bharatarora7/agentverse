import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Settings" 
        description="Configure your AgentVerse application preferences and integrations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage general application settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="appName">Application Name</Label>
              <Input id="appName" defaultValue="AgentVerse" />
            </div>

            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="darkMode" className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable or disable dark theme for the application.
                </p>
              </div>
              <Switch id="darkMode" aria-label="Toggle dark mode" />
            </div>
            
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email updates for important events.
                </p>
              </div>
              <Switch id="notifications" defaultChecked aria-label="Toggle email notifications" />
            </div>
            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Keys & Integrations */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>API Keys & Integrations</CardTitle>
            <CardDescription>Manage your API keys for third-party services.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="openaiKey">OpenAI API Key</Label>
              <Input id="openaiKey" type="password" placeholder="sk-xxxxxxxxxxxxxxxxxxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="geminiKey">Google Gemini API Key</Label>
              <Input id="geminiKey" type="password" placeholder="AIzaSyxxxxxxxxxxxxxxxxxxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="anthropicKey">Anthropic API Key</Label>
              <Input id="anthropicKey" type="password" placeholder="ak-xxxxxxxxxxxxxxxxxxxx" />
            </div>
             <div className="flex justify-end">
                <Button variant="outline">
                    Update Keys
                </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
         <Card className="lg:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your personal account details and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input id="userName" defaultValue="AI Engineer" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="userEmail">Email Address</Label>
                    <Input id="userEmail" type="email" defaultValue="engineer@agentverse.ai" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="userTimezone">Timezone</Label>
                {/* This would typically be a Select component */}
                <Input id="userTimezone" defaultValue="America/New_York (GMT-4)" />
            </div>
            <Separator />
            <div className="space-y-2">
                <h3 className="text-md font-medium">Change Password</h3>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
            </div>
             <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="mr-2 h-4 w-4" /> Update Account
                </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
