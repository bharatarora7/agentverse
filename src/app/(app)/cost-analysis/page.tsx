import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BarChartBig, AlertTriangle, Lightbulb, Calculator } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

export default function CostAnalysisPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Cost Analysis" 
        description="Estimate operational costs for agents using different tool configurations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Cost Estimation Setup</CardTitle>
            <CardDescription>Provide data to estimate tool configuration costs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="agentType" className="text-sm font-medium">Agent Type</Label>
              <Input id="agentType" placeholder="e.g., Customer Service Bot, Data Analyst Agent" className="mt-1" />
            </div>
            
            <div>
              <Label htmlFor="toolConfigs" className="text-sm font-medium">Tool Configurations (JSON)</Label>
              <Textarea 
                id="toolConfigs" 
                placeholder='{\n  "tools": [\n    { "type": "LanguageModel", "model": "gpt-4", "usage_frequency": "high" },\n    { "type": "DatabaseAccess", "cost_per_query": 0.01, "usage_frequency": "medium" }\n  ]\n}'
                className="mt-1 min-h-[120px]" 
              />
            </div>

            <div>
              <Label htmlFor="historicalData" className="text-sm font-medium">Historical Usage Data (JSON)</Label>
              <Textarea 
                id="historicalData" 
                placeholder='{\n  "period": "last_30_days",\n  "total_requests": 10000,\n  "tool_usage": { "LanguageModel": 8000, "DatabaseAccess": 2000 }\n}'
                className="mt-1 min-h-[100px]" 
              />
            </div>

             <div>
              <Label htmlFor="budgetLimit" className="text-sm font-medium">Budget Limit (Optional)</Label>
              <Input id="budgetLimit" type="number" placeholder="e.g., 500 (in USD)" className="mt-1" />
            </div>
            
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Calculator className="mr-2 h-4 w-4" /> Estimate Cost
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChartBig className="mr-2 h-5 w-5 text-primary" /> Cost Analysis Report
            </CardTitle>
            <CardDescription>Detailed breakdown and guidance based on your inputs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground">Estimated Monthly Cost: <span className="text-primary">$350.75</span></h3>
            </div>

            <div>
              <h4 className="font-semibold text-md">Cost Breakdown by Tool:</h4>
              <Table className="mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead>Tool Type</TableHead>
                    <TableHead>Configuration</TableHead>
                    <TableHead className="text-right">Estimated Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>LanguageModel</TableCell>
                    <TableCell>gpt-4, high usage</TableCell>
                    <TableCell className="text-right">$280.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DatabaseAccess</TableCell>
                    <TableCell>$0.01/query, medium usage</TableCell>
                    <TableCell className="text-right">$20.25</TableCell>
                  </TableRow>
                   <TableRow>
                    <TableCell>External API</TableCell>
                    <TableCell>Weather Service, low usage</TableCell>
                    <TableCell className="text-right">$50.00 (fixed)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h4 className="font-semibold text-md flex items-center"><Lightbulb className="mr-2 h-4 w-4 text-yellow-500" /> Budget Guidance:</h4>
              <p className="text-sm text-muted-foreground mt-1 bg-muted/50 p-3 rounded-md border">
                Your current estimated cost of $350.75 is within the $500 budget. 
                To further optimize:
                <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Consider using a less expensive LLM model (e.g., gpt-3.5-turbo) for tasks not requiring gpt-4's full capabilities. This could save up to 30%.</li>
                    <li>Analyze DatabaseAccess queries for potential caching opportunities to reduce query volume.</li>
                </ul>
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-md flex items-center"><AlertTriangle className="mr-2 h-4 w-4 text-destructive" /> Alerts:</h4>
                <div className="mt-1 bg-destructive/10 p-3 rounded-md border border-destructive/30">
                    <p className="text-sm text-destructive-foreground">
                        <Badge variant="destructive" className="mr-2">High Usage</Badge>
                        LanguageModel (gpt-4) constitutes 80% of the total cost. Monitor token usage closely.
                    </p>
                </div>
                 <div className="mt-2 bg-yellow-500/10 p-3 rounded-md border border-yellow-500/30">
                    <p className="text-sm text-yellow-700">
                        <Badge className="bg-yellow-500 hover:bg-yellow-500/90 text-white mr-2">Potential Spike</Badge>
                        If "External API" usage pattern changes, fixed cost might not apply. Review contract terms.
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
