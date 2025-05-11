import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ShieldAlert } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  category: z.string().min(1, "Please select a category"),
  tags: z.string().optional(),
});

const CreateStream = () => {
  const { connected, publicKey } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "crypto",
      tags: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!connected || !publicKey) {
      toast({
        title: "Wallet Error",
        description: "Please connect your wallet to start streaming",
        variant: "destructive",
      });
      return;
    }

    // Here we would typically save the stream details to a database
    // For now, we'll simulate creation and redirect to a stream page
    toast({
      title: "Stream Created!",
      description: "Your stream has been set up successfully. You can now go live!",
    });

    // Generate a random stream ID for demo purposes
    const streamId = Math.floor(Math.random() * 10000);
    navigate(`/stream/${streamId}`);
  };

  const categoryOptions = [
    { label: "Cryptocurrency", value: "crypto" },
    { label: "NFTs", value: "nfts" },
    { label: "Gaming", value: "gaming" },
    { label: "DeFi", value: "defi" },
    { label: "Development", value: "dev" },
    { label: "Trading", value: "trading" },
    { label: "Education", value: "education" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto bg-secondary border-white/5">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Create Your Stream</CardTitle>
          </CardHeader>
          <CardContent>
            {connected ? (
              <>
                <div className="bg-secondary/50 p-4 rounded-md border border-solana/20 mb-6">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={18} className="text-solana" />
                    <h3 className="text-white font-medium">Content Policy</h3>
                  </div>
                  <p className="text-white/70 text-sm mt-2">
                    Our platform allows adult content and nudity but prohibits violent material, gore, and sexual activity. 
                    Streams are monitored by our AI system and will be automatically terminated if violations are detected.
                  </p>
                </div>
              
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Stream Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a catchy title for your stream" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What will you be sharing in this stream?" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Category</FormLabel>
                          <FormControl>
                            <select 
                              className="w-full rounded-md border border-white/10 bg-secondary p-2 text-white"
                              {...field}
                            >
                              {categoryOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Tags (comma separated)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="solana, defi, crypto" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-solana hover:bg-solana/90 text-white"
                    >
                      Create Stream & Go Live
                    </Button>
                  </form>
                </Form>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-white mb-4">Please connect your wallet to create a stream</p>
                <Button className="bg-solana hover:bg-solana/90 text-white">
                  Connect Wallet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateStream;
