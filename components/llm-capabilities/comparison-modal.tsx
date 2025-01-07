'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVehicle: {
    name: string;
    description: string;
    accuracy: number;
    responseTime: number;
    industryAccuracy: number;
    industryResponseTime: number;
  };
  competitor: {
    name: string;
    description: string;
    accuracy: number;
    responseTime: number;
  };
}

export function ComparisonModal({ isOpen, onClose, currentVehicle, competitor }: ComparisonModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background rounded-lg p-6 w-[90vw] max-w-7xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">车型对比</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[currentVehicle, competitor].map((vehicle, index) => (
                <div key={index} className="space-y-4">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      alt={`${vehicle.name} demonstration`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <button className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <Play className="h-8 w-8" />
                      </button>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      4K Ultra HD
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {vehicle.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 overflow-hidden">
                          {vehicle.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Info className="h-4 w-4" />
                        <span>00:05:32</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

