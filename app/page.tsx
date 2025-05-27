"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import { AnimatedBackground } from '@/components/animated-background'

type Flight = {
  id: string;
  date: string;
  aircraft: {
    registration: string;
    makeModel: string;
  };
  route: {
    departure: string;
    arrival: string;
  };
  flightTime: {
    total: number;
    crossCountry: number;
    night: number;
  };
  conditions: "VFR" | "IFR";
};

export default function Home() {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedFlights = localStorage.getItem('flights');
      if (storedFlights) {
        const parsedFlights = JSON.parse(storedFlights);
        // Sort flights by date and take the 5 most recent
        const recentFlights = parsedFlights
          .sort((a: Flight, b: Flight) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
        setFlights(recentFlights);
      }
    } catch (err) {
      console.error('Error loading flights:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="py-20 text-center relative z-10">
        <h1 className="text-5xl font-bold mb-6 gradient-text">
          Welcome to Venturi Aviation
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Revolutionizing aviation through blockchain technology and innovative solutions
        </p>
      </section>

      {/* Company Facts Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 relative z-10">
        {/* Vision Card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Our Vision</h2>
          <p className="text-muted-foreground">
            To transform aviation through blockchain technology, making air travel more efficient, 
            transparent, and accessible while maintaining the highest standards of safety and compliance.
          </p>
        </div>

        {/* Technology Card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Innovation</h2>
          <p className="text-muted-foreground">
            Leveraging cutting-edge blockchain technology to create a secure, immutable, and 
            transparent ecosystem for aviation operations and maintenance records.
          </p>
        </div>

        {/* Safety Card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Safety First</h2>
          <p className="text-muted-foreground">
            Our commitment to aviation safety is unwavering. We combine traditional safety 
            protocols with modern technology to ensure the highest standards of operational safety.
          </p>
        </div>

        {/* Blockchain Card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Blockchain Integration</h2>
          <p className="text-muted-foreground">
            Secure, transparent, and immutable record-keeping for maintenance logs, flight data, 
            and operational metrics, revolutionizing how aviation data is managed and verified.
          </p>
        </div>

        {/* Market Data Card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Market Intelligence</h2>
          <p className="text-muted-foreground">
            Real-time market data and analytics to help aviation professionals make informed 
            decisions about aircraft values, maintenance costs, and market trends.
          </p>
        </div>

        {/* Community Card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Aviation Community</h2>
          <p className="text-muted-foreground">
            Building a connected ecosystem of pilots, operators, and aviation professionals 
            through our innovative platform and collaborative tools.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center relative z-10">
        <Link 
          href="/dashboard" 
          className="btn-primary inline-block"
        >
          Go to Dashboard
        </Link>
      </section>
    </div>
  );
}
