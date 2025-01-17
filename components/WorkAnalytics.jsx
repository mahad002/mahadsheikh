"use client";
import { motion } from 'framer-motion';
import { useMemo, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { HiOutlineGlobeAlt, HiOutlineStar, HiOutlineChartBar, HiOutlineClock } from 'react-icons/hi';
import { fadeIn } from '../variants';
import clientReviews from '../data/Client_Reviews.json';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WorkAnalytics = () => {
  // Calculate all metrics from the reviews data
  const analytics = useMemo(() => {
    const reviews = clientReviews.reviews;
    
    // Basic stats
    const totalCollaborations = reviews.length;
    const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalCollaborations).toFixed(1);
    const uniqueCountries = new Set(reviews.map(review => review.country)).size;
    
    // Calculate completion rate (assuming all reviews are from completed projects)
    const completionRate = 100;

    // Calculate regional distribution
    const regions = {
      "North America": ["US", "CA"],
      "Europe": ["GB", "DE", "FR", "AT", "NO"],
      "Asia Pacific": ["AU", "IN", "MY", "HK", "KR"],
      "Middle East": ["AE", "QA", "SA"],
      "Others": ["EG", "ZM", "MA"]
    };

    const regionalCounts = Object.entries(regions).reduce((acc, [region, countryCodes]) => {
      acc[region] = reviews.filter(review => countryCodes.includes(review.country_code)).length;
      return acc;
    }, {});

    // Calculate monthly rating averages for the trend
    const monthlyRatings = reviews.reduce((acc, review) => {
      const date = new Date(review.time);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!acc[monthYear]) {
        acc[monthYear] = { sum: 0, count: 0 };
      }
      acc[monthYear].sum += review.rating;
      acc[monthYear].count += 1;
      return acc;
    }, {});

    const ratingTrend = Object.entries(monthlyRatings)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .slice(-6)
      .map(([month, data]) => ({
        month: new Date(month).toLocaleString('default', { month: 'short' }),
        rating: (data.sum / data.count).toFixed(1)
      }));

    return {
      stats: {
        totalCollaborations,
        averageRating,
        globalReach: uniqueCountries,
        completionRate
      },
      regionalDistribution: regionalCounts,
      ratingTrend
    };
  }, []);

  // Prepare chart data
  const regionData = {
    labels: Object.keys(analytics.regionalDistribution),
    datasets: [{
      data: Object.values(analytics.regionalDistribution),
      backgroundColor: [
        'rgba(66, 153, 225, 0.8)',
        'rgba(72, 187, 120, 0.8)',
        'rgba(246, 173, 85, 0.8)',
        'rgba(159, 122, 234, 0.8)',
        'rgba(237, 100, 166, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const ratingTrendData = {
    labels: analytics.ratingTrend.map(item => item.month),
    datasets: [{
      label: 'Satisfaction Score',
      data: analytics.ratingTrend.map(item => item.rating),
      fill: true,
      backgroundColor: 'rgba(66, 153, 225, 0.1)',
      borderColor: 'rgba(66, 153, 225, 1)',
      tension: 0.4,
      pointRadius: 6,
      pointBackgroundColor: 'rgba(66, 153, 225, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: 'rgba(66, 153, 225, 1)',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 2
    }]
  };

  return (
    <div className="w-full space-y-8">
      {/* Stats Overview */}
      <motion.div 
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-card p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <HiOutlineGlobeAlt className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-sm text-muted">Global Impact</h3>
              <p className="text-2xl font-bold">{analytics.stats.globalReach} Countries</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <HiOutlineStar className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-sm text-muted">Satisfaction Score</h3>
              <p className="text-2xl font-bold">{analytics.stats.averageRating}/5.0</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <HiOutlineChartBar className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-sm text-muted">Success Rate</h3>
              <p className="text-2xl font-bold">{analytics.stats.completionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <HiOutlineClock className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-sm text-muted">Collaborations</h3>
              <p className="text-2xl font-bold">{analytics.stats.totalCollaborations}+</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Regional Distribution */}
        <div className="bg-card p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-6">Global Impact Distribution</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={regionData}
              options={{
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: 'rgb(var(--color-text))',
                      font: { size: 12 }
                    }
                  }
                },
                cutout: '60%',
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        {/* Rating Trend */}
        <div className="bg-card p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-6">Satisfaction Trend</h3>
          <div className="h-[300px]">
            <Line
              data={ratingTrendData}
              options={{
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                      color: 'rgb(var(--color-text))',
                      stepSize: 1
                    },
                    grid: {
                      color: 'rgba(var(--color-border), 0.1)'
                    }
                  },
                  x: {
                    ticks: {
                      color: 'rgb(var(--color-text))'
                    },
                    grid: {
                      display: false
                    }
                  }
                },
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Recent Collaborations */}
      <motion.div
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
      >
        <div className="bg-card p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-6">Recent Success Stories</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clientReviews.reviews.slice(0, 6).map((review, index) => (
              <div 
                key={index}
                className="bg-background/50 p-6 rounded-lg border border-border hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-lg font-semibold text-accent">
                    {review.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium">{review.username}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <span>{review.country}</span>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                        {review.country_code}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <HiOutlineStar key={i} className="text-accent" />
                  ))}
                  <span className="text-sm text-muted ml-2">{review.rating.toFixed(1)}</span>
                </div>
                <p className="text-muted text-sm line-clamp-3">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkAnalytics;