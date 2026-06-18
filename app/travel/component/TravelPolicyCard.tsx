import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Props {
  policy: {
    id: string;
    company: string;
    plan: string;
    premium: string;
    coverage: string;
  };
}

export function TravelPolicyCard({ policy }: Props) {
  return (
    <Card className="border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-700">
            Travel Insurance
          </span>
        </div>

        <CardTitle
          className="text-xl mt-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {policy.plan}
        </CardTitle>

        <p className="text-sm text-stone-500">
          {policy.company}
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Coverage</span>
            <span className="font-semibold">{policy.coverage}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Premium</span>
            <span className="font-semibold text-rose-600">
              {policy.premium}
            </span>
          </div>

          <Button className="w-full mt-4 bg-rose-600 hover:bg-rose-700">
            View Details
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}