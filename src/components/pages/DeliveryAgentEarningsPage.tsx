import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { date: 'Mon', amount: 450 },
  { date: 'Tue', amount: 620 },
  { date: 'Wed', amount: 580 },
  { date: 'Thu', amount: 750 },
  { date: 'Fri', amount: 890 },
  { date: 'Sat', amount: 1200 },
  { date: 'Sun', amount: 950 },
];

const transactions = [
  { id: 1, date: '2025-11-29', orders: 8, amount: 950, status: 'completed' },
  { id: 2, date: '2025-11-28', orders: 6, amount: 1200, status: 'completed' },
  { id: 3, date: '2025-11-27', orders: 5, amount: 890, status: 'completed' },
  { id: 4, date: '2025-11-26', orders: 7, amount: 750, status: 'completed' },
  { id: 5, date: '2025-11-25', orders: 4, amount: 580, status: 'completed' },
];

export default function DeliveryAgentEarningsPage() {
  const totalEarnings = earningsData.reduce((sum, item) => sum + item.amount, 0);
  const averageDaily = Math.round(totalEarnings / earningsData.length);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <h1 className="text-3xl font-heading font-semibold text-primary mb-8">Earnings & Payouts</h1>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <DollarSign className="h-5 w-5" />
                <span>Total Earnings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-heading font-bold text-primary">₹{totalEarnings.toFixed(2)}</p>
              <p className="text-sm text-secondary font-paragraph mt-2">This week</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-secondary">
                <TrendingUp className="h-5 w-5" />
                <span>Daily Average</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-heading font-bold text-secondary">₹{averageDaily.toFixed(2)}</p>
              <p className="text-sm text-secondary font-paragraph mt-2">Per day</p>
            </CardContent>
          </Card>

          <Card className="border-terracotta/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-terracotta">
                <Calendar className="h-5 w-5" />
                <span>Pending Payout</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-heading font-bold text-terracotta">₹2,450.00</p>
              <p className="text-sm text-secondary font-paragraph mt-2">Next payout: Dec 5</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Weekly Earnings Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5D4C1" />
                  <XAxis dataKey="date" stroke="#1F5A3A" />
                  <YAxis stroke="#1F5A3A" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F3EAD8',
                      border: '1px solid #1F5A3A',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#4B8B3A"
                    strokeWidth={2}
                    dot={{ fill: '#1F5A3A', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <div>
                      <p className="font-heading text-primary font-semibold">{transaction.date}</p>
                      <p className="text-sm text-secondary font-paragraph">{transaction.orders} orders completed</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <p className="font-heading text-primary font-bold">₹{transaction.amount.toFixed(2)}</p>
                      <Badge className="bg-green-100 text-green-800">
                        {transaction.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <Button className="bg-secondary hover:bg-secondary/90 px-8 py-6 text-lg">
            Request Payout
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
