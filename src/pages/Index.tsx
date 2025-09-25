import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, Droplets, Sun, Trophy, Users, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import farmHeroImage from '@/assets/farm-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${farmHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <Sprout className="h-12 w-12 text-crop" />
            <h1 className="text-6xl font-bold text-foreground">AgriLearn Academy</h1>
          </div>
          
          <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master the art of sustainable farming through interactive gameplay. 
            Learn irrigation techniques, soil management, and crop cultivation in a fun, gamified environment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild variant="farm" size="xl">
              <Link to="/farm">
                <Gamepad2 className="h-6 w-6 mr-2" />
                Start Farming Journey
              </Link>
            </Button>
            <Button variant="outline" size="xl">
              Learn More
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-earth border-border/20 hover:shadow-tool transition-all duration-300">
              <CardHeader className="text-center">
                <Droplets className="h-12 w-12 mx-auto mb-4 text-water" />
                <CardTitle className="text-xl">Smart Irrigation</CardTitle>
                <CardDescription>
                  Learn water-efficient irrigation methods tailored to your soil and climate conditions.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-earth border-border/20 hover:shadow-tool transition-all duration-300">
              <CardHeader className="text-center">
                <Sun className="h-12 w-12 mx-auto mb-4 text-warning" />
                <CardTitle className="text-xl">Sustainable Practices</CardTitle>
                <CardDescription>
                  Discover eco-friendly farming techniques that protect soil health and maximize yield.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-earth border-border/20 hover:shadow-tool transition-all duration-300">
              <CardHeader className="text-center">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-accent" />
                <CardTitle className="text-xl">Gamified Learning</CardTitle>
                <CardDescription>
                  Earn rewards and unlock achievements as you progress through farming challenges.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="bg-background/95 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to start your agricultural education journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-gradient-field w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-crop-foreground">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Setup Your Farm</h3>
              <p className="text-muted-foreground">
                Input your soil type, climate conditions, and crop preferences to get personalized recommendations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-soil w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-soil-foreground">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Learn & Practice</h3>
              <p className="text-muted-foreground">
                Follow step-by-step instructions and practice farming techniques in our interactive simulator.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-harvest w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-warning-foreground">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Harvest Success</h3>
              <p className="text-muted-foreground">
                Complete farming cycles, earn rewards, and apply your knowledge to real-world agriculture.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Become a Smart Farmer?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of learners who are mastering sustainable agriculture through our gamified platform.
          </p>
          
          <Button asChild variant="farm" size="xl">
            <Link to="/farm">
              <Users className="h-6 w-6 mr-2" />
              Start Learning Today
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
