// import {
//   ShieldCheck,
//   Plane,
//   Briefcase,
//   HeartPulse,
// } from "lucide-react";

// const benefits = [
//   {
//     icon: HeartPulse,
//     title: "Medical Coverage",
//     description: "Emergency hospitalization and treatment abroad.",
//   },
//   {
//     icon: Plane,
//     title: "Trip Delays",
//     description: "Compensation for flight disruptions and delays.",
//   },
//   {
//     icon: Briefcase,
//     title: "Lost Baggage",
//     description: "Coverage for baggage loss or theft.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Passport Protection",
//     description: "Help with lost passport replacement expenses.",
//   },
// ];

// export function TravelBenefits() {
//   return (
//     <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
//       {benefits.map((item) => {
//         const Icon = item.icon;

//         return (
//           <div
//             key={item.title}
//             className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm"
//           >
//             <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center">
//               <Icon className="w-5 h-5 text-rose-600" />
//             </div>

//             <h3 className="font-semibold text-stone-900 mt-4">
//               {item.title}
//             </h3>

//             <p className="text-sm text-stone-500 mt-2">
//               {item.description}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }