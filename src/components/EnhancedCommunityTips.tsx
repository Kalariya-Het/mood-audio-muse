
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import { Tip } from '@/types';
import { MessageCircle, Send, ThumbsUp, MapPin, MapPinOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const EnhancedCommunityTips: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [newTip, setNewTip] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [nearbyTipsOnly, setNearbyTipsOnly] = useState(false);
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedTips = localStorage.getItem('mindMosaicTips');
    if (savedTips) {
      try {
        const parsedTips = JSON.parse(savedTips);
        setTips(parsedTips.map((tip: any) => ({
          ...tip,
          timestamp: new Date(tip.timestamp)
        })));
      } catch (e) {
        console.error('Error parsing tips:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (locationEnabled) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            toast({
              title: "Location Enabled",
              description: "You'll now see tips from your area."
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            toast({
              variant: "destructive",
              title: "Location Error",
              description: "Couldn't access your location. Location features disabled."
            });
            setLocationEnabled(false);
          }
        );
      } else {
        toast({
          variant: "destructive",
          title: "Location Not Supported",
          description: "Your browser doesn't support geolocation."
        });
        setLocationEnabled(false);
      }
    }
  }, [locationEnabled, toast]);

  const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
    try {
      // Using a free reverse geocoding service
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      return data.address?.city || data.address?.town || data.address?.village || "Unknown location";
    } catch (error) {
      console.error("Error getting location name:", error);
      return "Unknown location";
    }
  };

  const handleAddTip = async () => {
    if (newTip.trim()) {
      const tipLocation = locationEnabled && userLocation ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        locationName: await getLocationName(userLocation.latitude, userLocation.longitude)
      } : undefined;

      const tip: Tip = {
        id: uuidv4(),
        text: newTip.trim(),
        timestamp: new Date(),
        likes: 0,
        likedBy: [],
        location: tipLocation
      };
      
      const updatedTips = [...tips, tip];
      setTips(updatedTips);
      localStorage.setItem('mindMosaicTips', JSON.stringify(updatedTips));
      setNewTip('');
      
      toast({
        title: "Tip Shared",
        description: locationEnabled && tipLocation 
          ? `Thank you for sharing from ${tipLocation.locationName}!`
          : "Thank you for sharing with the community!"
      });
    }
  };

  const handleLikeTip = (tipId: string) => {
    const userId = localStorage.getItem('mindMosaicUserId') || 
      `user-${Math.random().toString(36).substring(2, 15)}`;
    
    if (!localStorage.getItem('mindMosaicUserId')) {
      localStorage.setItem('mindMosaicUserId', userId);
    }
    
    const updatedTips = tips.map(tip => {
      if (tip.id === tipId) {
        const alreadyLiked = tip.likedBy?.includes(userId);
        if (alreadyLiked) {
          return {
            ...tip,
            likes: (tip.likes || 0) - 1,
            likedBy: tip.likedBy?.filter(id => id !== userId)
          };
        } else {
          return {
            ...tip,
            likes: (tip.likes || 0) + 1,
            likedBy: [...(tip.likedBy || []), userId]
          };
        }
      }
      return tip;
    });
    
    setTips(updatedTips);
    localStorage.setItem('mindMosaicTips', JSON.stringify(updatedTips));
  };

  const isLikedByUser = (tip: Tip): boolean => {
    const userId = localStorage.getItem('mindMosaicUserId');
    return Boolean(userId && tip.likedBy?.includes(userId));
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  const isNearby = (tipLocation?: {latitude: number, longitude: number}): boolean => {
    if (!tipLocation || !userLocation) return false;
    
    const distance = calculateDistance(
      userLocation.latitude, userLocation.longitude,
      tipLocation.latitude, tipLocation.longitude
    );
    
    // Consider tips within 20km as "nearby"
    return distance <= 20;
  };

  const displayTips = nearbyTipsOnly && userLocation
    ? tips.filter(tip => tip.location && isNearby(tip.location))
    : tips;

  return (
    <Card className="h-full overflow-hidden flex flex-col bg-white/80 backdrop-blur-sm shadow-soft border-mindmosaic-light-purple">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-mindmosaic-dark-purple">
            <MessageCircle size={20} />
            <span>Community Tips</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center justify-between mb-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-mindmosaic-purple" />
              <span>Location Sharing</span>
            </div>
            <Switch
              checked={locationEnabled}
              onCheckedChange={setLocationEnabled}
              aria-label="Toggle location sharing"
            />
          </div>
          
          {locationEnabled && userLocation && (
            <div className="flex items-center justify-between mb-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-mindmosaic-purple" />
                <span>Show nearby tips only</span>
              </div>
              <Switch
                checked={nearbyTipsOnly}
                onCheckedChange={setNearbyTipsOnly}
                aria-label="Toggle nearby tips only"
              />
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4">
          {displayTips.length > 0 ? (
            <div className="space-y-3">
              {displayTips.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map(tip => (
                <div key={tip.id} className="tip-item">
                  <p className="text-sm">{tip.text}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-xs text-gray-500">
                        {new Date(tip.timestamp).toLocaleDateString()}
                      </p>
                      {tip.location?.locationName && (
                        <p className="text-xs flex items-center text-mindmosaic-purple mt-1">
                          <MapPin size={10} className="inline mr-1" />
                          {tip.location.locationName}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleLikeTip(tip.id)}
                      variant="ghost"
                      size="sm"
                      className={`text-xs flex items-center gap-1 ${
                        isLikedByUser(tip) ? "text-mindmosaic-purple" : "text-gray-500"
                      }`}
                      aria-label={isLikedByUser(tip) ? "Unlike tip" : "Like tip"}
                    >
                      <ThumbsUp size={14} />
                      <span>{tip.likes || 0}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              {nearbyTipsOnly ? "No nearby tips found. Be the first to share!" : "No tips yet. Be the first to share!"}
            </div>
          )}
        </div>
        
        <div className="pt-2 border-t border-mindmosaic-light-purple">
          <div className="flex gap-2">
            <Input
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && newTip.trim() && handleAddTip()}
              placeholder="Share a wellness tip..."
              className="flex-1"
              aria-label="New community tip"
            />
            <Button 
              onClick={handleAddTip} 
              disabled={!newTip.trim()}
              className="bg-mindmosaic-purple hover:bg-mindmosaic-dark-purple shrink-0"
              aria-label="Share tip"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCommunityTips;
