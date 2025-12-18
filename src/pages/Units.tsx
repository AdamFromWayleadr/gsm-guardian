import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Unit {
  id: string;
  phoneNumber: string;
  customer: string;
  location: string;
  platform: string;
  successRate: number;
  lastChecked: string;
  status: "success" | "warning" | "error";
}

const mockUnits: Unit[] = [
  { id: "1", phoneNumber: "+1-555-0123", customer: "Acme Corp", location: "New York, US", platform: "Vonage", successRate: 98.5, lastChecked: "2 min ago", status: "success" },
  { id: "2", phoneNumber: "+44-20-7946-0958", customer: "TechStart Inc", location: "London, UK", platform: "MessageBird", successRate: 87.2, lastChecked: "5 min ago", status: "warning" },
  { id: "3", phoneNumber: "+49-30-123456", customer: "GlobalCom", location: "Berlin, DE", platform: "Vonage", successRate: 45.0, lastChecked: "1 min ago", status: "error" },
  { id: "4", phoneNumber: "+33-1-42-68-53-00", customer: "NexGen Solutions", location: "Paris, FR", platform: "MessageBird", successRate: 96.8, lastChecked: "3 min ago", status: "success" },
  { id: "5", phoneNumber: "+1-555-0456", customer: "Acme Corp", location: "Los Angeles, US", platform: "Vonage", successRate: 92.1, lastChecked: "8 min ago", status: "success" },
  { id: "6", phoneNumber: "+81-3-1234-5678", customer: "TechStart Inc", location: "Tokyo, JP", platform: "Vonage", successRate: 78.4, lastChecked: "12 min ago", status: "warning" },
];

export default function Units() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUnits = mockUnits.filter(
    (unit) =>
      unit.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            ALL UNITS
          </p>
          <h1 className="text-3xl font-bold text-foreground">GSM Units</h1>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search units..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="vonage">Vonage</SelectItem>
            <SelectItem value="messagebird">MessageBird</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Healthy</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Critical</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="fr">France</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Success Rate (7d)</TableHead>
              <TableHead>Last Checked</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUnits.map((unit) => (
              <TableRow 
                key={unit.id} 
                className="hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <TableCell>
                  <span className={cn(
                    "status-dot",
                    unit.status === "success" && "status-success",
                    unit.status === "warning" && "status-warning",
                    unit.status === "error" && "status-error"
                  )} />
                </TableCell>
                <TableCell className="font-medium">{unit.phoneNumber}</TableCell>
                <TableCell>{unit.customer}</TableCell>
                <TableCell className="text-muted-foreground">{unit.location}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-muted rounded text-xs font-medium">
                    {unit.platform}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "font-medium",
                    unit.successRate >= 95 && "text-success",
                    unit.successRate >= 80 && unit.successRate < 95 && "text-warning",
                    unit.successRate < 80 && "text-destructive"
                  )}>
                    {unit.successRate}%
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{unit.lastChecked}</TableCell>
                <TableCell>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
