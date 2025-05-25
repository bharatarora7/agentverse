import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Edit3, Trash2, Wand2, Save } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for scenarios
const mockScenarios = [
  { id: 'scn_001', name: 'Basic Flight Booking', description: 'Test agent ability to book a simple one-way flight.', lastEdited: '2024-07-15' },
  { id: 'scn_002', name: 'Complex Itinerary Planning', description: 'Agent plans a multi-city trip with hotel and car rental.', lastEdited: '2024-07-12' },
  { id: 'scn_003', name: 'Customer Support Escalation', description: 'Test agent handling of an angry customer and escalation.', lastEdited: '2024-07-10' },
];


export default function ScenarioEditorPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Scenario Editor" 
        description="Create, edit, and manage testing scenarios for your AI agents."
        actions={<Button><PlusCircle className="mr-2 h-4 w-4" /> Create New Scenario</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario List Section */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Existing Scenarios</CardTitle>
            <Input placeholder="Search scenarios..." className="mt-2" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Last Edited</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockScenarios.map((scenario) => (
                  <TableRow key={scenario.id}>
                    <TableCell className="font-medium">{scenario.name}</TableCell>
                    <TableCell>{scenario.lastEdited}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Scenario Editing Section */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Edit Scenario: Basic Flight Booking</CardTitle>
            <CardDescription>Modify the details of the selected scenario.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="scenarioName" className="text-sm font-medium">Scenario Name</Label>
              <Input id="scenarioName" defaultValue="Basic Flight Booking" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="scenarioDescription" className="text-sm font-medium">High-Level Description</Label>
              <Textarea 
                id="scenarioDescription" 
                defaultValue="Test agent ability to book a simple one-way flight from New York to London for next Monday."
                className="mt-1 min-h-[80px]" 
              />
              <Button variant="outline" size="sm" className="mt-2">
                <Wand2 className="mr-2 h-4 w-4" /> Generate Details with AI
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="envSettings" className="text-sm font-medium">Environment Settings (JSON)</Label>
                    <Textarea 
                        id="envSettings" 
                        defaultValue='{\n  "user_location": "New York",\n  "preferred_currency": "USD",\n  "time_zone": "EST"\n}'
                        className="mt-1 min-h-[120px] font-mono text-xs" 
                    />
                </div>
                <div>
                    <Label htmlFor="agentGoals" className="text-sm font-medium">Agent Goals (JSON)</Label>
                    <Textarea 
                        id="agentGoals" 
                        defaultValue='[\n  {\n    "goal": "Find cheapest one-way flight from JFK to LHR for 2024-08-05."\n  }\n]'
                        className="mt-1 min-h-[120px] font-mono text-xs" 
                    />
                </div>
            </div>

            <div>
              <Label htmlFor="acceptanceCriteria" className="text-sm font-medium">Acceptance Criteria (Markdown)</Label>
              <Textarea 
                id="acceptanceCriteria" 
                defaultValue="- Agent successfully identifies a valid flight.\n- Agent presents the flight option to the user.\n- Agent correctly extracts price and flight number."
                className="mt-1 min-h-[100px]" 
              />
            </div>
            
            <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="mr-2 h-4 w-4" /> Save Scenario
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
