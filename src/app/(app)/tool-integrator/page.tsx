
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Lightbulb } from 'lucide-react';

export default function ToolIntegratorPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Tool Integrator" 
        description="Test interactions between your AI agent and MCP tools using generative AI." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Integration Setup</CardTitle>
            <CardDescription>Provide details about your agent and the tool for interaction suggestions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="agentCapabilities" className="text-sm font-medium">AI Agent Capabilities</Label>
              <Textarea 
                id="agentCapabilities" 
                placeholder="e.g., Can understand natural language, make API calls, process JSON data, has access to user calendar..." 
                className="mt-1 min-h-[100px]" 
              />
            </div>
            
            <div>
              <Label htmlFor="toolSchema" className="text-sm font-medium">MCP Tool Schema (JSON)</Label>
              <Textarea 
                id="toolSchema" 
                placeholder='{ "name": "CalendarTool", "description": "Manages calendar events", "actions": [ ... ] }' 
                className="mt-1 min-h-[120px]" 
              />
            </div>

            <div>
              <Label htmlFor="integrationGoal" className="text-sm font-medium">Integration Goal</Label>
              <Textarea 
                id="integrationGoal" 
                placeholder="e.g., Schedule a meeting for next Tuesday at 3 PM named 'Project Sync'." 
                className="mt-1 min-h-[80px]" 
              />
            </div>
            
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Wand2 className="mr-2 h-4 w-4" /> Suggest Interaction Strategy
            </Button>
          </CardContent>
        </Card>

        {/* Suggestions Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" /> Suggested Strategy
            </CardTitle>
            <CardDescription>AI-powered recommendations for optimal tool interaction.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-md">Interaction Strategy:</h4>
                <p className="text-sm text-muted-foreground mt-1 bg-muted/50 p-3 rounded-md border whitespace-pre-wrap">
                  1. Agent parses the natural language goal: "Schedule a meeting for next Tuesday at 3 PM named 'Project Sync'".
                  {"\n"}2. Agent identifies the intent: "create_calendar_event".
                  {"\n"}3. Agent extracts parameters: date="next Tuesday", time="3 PM", title="Project Sync".
                  {"\n"}4. Agent resolves "next Tuesday" to a specific date (e.g., 2024-07-30).
                  {"\n"}5. Agent calls `CalendarTool.createEvent` with parameters: {'{ "date": "2024-07-30", "time": "15:00", "title": "Project Sync" }'}.
                  {"\n"}6. Agent confirms successful event creation based on tool response.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-md">Rationale:</h4>
                <p className="text-sm text-muted-foreground mt-1 bg-muted/50 p-3 rounded-md border">
                  This strategy directly maps the agent's NLU capabilities to the tool's action schema. It ensures all required parameters are extracted and formatted correctly for the `createEvent` action, minimizing errors and maximizing efficiency.
                </p>
              </div>
               <div className="h-[150px] border rounded-md p-3 bg-background overflow-y-auto mt-2">
                <p className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                  [<span className="text-primary">INFO</span>] Analyzing agent capabilities...
                  {"\n"}[<span className="text-primary">INFO</span>] Parsing tool schema: "CalendarTool" detected.
                  {"\n"}[<span className="text-primary">INFO</span>] Mapping goal to tool actions...
                  {"\n"}[<span className="text-accent">SUGGESTION</span>] Consider adding error handling for date conflicts.
                  {"\n"}[<span className="text-primary">SUCCESS</span>] Optimal strategy generated.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
