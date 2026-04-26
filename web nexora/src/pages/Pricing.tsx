import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../lib/api";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for exploring AI capabilities and small projects.",
    features: ["1,000 AI Operations/mo", "Basic Analytics", "Community Support", "API Access (Rate Limited)"],
    buttonText: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    description: "Ideal for growing teams needing powerful AI intelligence.",
    features: ["50,000 AI Operations/mo", "Advanced Real-time Analytics", "Priority Support 24/7", "Unlimited API Access", "Custom Integration"],
    buttonText: "Get Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Dedicated infrastructure and unlimited scaling for enterprises.",
    features: ["Unlimited Operations", "Dedicated GPU Instances", "Dedicated Account Manager", "On-Premise Deployment", "Custom AI Models"],
    buttonText: "Contact Sales",
    popular: false,
  }
];

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async (tier: typeof tiers[0]) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (tier.price === "Custom") {
      // Assuming contact sales or similar for Enterprise
      window.location.href = "mailto:sales@nexora.example.com";
      return;
    }

    try {
      const amount = parseInt(tier.price.replace("$", ""));
      const order = await fetchApi<any>("/payments/create-order", {
        method: "POST",
        body: JSON.stringify({ amount, planName: tier.name }),
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Nexora",
        description: `Subscription for ${tier.name} plan`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            await fetchApi("/payments/verify-payment", {
              method: "POST",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            
            toast.success("Payment Successful!", {
              description: `Welcome to the ${tier.name} plan. Your intelligence journey begins now!`,
              duration: 5000,
              icon: <Sparkles className="w-5 h-5 text-purple-400" />,
            });
          } catch (err: any) {
            toast.error("Payment Verification Failed", {
              description: err.message,
            });
          }
        },
        prefill: {
          name: (user as any).name || '',
          email: (user as any).email || '',
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast.error("Process Failed", {
        description: err.message,
      });
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tight mb-6"
          >
            Transparent <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Pricing</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto font-light"
          >
            Scale your intelligence without limits. Choose a plan that fuels your growth.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative rounded-3xl p-8 glass border backdrop-blur-xl ${
                tier.popular 
                  ? "border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)] md:-mt-8" 
                  : "border-white/10"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">
                    <Zap className="w-3 h-3" /> Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm h-10">{tier.description}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-5xl font-black">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-purple-500/20 p-1">
                      <Check className="w-3 h-3 text-purple-400" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handlePayment(tier)}
                className={`w-full h-12 rounded-xl text-md transition-all ${
                  tier.popular 
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] border-none text-white" 
                    : "glass hover:bg-white/10 text-foreground"
                }`}
                variant={tier.popular ? "default" : "outline"}
              >
                {tier.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
