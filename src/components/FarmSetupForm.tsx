import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sprout, Droplets, Sun, MapPin } from 'lucide-react';

interface FarmData {
  soilType: string;
  weather: string;
  cropType: string;
  farmSize: string;
  location: string;
  experience: string;
  goals: string;
}

interface FarmSetupFormProps {
  onSubmit: (data: FarmData) => void;
}

export const FarmSetupForm: React.FC<FarmSetupFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FarmData>({
    soilType: '',
    weather: '',
    cropType: '',
    farmSize: '',
    location: '',
    experience: '',
    goals: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof FarmData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-sky p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sprout className="h-8 w-8 text-crop" />
            <h1 className="text-4xl font-bold text-foreground">AgriLearn Academy</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Start your farming journey! Tell us about your land and goals.
          </p>
        </div>

        {/* Main Form */}
        <Card className="shadow-earth border-border/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              Setup Your Virtual Farm
            </CardTitle>
            <CardDescription>
              Choose your farming conditions to get personalized irrigation recommendations
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Soil & Environment */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="soilType" className="text-base font-medium flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-soil"></div>
                      Soil Type
                    </Label>
                    <Select value={formData.soilType} onValueChange={(value) => updateField('soilType', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="black">Black Soil (Rich in nutrients)</SelectItem>
                        <SelectItem value="red">Red Soil (Iron-rich)</SelectItem>
                        <SelectItem value="alluvial">Alluvial Soil (River deposits)</SelectItem>
                        <SelectItem value="clay">Clay Soil (Heavy, retains water)</SelectItem>
                        <SelectItem value="sandy">Sandy Soil (Quick drainage)</SelectItem>
                        <SelectItem value="loamy">Loamy Soil (Balanced mix)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="weather" className="text-base font-medium flex items-center gap-2">
                      <Sun className="h-4 w-4 text-warning" />
                      Climate Conditions
                    </Label>
                    <Select value={formData.weather} onValueChange={(value) => updateField('weather', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your climate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tropical">Tropical (Hot & Humid)</SelectItem>
                        <SelectItem value="temperate">Temperate (Moderate)</SelectItem>
                        <SelectItem value="arid">Arid (Hot & Dry)</SelectItem>
                        <SelectItem value="monsoon">Monsoon (Seasonal Rain)</SelectItem>
                        <SelectItem value="continental">Continental (Cold Winters)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-base font-medium">
                      Location/Region
                    </Label>
                    <Select value={formData.location} onValueChange={(value) => updateField('location', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north-india">North India</SelectItem>
                        <SelectItem value="south-india">South India</SelectItem>
                        <SelectItem value="west-india">West India</SelectItem>
                        <SelectItem value="east-india">East India</SelectItem>
                        <SelectItem value="central-india">Central India</SelectItem>
                        <SelectItem value="northeast-india">Northeast India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cropType" className="text-base font-medium flex items-center gap-2">
                      <Sprout className="h-4 w-4 text-crop" />
                      Crop Selection
                    </Label>
                    <Select value={formData.cropType} onValueChange={(value) => updateField('cropType', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose your crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rice">Rice (High water needs)</SelectItem>
                        <SelectItem value="wheat">Wheat (Moderate water)</SelectItem>
                        <SelectItem value="corn">Corn/Maize (Versatile)</SelectItem>
                        <SelectItem value="tomato">Tomato (High value)</SelectItem>
                        <SelectItem value="potato">Potato (Cool season)</SelectItem>
                        <SelectItem value="cotton">Cotton (Cash crop)</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane (High water)</SelectItem>
                        <SelectItem value="pulses">Pulses (Nitrogen fixing)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="farmSize" className="text-base font-medium">
                      Farm Size
                    </Label>
                    <Select value={formData.farmSize} onValueChange={(value) => updateField('farmSize', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select farm size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1-5 acres)</SelectItem>
                        <SelectItem value="medium">Medium (5-20 acres)</SelectItem>
                        <SelectItem value="large">Large (20+ acres)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-base font-medium">
                      Farming Experience
                    </Label>
                    <Select value={formData.experience} onValueChange={(value) => updateField('experience', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (New to farming)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Some experience)</SelectItem>
                        <SelectItem value="advanced">Advanced (Experienced farmer)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Goals */}
              <div>
                <Label htmlFor="goals" className="text-base font-medium flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-water" />
                  Farming Goals
                </Label>
                <Textarea
                  id="goals"
                  placeholder="What do you hope to achieve? (e.g., maximize yield, conserve water, organic farming, etc.)"
                  value={formData.goals}
                  onChange={(e) => updateField('goals', e.target.value)}
                  className="mt-2 min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  variant="farm" 
                  size="lg"
                  className="min-w-[200px]"
                  disabled={!formData.soilType || !formData.weather || !formData.cropType}
                >
                  <Sprout className="h-5 w-5 mr-2" />
                  Start Farming Journey
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};