import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TravelFilter() {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <Input placeholder="Destination Country" />

        <Input type="date" />

        <Input type="date" />

        <Button className="bg-rose-600 hover:bg-rose-700">
          Compare Plans
        </Button>
      </div>
    </div>
  );
}