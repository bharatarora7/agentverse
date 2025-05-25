
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, Play, Pause, RotateCcw, AlertCircle, DollarSign, ListChecks } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AgentTesterPage() {
  const [agentConfig, setAgentConfig] = useState('');
  const [scenario, setScenario] = useState('');
  const [agentGoal, setAgentGoal] = useState('');

  // onClick handlers are now inline alerts for diagnostics

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Agent Tester"
        description="Upload agent configurations and test them against predefined or custom scenarios."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Section */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Set up your agent and scenario for testing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="agentConfig" className="text-sm font-medium">Agent Configuration (JSON)</Label>
              <Textarea 
                id="agentConfig" 
                placeholder='{ "name": "MyAgent", "version": "1.0", ... }' 
                className="mt-1 min-h-[100px]" 
                value={agentConfig}
                onChange={(e) => setAgentConfig(e.target.value)}
              />
              <button
                onClick={() => alert('Upload Config button clicked!')}
                className="mt-2 w-full h-9 px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium flex items-center justify-center gap-2"
              >
                <UploadCloud className="mr-2 h-4 w-4" /> Upload Config
              </button>
            </div>

            <div>
              <Label htmlFor="scenarioSelect" className="text-sm font-medium">Select Scenario</Label>
              <Input 
                id="scenarioSelect" 
                placeholder="Search or select a scenario..." 
                className="mt-1" 
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
              />
              <button
                onClick={() => alert('Create New Scenario link clicked!')}
                className="mt-2 w-full h-9 px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium flex items-center justify-center gap-2"
              >
                <ListChecks className="mr-2 h-4 w-4" /> Create New Scenario
              </button>
            </div>

            <Separator />

            <div>
              <Label htmlFor="agentGoal" className="text-sm font-medium">Agent Goal/Prompt</Label>
              <Textarea 
                id="agentGoal" 
                placeholder="Example: Book a flight to Paris for next week." 
                className="mt-1 min-h-[80px]" 
                value={agentGoal}
                onChange={(e) => setAgentGoal(e.target.value)}
              />
            </div>

            <button
              onClick={() => alert('Start Test button clicked!')}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
            >
              <Play className="mr-2 h-4 w-4" /> Start Test
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={() => alert('Pause button clicked!')}
                className="w-full h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium flex items-center justify-center gap-2"
              >
                <Pause className="mr-2 h-4 w-4" /> Pause
              </button>
              <button
                onClick={() => alert('Reset button clicked!')}
                className="w-full h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium flex items-center justify-center gap-2"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Execution & Logging Section */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Execution & Logs</CardTitle>
            <CardDescription>Observe agent interactions and detailed logs in real-time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-muted/50 rounded-md border border-muted">
                <h4 className="font-semibold text-sm">Current Step: <span className="font-normal">Agent Initializing</span></h4>
                <p className="text-xs text-muted-foreground">Waiting for agent to process the goal...</p>
            </div>

            <div className="h-[300px] border rounded-md p-3 bg-background overflow-y-auto">
              <p className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                [<span className="text-primary">LOG</span>] Agent "MyAgent" started with goal: "Book a flight..."
                {"\n"}[<span className="text-accent">TOOL_CALL</span>] Using tool "FlightBookingAPI" with params: {'{ "destination": "Paris" }'}
                {"\n"}[<span className="text-primary">TOOL_RESPONSE</span>] API success: {'{ "options": [...] }'}
                {"\n"}[<span className="text-destructive">ERROR</span>] Failed to parse date. Invalid format.
                {"\n"}[<span className="text-primary">LOG</span>] Agent attempting to clarify date format...
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-secondary/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center"><AlertCircle className="mr-2 h-5 w-5 text-destructive" /> Performance & Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">Time per step: <span className="font-semibold">150ms</span></p>
                        <p className="text-sm">Errors: <span className="font-semibold text-destructive">1</span></p>
                        <p className="text-xs text-muted-foreground mt-1">Bottleneck identified in date parsing module.</p>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center"><DollarSign className="mr-2 h-5 w-5 text-primary" /> Cost Estimation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">Current session cost: <span className="font-semibold">$0.023</span></p>
                        <p className="text-sm">Projected total: <span className="font-semibold">$0.15</span></p>
                        <p className="text-xs text-muted-foreground mt-1">Based on token usage and tool API calls.</p>
                    </CardContent>
                </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
